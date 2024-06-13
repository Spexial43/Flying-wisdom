import http from "@/views/utils/http";

// 配置-侧边栏
export const getAsidSeteAPI = () => {
  return http({
    url: "/SetNav",
  });
};

// 基础设置
export const getSetAPI = (data) => {
  return http({
    url: "/setList",
    method: "POST",
    data,
  });
};

// 版权设置
export const postCopyrightAPI = (data) => {
  return http({
    url: "/copyrightList",
    method: "POST",
    data,
  });
};

// 侧边栏
export const getAsideAPI = () => {
  return http({
    url: "/menuData",
  });
};
