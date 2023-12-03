<script lang="ts">
import { useBookStatusStore } from '@/stores/bookStatus';

export default {
    props: {
        chapter: String
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
    {{ chapter }}
</template>