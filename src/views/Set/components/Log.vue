<!-- 日志 -->
<script setup>
import { getlogAPI } from "@/api/Manager";
import { onMounted, ref } from "vue";
const UserLogList = ref([]);
const getLog = async () => {
  const res = await getlogAPI();
  console.log(res);
  UserLogList.value = res.data;
};
onMounted(() => getLog());
</script>

<template>
  <div class="Manager-box">
    <!-- title -->
    <div class="Manager-title">
      <el-row>
        <el-col :span="24"><p>操作日志</p></el-col>
      </el-row>
    </div>

    <!-- 搜索 -->
    <div class="Manager-search">
      <el-row>
        <el-col :span="23">
          <el-form style="max-width: 400px">
            <el-form-item label="登录IP" style="display: flex; align-items: center">
              <el-input placeholder="请输入登录IP" style="flex: 1"></el-input>
              <el-button type="primary" style="margin-left: 30px">搜索</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="1"><el-button type="primary">新增角色</el-button></el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <div class="Manager-tab">
      <el-table :data="UserLogList" style="width: 100%">
        <el-table-column prop="uname" label="管理员姓名" width="500" />
        <el-table-column prop="IP" label="登录IP" width="500" />
        <el-table-column prop="link" label="链接" width="500" />
        <el-table-column prop="ask" label="请求方式" width="380" />
        <el-table-column prop="lastlogin" label="操作时间" width="380" />
        <el-table-column prop="state" label="操作" width="380" />
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
