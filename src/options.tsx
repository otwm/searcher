import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const Options = () => {
  const [color, setColor] = useState<string>()
  const [status, setStatus] = useState<string>()
  const [like, setLike] = useState<boolean>()

  useEffect(() => {
    chrome.storage.sync.get({
      favoriteColor: 'red',
      likeColor: true,
    }, (items) => {
      setLike(items.likeColor)
      setColor(items.favoriteColor)
    })
  }, [])

  const saveOptions = () => {
    chrome.storage.sync.set({
      favoriteColor: color,
      likesColor: like,
    }, () => {
      setStatus('Options saved')
      const id = setTimeout(() => {
        setStatus(undefined)
      }, 1000)
      return () => clearTimeout(id)
    })
  }

  return (
    <>
      <div>
        Favorite color:{' '}
        <select
          value={color}
          onChange={(event) => setColor(event.target.value)}
        >
          <option value={'red'}>red</option>
          <option value={'green'}>green</option>
          <option value={'blue'}>blue</option>
          <option value={'yellow'}>yellow</option>
        </select>
        <div>
          <label>
            <input type={'checkbox'} checked={like} onChange={(event) => setLike(event.target.checked)} />
            i like colors
          </label>
          <div>{status}</div>
          <button onClick={saveOptions}>Save</button>
        </div>
      </div>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById('root')
)
