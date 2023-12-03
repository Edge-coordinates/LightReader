<script lang="ts">
import { mapStores } from 'pinia'
import { useBookStatusStore } from '@/stores/bookStatus';

export default {
    props: {
        isBookOpen: Boolean,
        bookName: String,
        fileName: String,
    },
    methods: {
        toggleMenu() {
            // 向store更新数据，打开菜单
            this.bookStatus.toggleMenuOpen()
            console.log("菜单打开状态", this.bookStatus.isMenuOpen)
        }
    },
    data() {
        return {
            bookStatus: useBookStatusStore()
        }
    },
    computed: {
        tBookName() {
            if (this.bookName.length > 6)
                return this.bookName.substring(0, 6) + "..."
            else 
                return this.bookName
        }
    }
}
</script>

<template>
    <div class="navbar bg-neutral rounded-lg shadow-lg">
        <div v-if="isBookOpen" class="flex-none">
            <button class="btn btn-square btn-ghost" @click="toggleMenu()">
                <i class="fa-solid fa-bars fa-lg text-base-100"></i>
            </button>
        </div>
        <div class="flex-1">
            <button v-if="!isBookOpen" class="btn btn-ghost normal-case text-xl text-base-100">Light Reader</button>
            <div v-else class="tooltip tooltip-bottom" :data-tip="fileName">
                <!-- 此处BookName应当使用计算属性重构，限制最长 -->
                <button class="btn btn-ghost normal-case text-xl text-base-100">{{ tBookName }}</button>
            </div>

        </div>
        <div v-if="!isBookOpen" class="flex-none dropdown dropdown-hover dropdown-end">
            <button tabindex="-1" class="btn btn-square btn-ghost">
                <i class="fa-solid fa-grid fa-lg text-base-100"></i>
            </button>

            <div tabindex="-1" class="dropdown-content shadow z-[1] bg-base-100 rounded-box">
                <!-- svelte-ignore a11y-missing-attribute -->
                <ul class="menu menu-horizontal w-80">
                    <li><a href='t/reader'>Reader</a></li>
                    <li>
                        <a>Edge</a>
                        <ul>
                            <li>
                                <a href="https://github.com/Edge-coordinates/Science-Blog" target="_blank"
                                    rel="noopener noreferrer">Blog</a>
                            </li>
                            <li>
                                <a href="https://github.com/Edge-coordinates" target="_blank"
                                    rel="noopener noreferrer">github</a>
                            </li>
                        </ul>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
                <!-- <Divider mes='tool' /> -->
            </div>
        </div>
        <div v-else>
            <div class="tooltip tooltip-bottom" data-tip="重置">
                <button tabindex="-1" class="btn btn-square btn-ghost">
                    <i class="fa-solid fa-rotate-right fa-lg text-base-100"></i>
                </button>
            </div>
            <div class="flex-none dropdown dropdown-hover dropdown-end">
                <button tabindex="-1" class="btn btn-square btn-ghost">
                    <i class="fa-duotone fa-gear fa-lg text-base-100"></i>
                </button>
                <div tabindex="-1" class="dropdown-content shadow z-[1] bg-base-100 rounded-box">
                    设置
                </div>
            </div>
        </div>
    </div>
</template>