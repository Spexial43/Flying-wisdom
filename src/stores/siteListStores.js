// store.js
import { defineStore } from "pinia";
import { getSiteAPI } from "@/api/home";
import { ref } from "vue";

export const useSiteListStore = defineStore("site", () => {
  const siteList = ref([]); // 站点列表数据
  const searchParams = ref({
    SiteName: "",
    SiteMeal: "",
    SiteIntendant: "",
    DomainName: "",
    createTime: [],
    TimeValue: [],
  }); // 搜索参数

  // 过滤站点列表数据
  const filteredSiteList = () => {
    const keyword = searchParams.value.SiteName.trim().toLowerCase(); // 获取搜索关键字并转为小写
    if (!keyword) {
      return siteList.value; // 如果搜索关键字为空，则返回全部站点列表数据
    } else {
      // 使用关键字过滤站点列表数据
      return siteList.value.filter((site) => site.SiteName.toLowerCase().includes(keyword));
    }
  };

  // 获取站点列表数据
  const fetchSiteList = async () => {
    const res = await getSiteAPI();
    siteList.value = res.data;
  };

  // 设置搜索参数
  const setSearchParams = (params) => {
    searchParams.value = params;
  };

  return {
    siteList,
    searchParams,
    filteredSiteList,
    fetchSiteList,
    setSearchParams,
  };
});
