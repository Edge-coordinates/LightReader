export interface BookMenu {
    label: string,
    key: string,
    lline: Number,
    rline: Number,
}

export interface BookContent {
  data: any,
  arrdata: any[],
  menu: BookMenu[],
  ecodes: any[],
}





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

export function gengerateArrDate (data) {
  return data.split(/\r?\n/)
}

export function generateDirectoryList (lines, regExp) {
  let chapterOne = { label: '前言', key: 0, lline: 0, rline:0 } // rline 需要更新, l, r为两端闭区间
  let count = 1, // 首章特判
    line = lines[0],
    tmpMenu = <any>[]

  if (!regExp.test(line)) {
    tmpMenu = [chapterOne]
  } else {
    tmpMenu.push({label: line, key: 0, lline: 0})
  }
  for (let i = 1;  i < lines.length; i++) {
    line = lines[i]
    if (regExp.test(line)) {
      tmpMenu[tmpMenu.length - 1].rline = i-1
      // console.log(tmpMenu[tmpMenu.length - 1])
      tmpMenu.push({label: line, key: count++, line: i})
      // console.log(tmpMenu[tmpMenu.length - 1])
      // menu.append(`<a class="mdui-list-item chapter_num" num=${count}>${line}</a>`);
    }
  }
  return tmpMenu
  // console.log(menuOptions);
}

export function getMenu (data) {
  let lines = data.split(/\r?\n/)

  return {
    menu: [{ label: '前言', key: '0' }],
    arrdata: []
  }
}
