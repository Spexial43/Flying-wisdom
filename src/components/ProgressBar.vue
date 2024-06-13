<template>
  <div class="progress" v-if="isNavigating">
    <div class="bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const isNavigating = ref(false);
const progress = ref(0);

watch(isNavigating, (val) => {
  if (val) {
    startProgressBar();
  }
});

const startProgressBar = () => {
  let interval = setInterval(() => {
    progress.value += 10; // 根据需要调整增长速度
    if (progress.value >= 100) {
      clearInterval(interval);
      progress.value = 0;
      isNavigating.value = false;
    }
  }, 100);
};
</script>

<style>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #007bff; /* 进度条颜色可以自行修改 */
  z-index: 9999; /* 确保进度条在顶层 */
}

.bar {
  height: 100%;
  background-color: white; /* 进度条背景色 */
}
</style>
