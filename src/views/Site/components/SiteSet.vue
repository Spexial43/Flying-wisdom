<!-- 站点 ------ 站点套餐 -->
<script setup>
import { onMounted, ref } from "vue";
import { getSetMealAPI } from "@/api/site.js";
// 定义value1，这将是el-date-picker组件的v-model
const value1 = ref("");

// 定义defaultTime，这是一个数组，包含开始和结束时间
const defaultTime = ref([new Date(2000, 0, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]);

// 搜索按钮
const searchSite = () => {};

// 重置按钮
const resetSite = () => {};

// tableData数据
// 获取表格数据
const tableData = ref([]);
const getTable = async () => {
  const res = await getSetMealAPI();
  tableData.value = res.data;
};
onMounted(() => getTable());
</script>

<template>
  <div class="site-box">
    <!-- 标题 -->
    <div class="site-top">
      <p>站点套餐</p>
    </div>
    <!-- 搜索 -->
    <div class="site-search">
      <el-form label-width="auto">
        <!-- 套餐名称 -->
        <el-form-item label="套餐名称" class="usName">
          <el-input placeholder="请输入套餐名称" style="width: 300px" />
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="button-el">
          <el-button type="primary" @click="searchSite">搜索</el-button>
          <el-button @click="resetSite">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="site-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="套餐名称" width="520" />
        <el-table-column prop="packageApp" label="套餐内涵应用" width="520" />
        <el-table-column prop="packagePlugins" label="套餐内涵插件" width="520" />
        <el-table-column prop="creationTime" label="创建时间" width="520" />
        <el-table-column prop="operation" label="操作">
          <template>
            <router-link to="/">编辑</router-link>
            <router-link to="/">删除</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.site-box {
  background-color: #fff;
  height: 100%;
  .site-top {
    padding: 20px;
    p {
      font-size: 18px;
    }
  }

  //   搜索
  .site-search {
    margin-top: 20px;
    margin-left: 20px;
    .el-form {
      display: flex;
      flex-wrap: wrap;

      //   按钮
      .button-el {
        margin-left: 30px;
      }
    }
  }

  //   table
  .site-table {
    margin-top: 30px;
    margin-left: 30px;
  }
}
</style>
