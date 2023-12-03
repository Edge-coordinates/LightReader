const fs = require('fs-extra')
const jschardet = require('jschardet')
const iconv = require('iconv-lite')

function stream2buffer (stream) {
  return new Promise((resolve, reject) => {
    const _buf: any = []

    stream.on('data', chunk => _buf.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(_buf)))
    stream.on('error', err => reject(err))
  })
}

export function fileReader (path: string): any {
  let current = path
  let readstream = fs.createReadStream(current)
  return stream2buffer(readstream).then(data => {
    // console.log(data)
    // console.log(jschardet.detect(data))
    const ecodes = jschardet.detectAll(data)
    console.log(ecodes)
    const enct = ecodes[0].encoding
    let str = iconv.decode(data, enct)
    console.log(str.length)
    return {
      data: str,
      ecodes: ecodes
    }
  })
}

function generate_directory_listing(lines, regExp) {
    let count = 0, line, tmpMenu;
    let left = 0,
    right = 0;
    for (line of lines) {
      if (regExp.test(line)) {
        tmpMenu.push(line);
        // menu.append(`<a class="mdui-list-item chapter_num" num=${count}>${line}</a>`);
      }
      right++;
    }
    // 重置渲染计数器
    novel_menu_r[count] = right;
    right = 0;
    // console.log(menuOptions);
  }

export function getMenu(data) {
    let lines = data.split(/\r?\n/);

    return {
        menu:["前言",],
        arrdata:[],
    }
}
