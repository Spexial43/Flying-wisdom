import { defineStore } from "pinia";
import { getAsideAPI } from "@/api/set";
import { ref } from "vue";

export const useSideStore = defineStore("side", () => {
  const asideList = ref([]);
  const getAside = async () => {
    const res = await getAsideAPI();
    asideList.value = res.data;
  };
  return {
    asideList,
    getAside,
  };
});
