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
        <n-loading-bar-provider>
            <n-message-provider>
                <n-notification-provider>
                    <n-dialog-provider>
                        <RouterView />
                    </n-dialog-provider>
                </n-notification-provider>
            </n-message-provider>
        </n-loading-bar-provider>
    </n-config-provider>
</template>
