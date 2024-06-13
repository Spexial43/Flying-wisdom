<!-- 小程序 -->
<script setup></script>

<template>
  <div class="Manager-box">
    <!-- title -->
    <div class="Manager-title">
      <el-row>
        <el-col :span="24"><p>小程序平台</p></el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <div class="Manager-tab">
      <el-table :data="UserLogList" style="width: 100%">
        <el-table-column prop="uname" label="版本号" width="1000" />
        <el-table-column prop="IP" label="创建时间" width="1000" />
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
