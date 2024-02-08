function getData() {
  return {
    data: 'someData',
    ecodes: { code1: 1, code2: 2 },
  };
}
// !ddd

const { data, ecodes } = getData();
console.log(data); // 输出: 'someData'
console.log(ecodes); // 输出: { code1: 1, code2: 2 }
