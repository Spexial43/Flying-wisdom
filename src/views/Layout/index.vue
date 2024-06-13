<script setup>
import LaySidebar from "./components/LaySidebar.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <!-- 侧边栏 -->
        <LaySidebar />
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header height="70px" style="background-color: #fff">
          <LayoutHeader />
        </el-header>
        <el-main>
          <!-- 二级路由-内容 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-aside {
  width: 100px;
}
</style>
