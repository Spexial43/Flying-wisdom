<!-- 站点 ------ 列表 -->
<script setup>
import { onMounted, ref } from "vue";
import { putSetMealAPI, compileSetMealAPI, delSetMealAPI, stopSetMealAPI } from "@/api/site.js";
import { useSiteListStore } from "@/stores/siteListStores";
import { getSiteAPI } from "@/api/home";

// 定义defaultTime，这是一个数组，包含开始和结束时间
const defaultTime = ref([new Date(2000, 0, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]);

// tableData数据
// 获取表格数据
const tableData = ref([]);

const getTable = async () => {
  const res = await getSiteAPI();
  tableData.value = res.data;
};
onMounted(() => getTable());

// 添加站点
const dialogVisible = ref(false);
const addSite = () => {
  dialogVisible.value = true;
};

// 添加站点数据
const SiteName = ref(""); //站点名称
const SiteMeal = ref(""); //套餐
const SiteIntendant = ref(""); //站点管理员
const DomainName = ref(""); //站点域名
const createTime = ref(""); //开始时间
const TimeValue = ref(""); //到期时间
const state = ref("正常");

// 添加站点-弹框-确认按钮
const affirm = async () => {
  await putSetMealAPI({
    SiteName: SiteName.value,
    SiteMeal: SiteMeal.value,
    SiteIntendant: SiteIntendant.value,
    DomainName: DomainName.value,
    TimeValue: TimeValue.value,
    state: state.value,
  });
  dialogVisible.value = false;
  await getTable(); // 刷新表格数据
  SiteName.value = "";
  SiteMeal.value = "";
  SiteIntendant.value = "";
  DomainName.value = "";
  TimeValue.value = "";
  state;
};

// 状态
const stateName = ref("正常");
setTimeout(() => {
  stateName.value = "已停止";
}, 100000);

// 停止
const stop = async (row) => {
  // 发送停止请求给后端
  row.state = row.state === "正常" ? "已停止" : "正常";
  console.log(row.id);
  await stopSetMealAPI(row.id, row);
};

// 编辑站点数据
const currentRow = ref(null);

// 编辑
const title = ref();
const dialogVisibles = ref(false);
const compile = (row) => {
  currentRow.value = { ...row }; // 将当前行数据赋值给currentRow
  SiteName.value = row.SiteName;
  SiteMeal.value = row.SiteMeal;
  SiteIntendant.value = row.SiteIntendant;
  DomainName.value = row.DomainName;
  TimeValue.value = row.TimeValue;
  dialogVisibles.value = true;
};

// 编辑弹框确认
const compileOk = async () => {
  const res = await compileSetMealAPI(currentRow.value.id, {
    SiteName: SiteName.value,
    SiteMeal: SiteMeal.value,
    SiteIntendant: SiteIntendant.value,
    DomainName: DomainName.value,
    TimeValue: TimeValue.value,
  });
  console.log(res.data);
  dialogVisibles.value = false;
  await getTable(); // 刷新表格数据
};

// 删除
const delSite = async () => {
  const res = await delSetMealAPI(currentRow.value.id);
  dialogVisibles.value = false;
  await getTable(); // 刷新表格数据
};

// 使用站点列表 store
const siteListStore = useSiteListStore();
// 搜索参数
const searchParams = ref({
  SiteName: "",
  SiteMeal: "",
  SiteIntendant: "",
  DomainName: "",
  createTime: [],
  TimeValue: [],
});

// 搜索按钮
const searchSite = async () => {
  // 设置搜索参数
  await siteListStore.setSearchParams({
    siteName: searchParams.value.SiteName,
    packages: searchParams.value.SiteMeal,
    siteIntendant: searchParams.value.SiteIntendant,
    domainName: searchParams.value.DomainName,
    createTime: searchParams.value.createTime,
    timeValue: searchParams.value.TimeValue,
  });
  // 重新获取站点列表数据，会根据新的搜索参数进行过滤
  await siteListStore.filteredSiteList();
};

// 重置按钮
const resetSite = () => {
  searchParams.value = {
    SiteName: "", //站点名称
    SiteMeal: "", //套餐
    SiteIntendant: "", //站点管理员
    DomainName: "", //站点域名
    createTime: [],
    TimeValue: [],
  };
  // 重新获取表格数据
  siteListStore.fetchSiteList();
};
</script>

<template>
  <div class="site-box">
    <!-- 标题 -->
    <div class="site-top">
      <p>站点列表</p>
      <el-form-item>
        <el-button type="primary" @click="addSite">添加站点</el-button>
        <el-button>访问站点</el-button>
      </el-form-item>

      <!-- 添加站点弹框 -->
      <el-dialog v-model="dialogVisible" title="添加站点" width="500">
        <span>
          <el-form>
            <!-- 站点名称 -->
            <el-form-item label="站点名称">
              <el-input placeholder="请输入站点名称" v-model="SiteName" />
            </el-form-item>

            <!-- 套餐 -->
            <el-form-item label="套餐" style="margin-left: 30px">
              <el-select placeholder="请选择套餐" v-model="SiteMeal">
                <el-option label="标准套餐" value="标准套餐" />
                <el-option label="会员卡套餐" value="会员卡套餐" />
                <el-option label="蜗牛旅行社" value="蜗牛旅行社" />
                <el-option label="cms应用" value="cms应用" />
                <el-option label="全套餐" value="全套餐" />
                <el-option label="上门服务套餐" value="上门服务套餐" />
                <el-option label="pxx-上门服务套餐" value="pxx-上门服务套餐" />
                <el-option label="商城" value="商城" />
              </el-select>
            </el-form-item>

            <!-- 站点管理员 -->
            <el-form-item label="站点管理员" style="margin-left: -10px">
              <el-select placeholder="请选择站点管理员" v-model="SiteIntendant">
                <el-option label="123" value="123" />
              </el-select>
            </el-form-item>

            <!-- 站点域名 -->
            <el-form-item label="站点域名" style="margin-left: 6px">
              <el-input placeholder="请输入站点域名" v-model="DomainName" />
              <span style="color: #a9a9a9; font-size: 14px"
                >站点域名的配置是针对站点的wap和web端<br />需要将域名配置到您的服务器，同时域名需要解析您的服务器才可以生效<br />站点域名不需要加http或者https，末尾不需要加/</span
              >
            </el-form-item>

            <!-- 到期时间 -->
            <el-form-item label="到期时间">
              <el-date-picker
                v-model="TimeValue"
                type="datetime"
                placeholder="请选择日期-时间"
                format="YYYY-MM-DD HH:mm:ss"
                date-format="MMM DD, YYYY"
                time-format="HH:mm"
              />
            </el-form-item>
          </el-form>
        </span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="affirm"> 确认 </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <!-- 搜索 -->
    <div class="site-search">
      <el-form label-width="auto" :model="searchParams">
        <!-- 站点名称 -->
        <el-form-item label="站点名称" class="usName">
          <el-input
            placeholder="请输入站点名称"
            style="width: 300px"
            v-model="searchParams.SiteName"
          />
        </el-form-item>

        <!-- 站点域名 -->
        <el-form-item label="站点域名" class="usName" style="margin-left: 20px">
          <el-input
            placeholder="请输入站点域名"
            style="width: 300px"
            v-model="searchParams.DomainName"
          />
        </el-form-item>

        <!-- 应用 -->
        <el-form-item label="应用">
          <el-select placeholder="请输入应用" style="width: 300px">
            <el-option label="全部" value="全部" />
          </el-select>
        </el-form-item>

        <!-- 套餐 -->
        <el-form-item label="套餐" class="usName">
          <el-input placeholder="请输入套餐" style="width: 300px" v-model="searchParams.SiteMeal" />
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态">
          <el-select placeholder="请选择状态" style="width: 300px">
            <el-option label="正常" value="正常" />
          </el-select>
        </el-form-item>

        <!-- 创建时间 -->
        <el-form-item label="创建时间" class="lastTime" style="margin-left: 20px">
          <el-date-picker
            v-model="searchParams.createTime"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="defaultTime"
            style="width: 500px"
          >
          </el-date-picker>
        </el-form-item>

        <!-- 到期时间 -->
        <el-form-item label="到期时间" class="expireTime">
          <el-date-picker
            v-model="searchParams.TimeValue"
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
        <el-table-column prop="id" label="站点ID" width="150" />

        <el-table-column prop="SiteName" label="站点名称" width="150" />
        <el-table-column prop="SiteIntendant" label="站点管理员" width="250" />
        <el-table-column prop="SiteMeal" label="套餐" width="220" />
        <el-table-column prop="DomainName" label="站点域名" width="250" />
        <el-table-column prop="" label="创建时间" width="250" />
        <el-table-column prop="TimeValue" label="到期时间" width="300" />
        <!-- 状态 -->
        <el-table-column prop="state" label="状态" width="250">
          <template #default="{ row }">
            <span :class="row.state === '正常' ? 'stateName-zc' : 'stateName-ydq'">{{
              row.state
            }}</span>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" class="operation">
          <template #default="{ row }">
            <span class="operations" style="margin-right: 30px" @click="stop(row)">{{
              row.state === "停止" ? "正常" : "停止"
            }}</span>
            <span class="operations" style="margin-right: 30px" @click="compile(row)">编辑</span>
            <span class="operations" style="margin-right: 30px" @click="delSite">删除</span>
            <span class="operations" style="margin-right: 30px">详情</span>
            <span class="operations" style="margin-right: 30px">访问站点</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <!-- 编辑弹框 -->
  <el-dialog v-model="dialogVisibles" title="编辑站点" width="500" :before-close="handleClose">
    <span>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="站点名称">
          <p>
            {{ SiteName }}
          </p>
        </el-form-item>

        <!-- 套餐 -->
        <el-form-item>
          <el-form-item label="套餐">
            <el-select placeholder="请选择套餐" style="width: 400px" v-model="SiteMeal">
              <el-option label="标准套餐" value="标准套餐" />
              <el-option label="会员卡套餐" value="会员卡套餐" />
              <el-option label="蜗牛旅行社" value="蜗牛旅行社" />
              <el-option label="cms应用" value="cms应用" />
              <el-option label="全套餐" value="全套餐" />
              <el-option label="上门服务套餐" value="上门服务套餐" />
              <el-option label="pxx-上门服务套餐" value="pxx-上门服务套餐" />
              <el-option label="商城" value="商城" />
            </el-select>
          </el-form-item>
        </el-form-item>

        <!-- 站点域名 -->
        <el-form-item label="站点域名">
          <el-input placeholder="请输入站点域名" v-model="DomainName">
            <span style="color: #a9a9a9; font-size: 14px"
              >站点域名的配置是针对站点的wap和web端<br />需要将域名配置到您的服务器，同时域名需要解析您的服务器才可以生效<br />站点域名不需要加http或者https，末尾不需要加/</span
            >
          </el-input>
        </el-form-item>

        <!-- 到期时间 -->
        <el-form-item label="到期时间">
          <el-date-picker
            v-model="TimeValue"
            type="datetime"
            placeholder="请选择日期-时间"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="MMM DD, YYYY"
            time-format="HH:mm"
          />
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="compileOk"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.site-box {
  background-color: #fff;
  height: 100%;

  .site-top {
    display: flex;
    justify-content: space-between;
    padding: 20px;
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

    // 状态
    .stateName-zc {
      line-height: 30px;
      text-align: center;
      width: 40px;
      height: 30px;
      background-color: #f0f9eb;
      color: #67c23a;
    }
    .stateName-ydq {
      line-height: 30px;
      text-align: center;
      width: 60px;
      height: 30px;
      background-color: #fef0f0;
      color: #f68d8e;
    }

    // 操作
    .operations {
      font-size: 18px;
      color: #4178f0;
      cursor: pointer;

      &:hover {
        color: #419bf0;
      }
    }
  }
}
</style>
