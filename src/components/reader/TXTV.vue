<script lang="ts">
import { DrawerPlacement } from 'naive-ui'
import { ref } from 'vue'
import { useBookStatusStore } from '@/stores/bookStatus';
import path from "path"
import { fileReader, getMenu } from './txtBookParser';

import Header from './Header.vue'
import BookMenu from './BookMenu.vue'
import BookContent from './BookContent.vue'

export default {
    components: {
        Header,
        BookMenu,
        BookContent,
    },
    methods: {
        prebook() {
            this.fileExtension = this.filepath.split(".").pop().toLowerCase();
            this.bookMeta.path = this.filepath
            this.bookMeta.fileExtension = this.fileExtension
            this.bookMeta.filename = path.basename(this.filepath);
            this.bookMeta.title = path.parse(this.filepath).name;
            this.isBookOpen = true;
        },
        openTheBook(file: any) {
            this.filepath = file.file.file.path;
            // this.bookContent = fileReader(this.filepath)
            fileReader(this.filepath).then((result) => {
                this.bookContent = result
                this.prebook();
            })
            let tmp = getMenu(this.bookContent.data)
            this.bookContent.menu = tmp.menu 
            this.bookContent.arrdata = tmp.arrdata
            console.log(this.filepath, this.fileExtension, this.isBookOpen)
            return false;
        },
        consolea() {
            // this.isBookOpen = !this.isBookOpen
            console.log(this.isBookOpen)
        }
    },
    data() {
        return {
            placement: ref<DrawerPlacement>('left'),
            isBookOpen: false,
            bookStatus: useBookStatusStore(),
            filepath: "",
            fileExtension: "",
            bookContent: <any>{
                data: '',
                arrdata: [],
                menu: [],
                ecodes: [],
            },
            bookMeta: <any>{},
            chapterID: ''
        }
    },
    computed: {
        chapterData() {
            // 更具data获取
            return ''
        }
    }
}
</script>

<template>
    <Header :is-book-open="isBookOpen" :book-name="bookMeta.title" :file-name="bookMeta.filename"></Header>
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
    <n-drawer v-model:show="bookStatus.isMenuOpen" :width="200" :height="200" :placement="placement" :trap-focus="false"
        :block-scroll="false" to="#book-content">
        <n-drawer-content :title="bookMeta.title">
            <BookMenu :menu="bookContent.menu" />
        </n-drawer-content>
    </n-drawer>
</template>

<style></style>
