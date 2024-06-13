<!-- 角色 -->
<script setup>
import { getRoleAPI, delTableListAPI } from "@/api/Manager";
import { onMounted, ref } from "vue";

// pinia
import { useManagerStore } from "@/stores/serachStores";
const managerStore = useManagerStore();
const UserRoleList = ref([]);
const getRole = async () => {
  const res = await getRoleAPI();
  UserRoleList.value = res.data;
};
onMounted(() => getRole());

// 删除
const onDelChannel = async (row, $index) => {
  console.log(row.id, $index);
  const res = await delTableListAPI(row.id);
  console.log(res.data);
  getRole();
};

// 搜索方法
// 搜索功能实现
const searchInput = ref("");
const searchManagers = () => {
  managerStore.setSearchQuery(searchInput.value);
  UserRoleList.value = managerStore.filteredManagers;
  searchInput.value = "";
};

// 重置
const resethManagers = () => {
  searchInput.value = ""; // 清空搜索框
  getRole(); // 刷新管理员列表
};
</script>

<template>
  <div class="Manager-box">
    <!-- title -->
    <div class="Manager-title">
      <el-row>
        <el-col :span="24"><p>管理员</p></el-col>
      </el-row>
    </div>

    <!-- 搜索 -->
    <div class="Manager-search">
      <el-row>
        <el-col :span="23">
          <el-form style="max-width: 400px">
            <el-form-item label="账号" style="display: flex; align-items: center">
              <el-input placeholder="请输入账号" style="flex: 1" v-model="searchInput" />
              <el-button type="primary" style="margin-left: 30px" @click="searchManagers"
                >搜索</el-button
              >
              <el-button @click="resethManagers">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="1"><el-button type="primary">新增角色</el-button></el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <div class="Manager-tab">
      <el-table :data="UserRoleList" style="width: 100%">
        <el-table-column prop="name" label="角色名称" width="750" />
        <el-table-column prop="state" label="状态" width="750">
          <template v-slot="{ row }">
            <span :style="{ color: row.state === '启用' ? 'green' : 'red' }">{{ row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lastlogin" label="创建时间" width="750" />
        <el-table-column prop="operation" label="操作" width="380">
          <template #default="{ row, $index }">
            <div style="display: flex" class="button-el">
              <el-button size="mini" type="primary">编辑</el-button>
              <el-button size="mini" type="danger" @click="onDelChannel(row, $index)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Manager-box {
  .Manager-title {
    p {
      font-size: 18px;
    }
  }
  .Manager-search {
    margin-top: 20px;
  }

  // 表格
  .Manager-tab {
    margin-top: 30px;
    .el-button {
      margin-right: 5px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
