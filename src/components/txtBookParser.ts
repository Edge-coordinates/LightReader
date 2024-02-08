/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BookMenu {
  title: string;
  key: string | number;
  lline: number;
  rline: number;
}

export interface BookContent {
  data: any;
  arrData: any[];
  menu: BookMenu[];
  ecodes: any[];
}

export function generateArrDate (data) {
  return data.split(/\r?\n/);
}

export function generateDirectoryList (lines, regExp) {
  // TODO 允许传入书名参数，将第0章重命名

  const chapterOne: BookMenu = { title: '前言', key: 0, lline: 0, rline: 0 }; // rline 需要更新, l, r为两端闭区间
  // * 首章特判
  let count = 0,
    tmpLline = 0,
    line = lines[0]; // tmpLline存储最近的目录的行数, line存储最近的目录
  const tmpMenu: BookMenu[] = [];

  // 总是提交 第0章 仅提交内容有区别
  if (!regExp.test(line)) {
    line = '前言';
  } else {
    // line = lines[0]
  }
  // * 构成逻辑： 每次匹配到目录时，将最近的目录 推进数组
  for (let i = 1; i < lines.length; i++) {
    if (regExp.test(lines[i])) {
      tmpMenu.push({ title: line, key: count, lline: tmpLline, rline: i - 1 });

      // 初始下一次提交
      count++;
      line = lines[i];
      tmpLline = i;
    }
  }
  // 提交最后一章
  if (!regExp.test(lines[lines.length - 1])) {
    tmpMenu.push({
      title: line,
      key: count,
      lline: tmpLline,
      rline: lines.length - 1
    });
  }
  return tmpMenu;
}

export function getMenu (data) {
  const lines = data.split(/\r?\n/);

  return {
    menu: [{ label: '前言', key: '0' }],
    arrdata: []
  };
}
