import React, { useState } from 'react'
import { pipe, range } from 'ramda'
import axios from 'axios'
import sendWrap from '../utils/sendWrap'
import releaseKeepAwake = chrome.power.releaseKeepAwake

const { log } = console

const Search = () => {
  const [startPage, setStartPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [max, setMax] = useState(5)
  // @ts-ignore
  const save = ({ text, url }) => {
    log(text, url)
  }
  const stop = () => {
  }
  const list: any[] = []
  const search = () => {}
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
        {list.map(({url, keword}) => (
          <li>
            { url }, {keword}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Search
