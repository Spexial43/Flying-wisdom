<!-- 站点 ------ 站点用户 -->
<script setup>
import { onMounted, ref } from "vue";
import { getSiteuserAPI } from "@/api/site.js";
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
  const res = await getSiteuserAPI();
  tableData.value = res.data;
};
onMounted(() => getTable());
</script>

<template>
  <div class="site-box">
    <!-- 标题 -->
    <div class="site-top">
      <p>站点用户</p>
    </div>
    <!-- 搜索 -->
    <div class="site-search">
      <el-form label-width="auto">
        <el-form-item label="用户名" class="usName">
          <el-input placeholder="请输入账号/用户名" style="width: 300px" />
        </el-form-item>

        <!-- 时间选择器 -->
        <el-form-item label="选择时间" class="lastTime">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="defaultTime"
            style="width: 500px"
          >
          </el-date-picker>
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
        <el-table-column prop="header" label="头像" width="180">
          <template v-slot="{ row }">
            <img
              :src="row.header"
              alt="头像"
              style="width: 50px; height: 50px; border-radius: 50%"
            />
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="账号" width="280" />
        <el-table-column prop="name" label="用户真实姓名" width="400" />
        <el-table-column prop="number" label="站点数量" width="400" />
        <el-table-column prop="lastLogin" label="最后登录时间" width="400" />
        <el-table-column prop="lastIP" label="最后登录IP" width="400" />
        <el-table-column prop="operation" label="操作">
          <template v-slot="{ row }">
            <router-link to="/">{{ row.operation }}</router-link>
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
    .el-form {
      display: flex;

      .lastTime {
        margin-left: 80px;
      }

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
