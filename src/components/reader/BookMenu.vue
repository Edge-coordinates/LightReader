<script lang="ts">
import { useBookStatusStore } from '@/stores/bookStatus';

export default {
    props: {
        menu: <any>[]
    },
    methods: {
    },
    data() {
        return {
            bookStatus: useBookStatusStore()
        }
    }
}
</script>

<template>
    dddd
</template>