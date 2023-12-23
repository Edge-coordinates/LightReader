<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
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
                <RouterView />
            </n-message-provider>
        </n-dialog-provider>
    </n-config-provider>
</template>
