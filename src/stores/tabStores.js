import { defineStore } from "pinia";

export const useTabStore = defineStore("tab", () => {
  const tabsList = [
    {
      path: "/",
      name: "home",
      label: "首页",
      icon: "diannao",
    },
  ];

  const selectMenu = (val) => {
    console.log(val.value.name, "val");
    // 判断数据是否为首页
    if (val.value.name !== "home") {
      const index = tabsList.findIndex((item) => item.name === val.name);
      console.log(index);
      // 如果不存在
      if (index === -1) {
        tabsList.value.push(val);
      }
    }
  };

  return {
    tabsList,
    selectMenu,
  };
});
