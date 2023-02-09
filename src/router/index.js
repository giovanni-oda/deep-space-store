// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/HomeView.vue"),
      },
    ],
  },
  {
    path: "/products",
    component: () => import("@/layouts/products/ProductsLayout.vue"),
    children: [
      {
        path: "/products",
        name: "Products",
        component: () =>
          import(
            /* webpackChunkName: "products" */ "@/views/products/ProductsIndex.vue"
          ),
      },
      {
        path: "/products/:id",
        name: "ProductDetails",
        component: () =>
          import(
            /* webpackChunkName: "products" */ "@/views/products/ProductDetails.vue"
          ),
      },
    ],
  },
  // 404
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: () => import("@/views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // scrollBehavior() {
  //   return { top: 0 };
  // },
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: +50,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  },
  routes,
});

export default router;
