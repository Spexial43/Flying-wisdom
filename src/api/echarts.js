import http from "@/views/utils/http";
// 请求设置-echarts-折线图
export const getBrokenLineAPI = () => {
  return http({
    url: "/lineChartData",
  });
};

// 请求设置-echarts-折线图
export const getCakeAPI = () => {
  return http({
    url: "/pieChartData",
  });
};
