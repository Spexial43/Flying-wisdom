<!-- 侧边栏 -->
<script setup>
import { onMounted, ref } from "vue";
import { useSideStore } from "@/stores/sideStores";
import { useRouter } from "vue-router";
const router = useRouter();
const sideStores = useSideStore();

const pathInfo = ref(localStorage.getItem("activePath") || null);

onMounted(() => sideStores.getAside());

// 路由跳转
const clickActive = (item) => {
  pathInfo.value = item.path;
  localStorage.setItem("activePath", item.path);
};
</script>

<template>
  <div class="sideBar-box">
    <div class="sideBar-logo">
      <router-link to="/"><img src="/src/assets/image/logo.png" alt="" /></router-link>
    </div>
    <el-menu default-active="2" class="el-menu-vertical-demo" router>
      <el-menu-item
        :index="item.path"
        v-for="item in sideStores.asideList"
        :key="item.label"
        @click="clickActive(item)"
        :class="{ active: item.path === pathInfo }"
      >
        <el-icon><i :class="`iconfont icon-${item.icon}`"></i></el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.sideBar-box {
  height: 100vh;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3); // 阴影
  background-color: #fff;
  .sideBar-logo {
    text-align: center;
    padding: 20px 0;
    img {
      width: 70px;
      height: 70px;
    }
  }

  .el-menu-vertical-demo {
    margin-top: -30px;
    border: none;
    .el-menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100px;
      line-height: 1.5;
      // color: #ecf0f1; // 字体颜色
      transition: background-color 0.3s, transform 0.3s;
      margin-bottom: 1px;

      &.active {
        background-color: #1abc9c; // 激活项背景色
        border-radius: 8px;
        color: #ffff;
      }

      &:hover {
        border-radius: 8px;
        color: #ffff;
        background-color: #16a085; // 悬停背景色
      }

      .el-icon {
        margin-bottom: 10px;

        i {
          color: #000;
          font-size: 25px;
        }
      }

      span {
        font-size: 16px;
        color: #3a3737;
      }
    }
  }
}
</style>
