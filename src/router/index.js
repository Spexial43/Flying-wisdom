import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Home from "@/views/Home/index.vue";
import Set from "@/views/Set/index.vue";
import Site from "@/views/Site/index.vue";
import Use from "@/views/Use/index.vue";
import Exploit from "@/views/Exploit/index.vue";
import Project from "@/views/Project/index.vue";

import BasicSetting from "@/views/Set/components/BasicSetting.vue";
import CopyrightSetting from "@/views/Set/components/CopyrightSetting.vue";
import Website from "@/views/Set/components/Website.vue";

import Log from "@/views/Set/components/Log.vue";
import Manager from "@/views/Set/components/Manager.vue";
import Role from "@/views/Set/components/Role.vue";

import StoringSettings from "@/views/Set/components/StoringSettings.vue";
import LoginSettings from "@/views/Set/components/LoginSettings.vue";
import WeChat from "@/views/Set/components/WeChat.vue";
import MiniProgram from "@/views/Set/components/MiniProgram.vue";
import Material from "@/views/Set/components/Material.vue";
import Map from "@/views/Set/components/Map.vue";
import Allocation from "@/views/Set/components/Allocation.vue";

import SiteList from "@/views/Site/components/SiteList.vue";
import SiteMain from "@/views/Site/components/SiteMain.vue";
import SiteSet from "@/views/Site/components/SiteSet.vue";

import NProgress from "nprogress"; // 引入 nprogress 库
import "nprogress/nprogress.css"; // nprogress 样式文件

import { useTokenStore } from "@/stores/loginStores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Layout",
      component: Layout,
      children: [
        {
          path: "",
          name: "Home",
          component: Home,
        },
        {
          path: "set",
          name: "Set",
          component: Set,
          children: [
            {
              path: "",
              name: "BasicSetting",
              component: BasicSetting,
            },
            {
              path: "copyrightsetting",
              name: "CopyrightSetting",
              component: CopyrightSetting,
            },
            {
              path: "website",
              name: "Website",
              component: Website,
            },
            {
              path: "log",
              name: "Log",
              component: Log,
            },
            {
              path: "manager",
              name: "Manager",

              component: Manager,
            },
            {
              path: "role",
              name: "Role",

              component: Role,
            },
            {
              path: "storingsettings",
              name: "StoringSettings",

              component: StoringSettings,
            },
            {
              path: "loginsettings",
              name: "LoginSettings",

              component: LoginSettings,
            },
            {
              path: "wechat",
              name: "WeChat",

              component: WeChat,
            },
            {
              path: "miniprogram",
              name: "MiniProgram",

              component: MiniProgram,
            },
            {
              path: "material",
              name: "Material",

              component: Material,
            },
            {
              path: "map",
              name: "Map",

              component: Map,
            },
            {
              path: "allocation",
              name: "Allocation",

              component: Allocation,
            },
          ],
        },
        {
          path: "site",
          name: "Site",
          component: Site,
          children: [
            {
              path: "",
              name: "SiteList",

              component: SiteList,
            },

            {
              path: "sitemain",
              name: "SiteMain",

              component: SiteMain,
            },
            {
              path: "siteset",
              name: "SiteSet",

              component: SiteSet,
            },
          ],
        },
        {
          path: "use",
          name: "Use",
          component: Use,
        },
        {
          path: "exploit",
          name: "Exploit",
          component: Exploit,
        },
        {
          path: "project",
          name: "Project",
          component: Project,
        },
      ],
    },
    {
      path: "/login",
      name: "Login",

      component: Login,
    },
  ],
});
// 当路由请求之前
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();
  // 这个一定要加，没有next()页面不会跳转的
  next();
});
// 当路由请求之后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done();
});

router.beforeEach((to, from, next) => {
  const tokenStore = useTokenStore();
  const token = tokenStore.userToken;
  if (token) {
    next();
  } else {
    // 如果没有 token，重定向到登录页面
    if (to.name !== "Login") {
      next({ name: "Login" });
    } else {
      next(); // 已经在登录页面，放行
    }
  }
});

export default router;
