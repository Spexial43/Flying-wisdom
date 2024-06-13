import { ref } from "vue";
import { defineStore } from "pinia";

export const useTokenStore = defineStore(
  "token",
  () => {
    const userToken = ref(null);
    const getToken = (token) => {
      console.log(token);
      userToken.value = token;
    };
    const clearToken = () => {
      userToken.value = null;
    };
    return {
      userToken,
      getToken,
      clearToken,
    };
  },
  {
    persist: true, // 确保设置了持久化
  }
);
