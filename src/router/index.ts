import { createRouter, createWebHistory } from "vue-router";
import EditView from "../views/EditView.vue";
import RenderView from "../views/RenderView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "edit",
      component: EditView,
    },
    {
      path: "/render",
      name: "render",
      component: RenderView,
    },
  ],
});

export default router;
