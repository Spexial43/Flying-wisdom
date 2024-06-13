import http from "@/views/utils/http";
// 请求设置-站点
export const getSiteAPI = () => {
  return http({
    url: "/siteList",
  });
};

// 获取面包屑导航

export const getMenuAPI = () => {
  return http({
    url: "/menuData",
  });
};
