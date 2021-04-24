import { search } from '../Search.logic'
import axios from 'axios'

jest.mock('axios')

describe('Search.logic', () => {
  test('search', async () => {
    // @ts-ignore
    axios.get.mockResolvedValue({
      data: 'test'
    })
    console.log(await search(1, 'test', 1, 2, []))
  })

  test('s2', async () => {
    const users = [{name: 'Bob'}];
    const resp = {data: users};
    // @ts-ignore
    axios.get.mockResolvedValue(resp);

    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))

    const all = () => axios.get('/users.json').then(resp => resp.data);

    return all().then(data => {
      console.log(data)
      expect(data).toEqual(users)
    });

  })
})
