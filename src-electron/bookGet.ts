/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = require('fs-extra');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');

function stream2buffer (stream) {
  return new Promise((resolve, reject) => {
    const _buf: any = [];

    stream.on('data', chunk => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', err => reject(err));
  });
}

export function fileReader (path: string): any {
  let current = path;
  let readstream = fs.createReadStream(current);
  return stream2buffer(readstream).then(data => {
    // console.log(data)
    // console.log(jschardet.detect(data))
    const ecodes = jschardet.detectAll(data);
    console.log(ecodes);
    const enct = ecodes[0].encoding;
    let str = iconv.decode(data, enct);
    console.log(str.length);
    return {
      data: str,
      ecodes: ecodes
    };
  });
}
