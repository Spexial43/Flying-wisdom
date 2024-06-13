import http from "@/views/utils/http";
// 请求设置-管理员
export const getManagerAPI = () => {
  return http({
    url: "/tableData",
  });
};
// 管理员角色
export const getUsernameAPI = () => {
  return http({
    url: "/tableData",
  });
};

export const getRoleAPI = () => {
  return http({
    url: "/tableList",
  });
};

// 管理员锁定
export const lockRoleAPI = (id, data) => {
  return http({
    url: `/tableData/${id}`,
    method: "PUT",
    data,
  });
};

// 编辑管理员角色
export const updataUsernameAPI = (id, data) => {
  return http({
    url: `/tableData/${id}`,
    method: "PUT",
    data,
  });
};

// 新增管理员角色
export const addUsernameAPI = (data) => {
  return http({
    url: "/tableData",
    method: "POST",
    data,
  });
};
// 删除管理员
// export const delUsernameAPI = (id, data) => {
//   return http({
//     url: `/tableData/${id}`,
//     method: "DELETE",
//     data,
//   });
// };

// 删除管理员角色

export const delTableListAPI = (id, data) => {
  return http({
    url: `/tableList/${id}`,
    method: "DELETE",
    data,
  });
};

// 操作日志
export const getlogAPI = () => {
  return http({
    url: "/logList",
  });
};

// 存储设置
export const getStoringAPI = () => {
  return http({
    url: "/storageList",
  });
};

// 修改存储
