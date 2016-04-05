function app(section) {
  'use strict'
  
  var renderer = new marked.Renderer()
  renderer.hr = function (text, level) {
    return '<br>'
  }
  
  renderer.blockquote = function (text) {
    var id = text.split('vimeo.com/')[1].split('">')[0]
    var url = '<div class="video-container"><div class="video"><iframe class="video" src="https://player.vimeo.com/video/' + id 
      + '?title=0&byline=0&portrait=0'
      + '" width="500" height="281" frameborder="0"'
      + 'webkitallowfullscreen mozallowfullscreen'
      + 'allowfullscreen></iframe></div></div>'
    return url
  }

  function get(url, cb) {
    try {
      var x = new XMLHttpRequest()
      x.open('GET', url, 1)
      x.onreadystatechange = function () {
        x.readyState > 3 && cb && cb(x.responseText, x)
      }
      x.send()
    } catch (e) {
      window.console && console.log(e) 
    }
  }

  function getContent() {
  
    get('https://raw.githubusercontent.com/FilWisher/cooperatives/gh-pages/content/'+ section + '.md', function (d) {
      try {
        document.querySelector("#" + section).innerHTML = marked(d, {renderer:renderer})
        var x = document.querySelector('#' + section) 
      } catch (e) {
        window.console && console.log(e)
      }
    })
  }
  
  getContent()
}
