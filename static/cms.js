function app(section) {
  'use strict'
  
  var renderer = new marked.Renderer()
  renderer.hr = function (text, level) {
    return '<div class="line">'
      + '<img src="http://i.imgur.com/5CNWqYr.png" alt="line" class="line">'
      + '</div>'
  }

  function get(url, cb) {
    try {
      var x = new XMLHttpRequest()
      x.open('GET', url, 1)
      x.onreadystatechange = function () {
        x.readyState > 3 && cb && cb(x.responseText, x)
      };
      x.send()
    } catch (e) {
      window.console && console.log(e) 
    }
  }

  function getContent() {
  
  
    get('https://raw.githubusercontent.com/FilWisher/cooperatives/gh-pages/content/'+ section + '.md', function (d) {
      try {
        document.querySelector("#" + section).innerHTML = marked(d, {renderer:renderer})
      } catch (e) {
        window.console && console.log(e)
      }
    })
  }
  
  getContent()
}
