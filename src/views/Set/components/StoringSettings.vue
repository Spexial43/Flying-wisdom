<!-- 存储设置 -->
<script setup>
import { getStoringAPI } from "@/api/Manager";
import { onMounted, ref } from "vue";
const UserStoringList = ref([]);
const getStoring = async () => {
  const res = await getStoringAPI();
  UserStoringList.value = res.data;
};
onMounted(() => getStoring());

// 设置
const dialogVisible = ref(false);
const rowList = ref();
const set = (row) => {
  console.log(row, "row");
  rowList.value = row;
  console.log(rowList.value);

  dialogVisible.value = true;
};

// 弹框
const state = ref("正常");
const radio1 = ref("1");
const affirm = () => {
  console.log(radio1.value);
  dialogVisible.value = false;
  if (radio1.value !== "1") {
    rowList.value.state = "停用";
    console.log(rowList.value.state);
    state.value = rowList.value.state;
  } else {
    rowList.value.state = "正常";
    console.log(rowList.value.state);

    state.value = rowList.value.state;
  }
};
</script>

<template>
  <div class="Manager-box">
    <!-- title -->
    <div class="Manager-title">
      <el-row>
        <el-col :span="24"><p style="font-size: 22px">存储设置</p></el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <div class="Manager-tab">
      <el-table :data="UserStoringList" style="width: 100%">
        <el-table-column prop="storageMode" label="存储方式" width="1500" />
        <!-- 是否启用 -->
        <el-table-column prop="state" label="是否启用" width="1000">
          <!-- <div :class="state === '正常' ? 'startUsing-zc' : 'startUsing-ty'">{{ state }}</div> -->
        </el-table-column>

        <!-- 设置 -->
        <el-table-column label="操作" width="380">
          <template #default="{ row, $index }">
            <p class="set" @click="set(row, $index)">设置</p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 设置弹框 -->
    <el-dialog v-model="dialogVisible" title="本地存储" width="500">
      <span class="pop">
        <p>是否启用</p>
        <el-radio-group v-model="radio1" class="ml-4">
          <el-radio value="1" size="large">启用</el-radio>
          <el-radio value="2" size="large">停用</el-radio>
        </el-radio-group>
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="affirm"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
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

    // 是否启用
    .startUsing-zc {
      height: 40px;
      width: 50px;
      text-align: center;
      line-height: 50px;
      background-color: #f0f9eb;
      color: #67c23a;
    }

    .startUsing-ty {
      height: 40px;
      width: 50px;
      text-align: center;
      line-height: 50px;
      background-color: #fef0f0;
      color: #f56c6c;
    }

    // 设置
    .set {
      font-size: 18px;
      color: #5479f3;

      &:hover {
        cursor: pointer;
        color: #6d8ffd;
      }
    }
  }

  // 弹框
  .pop {
    display: flex;
    align-items: center;
    margin-left: 70px;

    p {
      margin-right: 10px;
    }
  }
}
</style>
