<!-- 副侧边栏 -->

<script setup>
import { ref, onMounted } from "vue";
import { getAsidSeteAPI } from "@/api/set";

// 获取侧边栏数据
const asideList = ref([]);
const defaultActive = ref();
const getAside = async () => {
  const res = await getAsidSeteAPI();
  asideList.value = res.data;

  defaultActive.value = res.data[0].children[0].index;
  console.log(res.data[0].children[0].index);
};
onMounted(() => getAside());
</script>

<template>
  <div class="AssistantSideBar-box">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      :default-active="defaultActive"
    >
      <template v-for="item in asideList" :key="item.index">
        <el-sub-menu v-if="item.children" :index="item.index">
          <template #title>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.index" :index="child.path">
            {{ child.name }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.AssistantSideBar-box {
  margin-left: 10px;
  height: 100vh;
  background-color: #f0f2f5; // 背景色

  .el-menu {
    border-right: none; // 去掉右边框
    background-color: #fff; // 菜单背景色
  }

  .el-menu-item {
    &:hover {
      color: #16a085; // 悬停字体颜色
    }
  }

  .el-menu-item.is-active {
    background-color: #16a085; // 激活菜单项背景色
    color: #fff; // 激活菜单项字体颜色
    border-radius: 8px;
  }
}
</style>
