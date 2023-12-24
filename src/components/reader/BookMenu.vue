<script setup lang="ts">
// import { useBookStatusStore } from '@/stores/bookStatus';
import { BookMenu as IBookMenu } from "./txtBookParser";
import type { PropType } from 'vue'
import { onUpdated, ref, computed, onMounted } from 'vue';

import Item from './MenuItem.vue'
import VirtualList from 'vue3-virtual-scroll-list';

// const ifMenuHidden = ref(true)
const menuWapper: any = ref()
const menuVirtual: any = ref()

const props = defineProps({
    menu: Array as PropType<IBookMenu[]>,
    isMenuOpen: Boolean,
    ifMenuHidden: Boolean,
    chapterID: Number,
})

let menuHeight = ref('400px')
let preMenu = ref(false)

onMounted(() => {
    console.log('ddd')
    menuHeight.value = menuWapper.value.clientHeight + "px"
    preMenu.value = true
})

onUpdated(() => {
    menuVirtual.value.scrollToIndex(props.chapterID - 5)
    // console.log(menuVirtual.value.getClientSize())
    console.log(menuVirtual.value.getClientSize())
})
</script>

<template>
    <div class="h-full" ref="menuWapper" v-if="!ifMenuHidden">
        <!-- {{ menuHeight }} -->
        <n-virtual-list ref="virtualListInst" style="max-height: 240px" :item-size="42" :items="menu">
            <template #default="{ item, index }">
                <div :key="item.key" class="item" style="height: 42px">
                    <button class="text-left w-full h-8 rounded-md hover:bg-sky-200">{{ item.label }}</button>
                </div>
            </template>
        </n-virtual-list>
        <!-- <virtual-list v-if="preMenu" ref="menuVirtual" class="w-full" :style="{ height: '400px', 'overflow-y': 'auto' }"
            :data-key="'key'" :data-sources="menu" keeps="80" start="0" :data-component="Item" /> -->
    </div>
</template>