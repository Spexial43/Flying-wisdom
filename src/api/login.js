import http from "@/views/utils/http";
// 登入
export const getLoginAPI = () => {
  return http({
    url: "/login",
  });
};
