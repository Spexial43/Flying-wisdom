<!-- 登录设置 -->
<script setup>
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";

// 图片上传...
const imgUrl = ref("");
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw);
};

// 开关

const value1 = ref(true);
const value2 = ref(true);
</script>

<template>
  <div class="CopyrightSetting-box">
    <div class="CopyrightSetting-cont">
      <div class="hd">
        <p>登录设置</p>
      </div>
      <div class="bd">
        <p style="margin-left: -70px">平台端</p>

        <!-- 开关 -->
        <div class="switch">
          <el-switch inactive-text="是否启用验证码" v-model="value1" />
        </div>

        <!-- Logo 上传 -->
        <div class="logo-one">
          <p>登录页广告图</p>
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onSelectFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>

        <!-- 服务信息 -->
        <div class="service">
          <p style="margin-left: -70px">站点端</p>
          <!-- 开关 -->
          <div class="switch">
            <el-switch inactive-text="是否启用验证码" v-model="value2" />
          </div>

          <!-- Logo 上传 -->
          <div class="logo-one">
            <p>登录页广告图</p>
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="onSelectFile"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </div>
        </div>

        <div class="basic-asve">
          <el-button type="primary" @click="submitData">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.CopyrightSetting-box {
  .CopyrightSetting-cont {
    .hd {
      padding-bottom: 30px;
      p {
        font-size: 18px;
      }
    }
    .bd {
      margin-left: 120px;
      .logo-one {
        display: flex;
        margin-top: 50px;
        p {
          color: #606266;
        }
        .avatar-uploader {
          border: 1px solid #ccc;
          margin-left: 20px;

          .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
          }
        }

        .avatar-uploader .el-upload:hover {
          border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 100px;
          height: 100px;
          text-align: center;
        }
      }

      //   网站关键字
      .website-keyword {
        margin-top: 50px;
      }

      //   网站简介
      .website-brief {
        margin-top: 50px;
      }

      //   服务信息

      .service {
        margin-top: 80px;
      }

      .basic-asve {
        margin-left: 1000px;
      }
    }
  }
}
</style>
