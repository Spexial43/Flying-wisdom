// store.js- 配置-管理员-搜索功能
import { defineStore } from "pinia";
import { getManagerAPI } from "@/api/Manager";

export const useManagerStore = defineStore("manager", {
  state: () => ({
    managers: [],
    searchQuery: "",
  }),
  getters: {
    filteredManagers: (state) => {
      return state.managers.filter((manager) => manager.uname.includes(state.searchQuery));
    },
  },
  actions: {
    async fetchManagers() {
      try {
        const response = await getManagerAPI();
        if (response && response.data) {
          // 假设response.data是你的管理员数据数组
          this.managers = response.data;
        }
      } catch (error) {
        console.error("获取管理员列表失败:", error);
      }
    },
    setSearchQuery(query) {
      this.searchQuery = query;
    },
  },
});
