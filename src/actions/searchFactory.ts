import { forkJoin, range } from 'rxjs'
import { expand, map, mergeMap, take, toArray } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
// @ts-ignore
// import { XMLHttpRequest } from 'xmlhttprequest'

function createXHR() {
  return new XMLHttpRequest()
}

const initConfig = {
  offset: 10,
  maxPage: 100,
  start: 1
}

interface IConfig {
  offset?: number
  getUrl: typeof getUrl
  maxPage?: number
  start?: number
}

interface ISearchParam {
  keyword: string
  count: number
}

interface IgetUrl {
  page: number
}
// *://*/*
export const getUrl = ({ page }: IgetUrl): string => {
  const baseUrl = 'https://gall.dcinside.com'
  const uri = 'board/lists'
  const query = `id=football_new7&page=${page}`
  const result = `${baseUrl}/${uri}/?${query}`
  return result
}

const searchFactory = (config: IConfig) => ({ keyword, count }: ISearchParam) => {
  let result: string[] = []
  const { offset, getUrl, maxPage, start } = { ...config, ...initConfig }
  const execute = (start: number, offset: number) => range(start, offset).pipe(
    take(10),
    toArray(),
    mergeMap(pages=> forkJoin([...pages.map(page => ajax({
      url: getUrl({ page }),
      crossDomain: true,
      withCredentials: false,
      method: 'GET',
      responseType: 'text',
      createXHR,
    }) )])),
    map(value => value.map(({ response, request }) => ({ response, request }))),
    map(values => values.filter(({ response }) => response.includes(keyword))),
    map(values => values.map(item => item.request.url)),
  )
  return execute(start, offset).pipe(
    expand((value, index) => {
      return execute(start + ((index + 1) * offset), offset)
    }),
    take(2),
  )
}

export default searchFactory
