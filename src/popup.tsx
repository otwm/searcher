import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const { log } = console

const Popup = () => {
  const [count, setCount] = useState(0)
  const [currentURL, setCurrentURL] = useState<string>()

  useEffect(() => {
    chrome.browserAction.setBadgeText({ text: count.toString() })
  }, [count])

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setCurrentURL(tabs[0].url)
    })
  }, [])

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          color: '#555555',
        }, (message) => {
          log('result message:', message)
        })
      }
    })
  }

  return (
    <>
      <ul style={{ minWidth: '700px'}}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: '5px' }}>
        count up
      </button>
      <button onClick={changeBackground}>change back</button>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
)