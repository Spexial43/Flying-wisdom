<!-- 管理员 -->
<script setup>
import { getManagerAPI, lockRoleAPI } from "@/api/Manager";
import { onMounted, ref } from "vue";

// 管理员列表数据
const managerList = ref([]);

// 获取管理员列表数据
const getManagerList = async () => {
  const res = await getManagerAPI();
  managerList.value = res.data;
};
onMounted(() => getManagerList());

// pinia- 搜索功能
import { useManagerStore } from "@/stores/serachStores";
const managerStore = useManagerStore();

// 导入外部弹框组件
import ChannelEdit from "@/components/ChannelEdit.vue";

// 在组件挂载时获取管理员列表
onMounted(async () => {
  // 假设getManagerAPI是你的API调用
  const res = await getManagerAPI();
  managerStore.managers = res.data; // 假设res.data是你的管理员数据数组
});

// 搜索功能实现
const searchInput = ref("");

// 搜索方法
const searchManagers = () => {
  console.log(searchInput.value);
  managerStore.setSearchQuery(searchInput.value);
  managerList.value = managerStore.filteredManagers;
  searchInput.value = "";
};

// 重置
const resethManagers = () => {
  searchInput.value = ""; // 清空搜索框
  getManager(); // 刷新管理员列表
};

// 加载
const loading = ref(false);

const getManager = async () => {
  loading.value = true;
  const res = await getManagerAPI();
  loading.value = false;
  console.log(res);
  managerList.value = res.data;
};
onMounted(() => getManager());

const dialog = ref();

// 新增
const onAddChannel = () => {
  dialog.value.open({});
};
// 编辑
const onAddCompile = (row) => {
  dialog.value.open(row);
};

// 更新页面数据
const refreshData = () => {
  getManager();
};

// 锁定
const onlockChannel = async (row) => {
  console.log(row, "row");
  row.state = row.state === "正常" ? "锁定" : "正常";
  await lockRoleAPI(row.id, row);
};

const onSuccess = () => {
  getManager();
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
          <el-form style="max-width: 500px">
            <el-form-item label="账号" style="display: flex; align-items: center">
              <el-input
                @change="searchInp"
                v-model="searchInput"
                placeholder="请输入账号"
                style="flex: 1; margin-right: 20px"
              ></el-input>
              <el-button @click="searchManagers" type="primary">搜索</el-button>
              <el-button @click="resethManagers">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="1"
          ><el-button type="primary" @click="onAddChannel">新增管理员</el-button></el-col
        >
      </el-row>
    </div>

    <!-- 表格 -->
    <div class="Manager-tab">
      <el-table :data="managerList" style="width: 100%" v-loading="loading">
        <el-table-column prop="header" label="头像" width="180">
          <template v-slot="{ row }">
            <img :src="row.header" style="width: 50px; height: 50px; border-radius: 50%" />
          </template>
        </el-table-column>
        <el-table-column prop="uname" label="账号" width="300" />
        <el-table-column prop="name" label="姓名" width="300" />
        <el-table-column prop="role" label="角色" width="300" />
        <!-- 用户状态 -->
        <el-table-column prop="state" label="用户状态" width="300">
          <template #default="{ row }">
            <span :class="row.state === '正常' ? 'useState-zc' : 'useState-sd'">{{
              row.state
            }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="lastlogin" label="最后登入时间" width="300" />
        <el-table-column prop="lastIp" label="最后登录IP" width="300" />
        <!-- 操作 -->
        <el-table-column prop="operation" label="操作" width="150">
          <template #default="{ row }">
            <div style="display: flex" class="button-el">
              <el-button size="mini" type="primary" @click="onAddCompile(row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="onlockChannel(row)">锁定</el-button>
            </div>
          </template>
        </el-table-column>

        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>
    </div>

    <!-- 弹框 -->
    <ChannelEdit ref="dialog" @success="onSuccess" @update-data="refreshData"></ChannelEdit>
  </div>
</template>

<style lang="scss" scoped>
.Manager-box {
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

    // 用户状态
    .useState-zc {
      display: block;
      line-height: 30px;
      text-align: center;
      width: 60px;
      height: 30px;
      background-color: #d9e9d0;
      color: #7ece61;
      border-radius: 10px;
    }

    .useState-sd {
      display: block;
      line-height: 30px;
      text-align: center;
      width: 60px;
      height: 30px;
      background-color: #fef0f0;
      color: #f56e6e;
      border-radius: 10px;
    }
  }
}
</style>
