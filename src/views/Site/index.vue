<!-- 站点 -->
<script setup>
import SiteAside from "./components/SiteAside.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="150px">
        <SiteAside />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  .el-container {
    .el-aside {
      height: 1200px;
      margin-left: -15px;
      margin-top: -27px;
    }
    .el-main {
      margin-top: -27px;
    }
  }
}
</style>
