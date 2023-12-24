<script setup lang="ts">
// import { useBookStatusStore } from '@/stores/bookStatus';
import { BookMenu as IBookMenu } from "./txtBookParser";
import type { PropType } from 'vue'

const props = defineProps({
    source: Object as PropType<IBookMenu>,
})

</script>

<template>
 <button class="text-left w-full h-8 rounded-md hover:bg-sky-200">{{ source.label }}</button>
</template>