<script setup lang="ts">
import TXTV from './components/reader/TXTV.vue'
import themeOverrides from "./theme";
</script>

<template>
    <!-- <ContentMenu>
    <router-view />
  </ContentMenu> -->
    <!-- 右键菜单 -->
    <n-config-provider :theme-overrides="themeOverrides">
        <n-dialog-provider>
            <n-message-provider>
                <TXTV></TXTV>
            </n-message-provider>
        </n-dialog-provider>
    </n-config-provider>
</template>
