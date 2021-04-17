const { log } = console

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.color) {
    log('receive color = ' + message.color)
    document.body.style.backgroundColor = message.color
    sendResponse('Change color to ' + message.color)
  } else {
    sendResponse('Color is none')
  }
})
