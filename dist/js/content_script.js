(()=>{"use strict";var o=console.log;chrome.runtime.onMessage.addListener((function(e,r,c){e.color?(o("receive color = "+e.color),document.body.style.backgroundColor=e.color,c("Change color to "+e.color)):c("Color is none")}))})();