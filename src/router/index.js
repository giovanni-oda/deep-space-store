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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
