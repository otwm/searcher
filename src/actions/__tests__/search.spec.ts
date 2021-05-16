import { EMPTY, forkJoin, of, range } from 'rxjs'
import { concatMap, expand, filter, map, mergeMap, reduce, take, tap, toArray } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

const { log } = console

describe('search', () => {
  // test('getUrl', () => {
  //   expect(getUrl({ page: 8 })).toBe('https://gall.dcinside.com/board/lists/?id=football_new7&page=8')
  // })
  //
  // test('한번에 여러게 검색하기', done => {
  //   const search = searchFactory({ offset: 10, getUrl, maxPage: 30 })
  //   search({ keyword: '케인', count: 20 }).subscribe((v) => {
  //     expect(v.length > 0).toBe(true)
  //     log(v)
  //     done()
  //   })
  // })

  test('expand', () => {
    const src2 = (v: number) => of(v).pipe(map(v => v));
    const example = src2(1).pipe(
      //recursively call supplied function
      expand(val => {
        //2,3,4,5,6
        console.log(`Passed value: ${val}`);
        //3,4,5,6
        return src2(1 + val);
      }),
      //call 5 times
      take(5)
    );
    const subscribe = example.subscribe(val => console.log(`RESULT: ${val}`));
  })
})
