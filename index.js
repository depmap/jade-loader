const fs = require('fs')
const path = require('path')
const jade = require('jade')

const keywords = ['extends', 'include']

module.exports = {
  meta: {
    ext: '.jade',
    outExt: '.html'
  },
  parse: (file, meta) => {
    const deps = []
    const relativeDir = file.split('/').slice(0, -1).join('/')

    fs.readFileSync(file).toString().split('\n').forEach(line => {
      if (line.startsWith(keywords[0]) || line.startsWith(keywords[1])) {
        let words = line.split(' ')
        let dep = words[words.length - 1]
        console.log(dep)
        if (dep.indexOf(meta.ext) === -1)
          dep = dep + meta.ext

        deps.push(path.join(relativeDir, dep))
      }
    })

    return deps
  },
  compile: {
    string: (str, opts) => {
      return new Promise((resolve, reject) => {
        resolve(jade.render(str, opts))
      })
    },
    file: (path, opts) => {
      let html = jade.renderFile(path, opts)
      return html
    }
  }
}
