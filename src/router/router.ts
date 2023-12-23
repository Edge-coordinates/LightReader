import TxtvWrapper from "@/view/TxtvWrapper.vue";
import AboutView from "@/view/About.vue";

import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: TxtvWrapper,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  }
];
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

// router.afterEach((to, from) => {
//   // 设置过渡方向
//   if (to.meta.sort && from.meta.sort) {
//     (to.meta.sort as number) > (from.meta.sort as number)
//       ? (to.meta.transition = "totop")
//       : (to.meta.transition = "tobottom");
//   }
// });

export default router;
export { routes };