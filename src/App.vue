

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
// window.storeAPI.initData()
import { NConfigProvider } from 'naive-ui'

import { onMounted } from 'vue'

import { useSettingStore } from 'stores/bookSet-store';
const setStore = useSettingStore()
async function initData() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tmpdata: any
  if (tmpdata = await window.storeAPI.get('menuRegs')) setStore.menuRegs = tmpdata
  if (tmpdata = await window.storeAPI.get('regIndex')) setStore.regIndex = tmpdata
  if (tmpdata = await window.storeAPI.get('fontSize')) setStore.fontSize = tmpdata
  if (tmpdata = await window.storeAPI.get('cMargin')) setStore.cMargin = tmpdata
  console.log('APP setData inited!')
}

onMounted(() => {
  initData()
})

const themeOverrides = {
  common: {
    primaryColor: '#1976d2'
  },
  // Button: {
  //   textColor: '#FF0000'
  // },
  // Select: {
  //   peers: {
  //     InternalSelection: {
  //       textColor: '#FF0000'
  //     }
  //   }
  // }
}
</script>
