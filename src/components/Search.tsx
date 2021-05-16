import axios from 'axios'
import React, { useState } from 'react'
import searchFactory, { getUrl } from '../actions/searchFactory'

const { log } = console

const Search = () => {
  const [startPage, setStartPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [list, setList] = useState<(string| undefined)[]>([])
  const [max, setMax] = useState(5)
  // @ts-ignore
  const save = ({ text, url }) => {
    log(text, url)
  }
  const stop = () => {
  }

  const searchKeyword = searchFactory({ start: 10, offset: 10, getUrl })
  const search = () => {
    const url = 'https://www.google.com/'
    fetch(url, {
      method: "GET",
      mode: "cors",
    }).then(response => response.json()).then((result) => {
      console.log('it worked!');
    }).catch(error => {
      console.error(error);
    });

    axios('https://www.google.com/').then(console.log)
    // searchKeyword({ keyword, count: 10 }).subscribe(value => {
    //   setList(value)
    // })
  }
  return (
    <div style={{ width: '400px'}}>
      <label>
        startPage: <input type={'number'} value={startPage} onChange={(event)=>setStartPage(Number(event.target.value))}/>
      </label>
      <label>
        keyword: <input type={'text'} value={keyword} onChange={(event)=>setKeyword(event.target.value)} />
      </label>
      <label>
        max: <input type={'number'} value={max} onChange={(event)=>setMax(Number(event.target.value))} />
      </label>
      <button onClick={search}>search</button>
      <button onClick={stop}>stop</button>
      <ul>
        {list.map((v) => (
          <li>
            { v }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Search
