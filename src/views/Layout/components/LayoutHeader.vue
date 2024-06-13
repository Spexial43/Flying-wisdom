<!-- 侧边栏 -->
<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useTabStore } from "@/stores/tabStores";
import { useTokenStore } from "@/stores/loginStores";
import { getMenuAPI } from "@/api/home";
const router = useRouter();
const route = useRouter();
const tokenStore = useTokenStore();
const outLogin = () => {
  router.push("/login");
  tokenStore.clearToken();
};

// 刷新页面
const refreshPage = () => {
  window.location.reload();
};

// 获取面包屑导航
const menuList = ref([]);
const breadcrumb = ref([]);

const generateBreadcrumb = () => {
  const matchedRoutes = router.currentRoute.value.matched;
  const matchedPaths = matchedRoutes.map((route) => route.path);
  breadcrumb.value = menuList.value.filter((item) => matchedPaths.includes(item.path));
};

const getMenuList = async () => {
  const res = await getMenuAPI();
  menuList.value = res.data;
  generateBreadcrumb();
};

onMounted(() => getMenuList());
</script>

<template>
  <!-- header -->
  <div class="header-box">
    <!-- 左侧 刷新-首页 -->
    <div class="header-list-left">
      <!-- 刷新图标 -->
      <div class="refresh" @click="refreshPage"><i class="iconfont icon-shuaxin1"></i></div>

      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path">
          <router-link :to="item.path">{{ item.label }}</router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧 头像-下拉框 -->
    <div class="header-list-right">
      <!-- 头像 -->
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <!-- 下拉框 -->
      <el-dropdown>
        <span class="el-dropdown-link"
          >彼方<i class="iconfont icon-jiantou"></i>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><i class="iconfont icon-shezhi"></i>账号设置</el-dropdown-item>
            <el-dropdown-item><i class="iconfont icon-shouquan"></i>授权信息</el-dropdown-item>
            <el-dropdown-item
              ><i class="iconfont icon-weibiaoti2010104"></i>修改密码</el-dropdown-item
            >
            <el-dropdown-item @click="outLogin"
              ><i class="iconfont icon-tuichu"></i>退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  line-height: 70px;
  // 左侧
  .header-list-left {
    display: flex;
    i {
      font-weight: 700;
    }
    p {
      margin-left: 20px;
    }

    .refresh {
      margin-left: 40px;
    }
    // 面包屑
    .el-breadcrumb {
      line-height: 70px;
      margin-left: 60px;
    }
  }
  // 右侧
  .header-list-right {
    display: flex;
    align-items: center;
    .el-dropdown {
      margin-left: 20px;
      line-height: 70px;
      border: none;
      .el-dropdown-link {
        font-size: 18px;
        i {
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
