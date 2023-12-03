import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookStatusStore = defineStore('bookStatus', {
  state: () => {
    return { isMenuOpen: false }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    toggleMenuOpen () {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
})
