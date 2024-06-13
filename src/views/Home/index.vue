<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { getBrokenLineAPI, getCakeAPI } from "@/api/echarts";
import { getSiteAPI } from "@/api/home";
// 折线图数据
const lineChartData = ref({});
// 饼状图数据
const pieChartData = ref({});
// 站点数据
const SiteList = ref([]);
// 正常站点数量
const SiteNumber = ref();

// 过期站点
const Past = ref();

// 请求折线图数据
const getLineChartData = async () => {
  const res = await getBrokenLineAPI();
  lineChartData.value = res.data;
  updateLineChart(); // 调用更新折线图的函数
};

// 请求饼状图数据
const getPieChartData = async () => {
  const res = await getCakeAPI();
  pieChartData.value = res.data;
  console.log(res.data);
  updatePieChart(); // 调用更新饼状图的函数
};

// 请求站点数据
const getSiteList = async () => {
  const res = await getSiteAPI();
  console.log(res);
  SiteList.value = res.data;
  SiteNumber.value = res.data.length;
  // 统计过期站点数量
  Past.value = res.data.filter((site) => site.state === "已停止").length;
  console.log(Past.value);
};

const lineChartRef = ref(null);
const pieChartRef = ref(null);

// 初始化和更新折线图的函数
const updateLineChart = () => {
  if (lineChartRef.value && lineChartData.value.series) {
    const lineChart = echarts.init(lineChartRef.value);
    const lineOption = {
      title: {
        text: "新增站点",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["新增站点"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: lineChartData.value.xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "新增站点",
          type: "line",
          stack: "总量",
          data: lineChartData.value.series,
        },
      ],
    };
    lineChart.setOption(lineOption);
  }
};

// 初始化和更新饼状图的函数
const updatePieChart = () => {
  if (pieChartRef.value && pieChartData.value.series) {
    const pieChart = echarts.init(pieChartRef.value);
    const pieOption = {
      // ...饼状图的配置，使用 pieChartData.value 中的数据
      title: {
        text: "站点分布",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "站点分布",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: pieChartData.value.series,
        },
      ],
    };
    pieChart.setOption(pieOption);
  }
};

// 组件挂载后请求数据
onMounted(() => {
  getLineChartData();
  getPieChartData();
  getSiteList();
});
</script>

<template>
  <div class="home-box">
    <div class="home-cont">
      <!-- 第一排 -->
      <el-row class="home-one">
        <el-col :span="24">
          <p>数据概况</p>
          <span>更新时间：2024-6-5 13:05:05</span>
        </el-col>
      </el-row>

      <!-- 第二排 -->
      <el-row class="home-two">
        <el-col :span="6">
          <div class="home-info">
            <p>正常站点（个）</p>
            <strong>{{ SiteNumber }}</strong>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="home-info">
            <p>过期站点（个）</p>
            <strong>{{ Past }}</strong>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="home-info">
            <p>未安装应用（个）</p>
            <strong>0</strong>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="home-info">
            <p>已安装应用（个）</p>
            <strong>11</strong>
          </div>
        </el-col>
      </el-row>

      <!-- 第三排 -->
      <el-row class="home-three">
        <router-link to="/site">
          <el-col :span="4.5">
            <div class="home-info-list">
              <i class="iconfont icon-liebiao"></i>
              <p>站点列表</p>
            </div>
          </el-col>
        </router-link>

        <el-col :span="4.5">
          <router-link to="/site/siteset">
            <div class="home-info-list">
              <i class="iconfont icon-taocan"></i>
              <p>站点套餐</p>
            </div>
          </router-link>
        </el-col>

        <el-col :span="4.5">
          <router-link to="/site">
            <div class="home-info-list">
              <i class="iconfont icon-zhandianfuwu"></i>
              <p>新增站点</p>
            </div>
          </router-link>
        </el-col>

        <el-col :span="4.5">
          <router-link to="/site/sitemain">
            <div class="home-info-list">
              <i class="iconfont icon-yonghu"></i>
              <p>站点用户</p>
            </div>
          </router-link>
        </el-col>

        <el-col :span="4.5">
          <router-link to="/use">
            <div class="home-info-list">
              <i class="iconfont icon-shichang"></i>
              <p>应用市场</p>
            </div>
          </router-link>
        </el-col>
      </el-row>

      <!-- 第四排 - 图表 -->
      <el-row class="home-four">
        <el-col :span="12">
          <div ref="lineChartRef" style="height: 400px"></div>
        </el-col>

        <el-col :span="12">
          <div ref="pieChartRef" style="height: 400px"></div>
        </el-col>
      </el-row>

      <!-- 第五排-系统环境 -->
      <div class="home-five">
        <div class="home-hd">
          <h4>系统环境</h4>
        </div>
        <div class="home-bd">
          <div class="home-bd-info">
            <p>操作系统：<span>Linux</span></p>
            <p>PHP版本号：<span>8.0.26</span></p>
            <p>生产环境：<span>Apache</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-box {
  margin-left: -10px;
  margin-top: -10px;
  background-color: #fff;
  padding: 20px;
  .home-cont {
    border: 1px solid #e7e4e4;

    // 第一排
    .home-one {
      margin-top: 10px;
      .el-col {
        display: flex;
        line-height: 70px;
        margin-left: 30px;
        border-bottom: 1px solid #dbd8d8;
        p {
          font-weight: 700;
          font-size: 20px;
          color: #333333;
        }
        span {
          margin-top: 3px;
          margin-left: 20px;
          font-size: 15px;
          color: #798085;
        }
      }
    }

    // 第二排
    .home-two {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      .el-col {
        padding-top: 50px;
        padding-left: 200px;
        .home-info {
          padding-bottom: 10px;
          p {
            color: #666;
            margin-bottom: 10px;
          }
          strong {
            font-size: 30px;
            font-weight: 400;
          }
        }
      }
    }

    // 第三排
    .home-three {
      margin-top: 70px;
      justify-content: space-between;

      .el-col {
        margin-left: 40px;

        .home-info-list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 150px;
          width: 380px;
          background-color: #e7e5e5;

          .iconfont {
            font-size: 30px;
            color: #424242;
          }

          p {
            margin-top: 10px;
            font-size: 18px;
          }
        }
      }
    }

    // 第四排
    .home-four {
      margin-top: 100px;
      .el-col {
        padding-left: 10px;
      }
    }

    // 第五排
    .home-five {
      margin-top: 50px;
      margin-left: 20px;
      .home-hd {
        border-bottom: 1px solid #d8d6d6;
        h4 {
          font-size: 20px;
          padding-bottom: 20px;
        }
      }

      .home-bd {
        height: 60px;
        background-color: #fbfbfb;

        margin-top: 40px;

        .home-bd-info {
          display: flex;
          justify-content: space-around;
          line-height: 60px;
        }
      }
    }
  }
}
</style>
