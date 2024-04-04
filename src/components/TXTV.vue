<template id="TXTV">
  <!-- <q-btn color="white" text-color="black" label="Standard" @click="init" /> -->
  <!-- {{ setStore.cFontSize }} {{ setStore.fontSize }} -->
  <div id="chapter_content" :style="{ fontSize: setStore.cFontSize, padding: setStore.cMargin }" class="h-full">
    <h3><b>{{ theChapter }}</b></h3>
    <p v-for="(item, index) in theContent" :key="index">{{ item }}</p>
    <div class="ml-20">
      <q-btn flat rounded color="primary" label="上一章" @click="preChapter" />
      <q-btn flat rounded color="primary" label="目录" @click="drawerMenu = !drawerMenu" />
      <q-btn flat rounded color="primary" label="下一章" @click="nextChapter" />
    </div>
  </div>
  <n-drawer v-model:show="drawerMenu" :placement="readerConf.placement" :block-scroll="false"
    :on-after-enter="onMenuDrawerOpen" :width="setStore.menuDWidth">
    <n-drawer-content>
      <template #header>
        <div class="flex items-center justify-between ">
          <div class="text-lg font-semibold">目录</div>
        </div>
      </template>
      <q-virtual-scroll ref="vMenuRef" :style="{ 'max-height': menuHeight + 'px' }" v-if="drawerMenu && isMenuOk"
        :items="Menu" component="q-list" separator v-slot="{ item, index }">
        <q-item :key="index" dense>
          <q-item-section>
            <q-item-label class="text-lg hover:bg-gray-200" @click="handleClickMenu($event)" :data-index="item.key"
              :data-lline="item.lline" :data-rline="item.rline">
              <!-- <q-btn class="w-full text-left" flat :label="index + ' - ' + item.title" /> -->
              #{{ index }} - {{ item.title }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
    </n-drawer-content>
  </n-drawer>
  <!-- {{ originData.length }}<br />
  {{ ecodes }} -->
  <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-btn round color="secondary" icon="mdi-menu" @click="drawerMenu = !drawerMenu" size="1.3em"><q-tooltip
        class="bg-purple text-body2" :offset="[10, 10]">
        目录
      </q-tooltip></q-btn>
  </q-page-sticky>
</template>

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue';
import { NDrawer, NDrawerContent, DrawerPlacement, NButton } from 'naive-ui'

import { generateArrDate, generateDirectoryList } from './txtBookParser'
import { useSettingStore } from 'stores/bookSet-store';
const setStore = useSettingStore()
let Menu: any[] = [] // 存储目录
let arrBookData: any[] = [] // 存储拆分为数组的书籍数据
let isMenuOk = ref(false) // 目录是否准备完成完成
let drawerMenu = ref(false) // 维护目录drawer打开状态
let theContent = ref(), theChapter = ref() // 当前章节内容，当前章节标题
let theChapterIndex = 0 // 当前章节ID

let vMenuRef: any = ref() // 对目录虚拟列表的引用

watch(vMenuRef, async (newVMenuRef, oldVMenuRef) => {
  console.log(newVMenuRef, oldVMenuRef);
})

function onMenuDrawerOpen() {
  // console.log('Drawer Open.', vMenuRef, theChapterIndex);
  console.log(vMenuRef.value.scrollTo)
  console.log(vMenuRef.value)
  vMenuRef.value.scrollTo(theChapterIndex - 1, 'start-force')
}

// ANCHOR 章节切换/渲染逻辑
function getChapter(lline, rline) {
  // TODO 正则错误/失效导致的 文本过长
  if (rline - lline > 20000) {
    theContent.value = ['章节过长，请手动拆分章节', '当然也有可能是设置的正则表达式有问题，没有匹配到章节，请检查正则表达式']
    return;
  }
  console.log(lline, rline);
  theChapter.value = arrBookData[lline]
  theContent.value = arrBookData.slice(parseInt(lline) + 1, parseInt(rline) + 1)
  // setTimeout(() => { document.body.scrollTop = document.documentElement.scrollTop = 0; }, 700)
}

function getChapterIndex(index) {
  // 滚动到顶端
  nextTick().then(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    console.log('next aaa');
  });
  getChapter(Menu[index].lline, Menu[index].rline)
}

function nextChapter() {
  theChapterIndex++
  getChapterIndex(theChapterIndex)
}


function preChapter() {
  theChapterIndex--
  getChapterIndex(theChapterIndex)
}

function handleClickMenu(event) {
  const cLline = event.target.dataset.lline;
  const cRline = event.target.dataset.rline;
  console.log(cLline, cRline);
  getChapter(cLline, cRline)
  theChapterIndex = event.target.dataset.index
  // 关闭 目录
  drawerMenu.value = false
}
// 章节切换/渲染逻辑结束

// ANCHOR 初始化逻辑
function reloadData() { // 其实我也不知道这个函数有没有用
  isMenuOk.value = false
  theContent.value = ''
  arrBookData = []
  drawerMenu.value = false
}

function initBook() {
  const tmpReg = setStore.menuRegs[setStore.regIndex]
  Menu = generateDirectoryList(arrBookData, new RegExp(tmpReg))
  isMenuOk.value = true
  console.log(Menu);
  getChapter(Menu[0].lline, Menu[0].rline)
}

function init() {
  arrBookData = generateArrDate(props.originData)
  initBook()
}
// 初始化逻辑结束

let menuHeight = ref(300)
onMounted(() => {
  reloadData()
  init()
  document.addEventListener('keydown', function (event: any) {
    console.log('Key pressed:', event.key);
    // console.log(theChapterIndex);
    const key = event.key
    switch (key) {
      case 'Tab':
        drawerMenu.value = true
        break
      case 't':
        break
      case 'ArrowLeft':
        preChapter()
        break
      case 'ArrowRight':
        nextChapter()
        break
    }
  });

  window.addEventListener('resize', (event) => {
    // console.log(event);
    menuHeight.value = window.innerHeight - 100
  });
  menuHeight.value = window.innerHeight - 100
})

setStore.$subscribe((mutation: any, state) => {
  // console.log(mutation, state)
  // 监听 章节正则表达式变化，之后重绘书籍
  if (mutation.events.key == 'regIndex') {
    console.log(state.regIndex)
    // 重绘书籍
    // TODO 动态目录重绘？
    // reloadData()
    initBook()
  }
})

// drawer的设置，勿动
const readerConf = ref({
  regulars: [],
  placement: <DrawerPlacement>('left') // 菜单栏打开位置
})

const props = defineProps<{
  originData: string,
  ecodes?: any
}>()
</script>
