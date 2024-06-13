<!-- 设置 -->
<script setup>
import AssistantSideBar from "./components/AssistantSideBar.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <AssistantSideBar />
      </el-aside>
      <el-main style="background-color: #fff">
        <!-- 这里使用 router-view 来根据路由动态显示组件 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  margin-top: -10px;
  margin-left: -20px;

  .el-main {
    margin: 10px;
    height: 100%;
  }
}
</style>
