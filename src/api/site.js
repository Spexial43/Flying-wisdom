import http from "@/views/utils/http";

// 站点用户
export const getSiteuserAPI = () => {
  return http({
    url: "/siteUser",
  });
};

// 站点套餐
export const getSetMealAPI = () => {
  return http({
    url: "/setMeal",
  });
};

// 新增站点
export const putSetMealAPI = (data) => {
  return http({
    url: "/siteList",
    method: "POST",
    data,
  });
};

// 编辑 站点列表
export const compileSetMealAPI = (id, data) => {
  return http({
    url: `/siteList/${id}`,
    method: "PUT",
    data,
  });
};

// 删除 站点列表
export const delSetMealAPI = (id, data) => {
  return http({
    url: `/siteList/${id}`,
    method: "DELETE",
    data,
  });
};

// 停止站点-更新状态到后端
export const stopSetMealAPI = (id, data) => {
  return http({
    url: `/siteList/${id}`,
    method: "PUT",
    data,
  });
};
