<!-- 站点-----aside -->
<script setup></script>

<template>
  <div class="site-box">
    <ul>
      <li><router-link to="/site" exact-active-class="active-link">站点列表</router-link></li>
      <li>
        <router-link to="/site/sitemain" exact-active-class="active-link">站点用户</router-link>
      </li>
      <li>
        <router-link to="/site/siteset" exact-active-class="active-link">站点套餐</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.site-box {
  text-align: center;
  margin-top: 20px;
  background-color: #fff;
  height: 1000px;
  ul {
    li {
      height: 50px;
      line-height: 50px;
      transition: all 0.3s ease;
      &:hover {
        border-radius: 8px;
        color: #16a085; // 青色字体
      }

      .active-link {
        display: block;
        background-color: #16a085;
        border-radius: 8px;

        color: #fff;
      }
    }
  }
}
</style>
