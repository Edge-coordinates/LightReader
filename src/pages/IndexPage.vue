<template>
  <q-page style="margin-top: 20px;">
    <!-- <div class="row items-center justify-evenly">
      <router-link to="/test" class="btn">Go to Test</router-link>
      <button class="btn" @click="querydb">Button</button>
      <button class="btn" @click="picInfoInit">Button</button>
    </div> -->
    <div v-if="ifBookPreOK" class="h-full">
      <TXTV :originData="dataObject.data" :ecodes="dataObject.ecodes"></TXTV>
    </div>
    <div v-else class="flex justify-center">
      <n-config-provider :locale="zhCN" :date-locale="dateZhCN" class="w-11/12">
        <n-upload ref="upload" :on-change="onUpload" :max="1" :default-upload="false" :show-file-list="false">
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <i class="fa-duotone fa-up-from-bracket fa-3x" style="--fa-secondary-color: #3abff8;"></i>
            </div>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域来打开
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              目前仅TXT文件！
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </n-config-provider>
    </div>
    <div v-if="!ifBookPreOK" class="mx-2.5 my-4">
      <p class="text-h6">Tips:</p>
      <q-list separator>
        <q-item v-ripple>
          <i class="fa-regular fa-face-smile-hearts text-base"></i>
          <p>
            &nbsp;&nbsp;打开书籍后： <kbd class="kbd kbd-sm bg-white">Tab</kbd>可以直接打开目录,
            可以使用<kbd class="kbd kbd-sm bg-white">←</kbd>和<kbd class="kbd kbd-sm bg-white">→</kbd>翻看上一章，下一章。
          </p>
        </q-item>

        <q-item clickable v-ripple>
          <i class="fa-sharp fa-regular fa-comment-heart text-base"></i>
          <p>&nbsp;&nbsp;查看器支持自动识别编码，但是可能识别错误，如果出现了问题，建议手动转码为UTF-8。</p>
        </q-item>

        <q-item clickable v-ripple>
          <i class="fa-solid fa-book-sparkles text-base"></i>
          <p>&nbsp;&nbsp;查看器目录生成逻辑是正则表达式，如果不明白，可以参阅<q-btn flat color="primary"
              @click="openLink('https://www.runoob.com/regexp/regexp-tutorial.html')">教程</q-btn> 和 <q-btn flat
              color="primary"
              @click="openLink('https://www.w3cschool.cn/tools/index?name=javascriptregex')">在线测试工具</q-btn></p>
        </q-item>

        <q-item clickable v-ripple>
          <i class="fa-sharp fa-regular fa-house-chimney-heart text-base"></i>
          <p>&nbsp;&nbsp;祝您使用愉快！</p>
        </q-item>
      </q-list>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="mdi-plus" active-icon="mdi-close" direction="up" color="accent">
        <q-fab-action @click="stateInitialization" color="primary" icon="mdi-refresh" />
        <q-fab-action @click="openSetModal" color="primary" icon="mdi-cog" />
      </q-fab>
    </q-page-sticky>
  </q-page>
  <set-component />
</template>

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { NUpload, NUploadDragger, NConfigProvider, NP, NText } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'

import { ref } from 'vue'
import type { UploadInst } from 'naive-ui'

import TXTV from 'components/TXTV.vue'
import SetComponent from 'components/SetComponent.vue'

const upload = ref<UploadInst | null>()
const ifBookPreOK = ref<boolean>(false)
const imgs = ref([])

import { useSettingStore } from 'stores/bookSet-store';
const BookSetStore = useSettingStore()

function openLink(link: string) {
  window.myToolAPI.openLink(link)
}

function openSetModal() {
  console.log('setModal Open')
  // setStore.isOpen = true
  BookSetStore.isOpen = true
  console.log(BookSetStore.isOpen)
}

function stateInitialization() {
  upload.value?.clear()
  imgs.value = []
  ifBookPreOK.value = false
  console.log(imgs.value)
}

// async function picInfoInit(fpath) {
//   console.log('picInfoInit')
//   let aa = JSON.parse(JSON.stringify(setStore.getPFormat))
//   console.log(aa)
//   imgs.value = await window.myToolAPI.traverseFolder(fpath, aa)
//   // console.log(imgs.value)
//   // ifImgPreOK.value = true
// }

let dataObject

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function onUpload(e: any) {
  // 判断，如果是书籍文件/如果不是 -> 漫画文件夹
  const isBook = 1
  if (isBook) {
    const fullfpath = e.file.file.path // 绝对路径
    // console.log(fullfpath);
    // !此处使用await将会导致卡顿
    dataObject = await window.myToolAPI.getBook(fullfpath)
    ifBookPreOK.value = true
    // console.log(dataObject.data.length);
    // console.log(dataObject.ecodes);
  } else {
    let fpath = e.file.fullPath // 相对路径
    const fullfpath = e.file.file.path // 绝对路径
    let rt = new RegExp(String.raw`\\${fpath.split('/')[1]}\\`)
    const match = rt.exec(fullfpath);
    const matchedText = match![0];
    const beforeMatch = fullfpath.substring(0, match!.index);
    fpath = beforeMatch + matchedText
    console.log(e)
    console.log(rt, fpath, fullfpath);
    console.log(match, matchedText, beforeMatch)
    // fpath = fullfpath.split(rt)[0] + rt + '\\'
    // console.log(fpath);

    // console.log(rt, fpath, fullfpath)
    // picInfoInit(fpath)
  }
}
</script>
