/* eslint-disable quotes */
import { defineStore } from 'pinia';

// ^\s*第[一二两三四五六七八九十○零百千0-9１２３４５６７８９０]{1,12}(章|节|節|幕).{1,12}s*$|^s*序幕.{0,12}\s*$
export const useSettingStore = defineStore('setting', {
  state: () => ({
    isOpen: false,
    // ! 字符串到正则表达式的转换还是有问题
    menuRegs: [
      '第[一二两三四五六七八九十○零百千0-9１２３４５６７８９０]{1,12}(章|节|節).{1,12}',
      '^\\s*第[一二两三四五六七八九十○零百千0-9１２３４５６７８９０]{1,12}(章|节|節|幕).{1,12}s*$|^s*序幕.{0,12}\\s*$',
      '第[一二两三四五六七八九十○零百千0-9１２３４５６７８９０]{1,12}(章|节|節|回).{1,12}'
    ],
    regIndex: 1,
    menuDWidth: 500,
    fontSize: 20,
    cMargin: '0px 20px 20px 20px',
    defaultCMargin: '0px 20px 20px 20px'
  }),
  getters: {
    // doubleCount: state => state.counter * 2
    // getPFormat: state => state.imageFormat
    cFontSize: state => state.fontSize + 'px'
  },
  actions: {
    increment () {
      // this.counter++;
    }
  }
});
