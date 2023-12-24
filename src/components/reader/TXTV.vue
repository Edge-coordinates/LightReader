<script setup lang="ts">
import Header from './Header.vue'
import BookMenu from './BookMenu.vue'
import BookContent from './BookContent.vue'

import { DrawerPlacement } from 'naive-ui'
import path from "path"
import { fileReader, gengerateArrDate, generateDirectoryList } from './txtBookParser';
import { BookContent as IBookContent } from "./txtBookParser";

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from "vue-router";
import { useBookStatusStore } from '@/stores/bookStatus';

// 响应式状态
const isBookOpen = ref(false)
const ifMenuHidden = ref(false)
const chapterID = ref(0)

const bookStatus = useBookStatusStore()
const filepath = ref("")
const fileExtension = ref("")
const bookContent = ref<IBookContent>({
    data: '',
    arrdata: [],
    menu: [],
    ecodes: [],
})
const bookMeta = ref({
    title: '',
    path: '',
    fileExtension: '',
    filename: '',
})
const readerConf = ref({
    regulars: [],
    placement: <DrawerPlacement>('left') // 菜单栏打开位置
})

// 计算属性
const chapterData = computed(() => {
    // 更具data获取
    return ''
})

// 方法
function prebook() {
    // init Meta 
    fileExtension.value = filepath.value.split(".").pop().toLowerCase()
    bookMeta.value.path = filepath.value
    bookMeta.value.fileExtension = fileExtension.value
    bookMeta.value.filename = path.basename(filepath.value)
    bookMeta.value.title = path.parse(filepath.value).name
}

function openTheBook(file: any) {
    filepath.value = file.file.file.path
    // this.bookContent = fileReader(this.filepath)
    fileReader(filepath.value).then((result) => {
        bookContent.value.data = result.data
        bookContent.value.ecodes = result.ecodes
        prebook()
        // let tmp = getMenu(bookContent.value.data)
        bookContent.value.arrdata = gengerateArrDate(bookContent.value.data)
        // 生成章节列表
        bookContent.value.menu = generateDirectoryList(bookContent.value.arrdata, new RegExp('第[一二两三四五六七八九十○零百千0-9１２３４５６７８９０]{1,12}(章|节|節)'))
        console.log(bookContent.value.menu)
        // opened
        isBookOpen.value = true
        // console.log(filepath.value, fileExtension.value, isBookOpen.value)
    })
    return false
}

function consolea() {
    // this.isBookOpen = !this.isBookOpen
    console.log(isBookOpen.value)
}

// 生命周期钩子
onMounted(() => {
    // ...
})

onUnmounted(() => {
    // ...
})
</script>

<template>
    <Header :is-book-open="isBookOpen" :book-name="bookMeta.title" :file-name="bookMeta.filename"></Header>
    <RouterLink to="/about">Go to about</RouterLink>
    <h1>{{ bookStatus.isMenuOpen }}</h1>
    <button class="btn" @click="isBookOpen = !isBookOpen">Toggle</button>
    <div id="book-content" v-if="isBookOpen">
        <BookContent :chapter="chapterData" />
        <!-- <div>bookContent:{{ bookContent }}</div> -->
    </div>
    <div v-else>
        <n-upload multiple directory-dnd :show-file-list="false" :on-before-upload="openTheBook">
            <n-upload-dragger>
                <div style="margin-bottom: 12px">
                    <i class="fa-duotone fa-up-from-bracket fa-3x" style="--fa-secondary-color: #3abff8;"></i>
                </div>
                <n-text style="font-size: 16px">
                    点击或者拖动书籍文件到该区域来上传
                </n-text>
                <n-p depth="3" style="margin: 8px 0 0 0">
                    目前支持格式：.txt
                </n-p>
            </n-upload-dragger>
        </n-upload>
    </div>
    <n-drawer v-model:show="bookStatus.isMenuOpen" :placement="readerConf.placement" :trap-focus="false"
        :block-scroll="false" to="#book-content" :default-width="502" resizable>
        <n-drawer-content>
            <template #header class="w-full">
                <div class="flex items-center justify-between ">
                    <div class="text-lg font-semibold">目录</div>
                    <div class="tooltip tooltip-left" data-tip="显示/隐藏目录内容">
                        <button class="btn btn-ghost"><i class="fa-solid fa-eye-slash fa-lg text-base-200"
                                @click="ifMenuHidden = !ifMenuHidden"></i></button>
                    </div>
                </div>
            </template>
            <BookMenu :menu="bookContent.menu" :is-menu-open="bookStatus.isMenuOpen" :chapter-i-d="100"
                :if-menu-hidden="ifMenuHidden" />
        </n-drawer-content>
    </n-drawer>
</template>

<style>
.n-drawer-header__main {
    width: 100%;
}
.n-drawer-body-content-wrapper {
    padding: 5px 0px 3px 12px !important ;
}
</style>
