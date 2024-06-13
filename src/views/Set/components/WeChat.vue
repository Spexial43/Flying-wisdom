<!-- 微信 -->
<script setup>
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";

// 图片上传...
const imgUrl = ref("");
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw);
};
</script>

<template>
  <div class="CopyrightSetting-box">
    <div class="CopyrightSetting-cont">
      <div class="hd">
        <p>微信开发平台</p>
      </div>
      <div class="bd">
        <p style="margin-left: -70px">开发平台设置</p>
        <!-- 公司名称 -->
        <div class="website-keyword">
          <el-form style="max-width: 600px">
            <el-form-item label="APPID">
              <el-input placeholder="微信第三方平台Appld"></el-input>
            </el-form-item>

            <el-form-item label="APPSECRET">
              <el-input placeholder="微信第三方平台AppSecret"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <!-- 公司名称 -->
        <p style="margin-left: -70px">开发平台通信</p>

        <div class="website-keyword">
          <el-form style="max-width: 600px">
            <el-form-item label="授权发起页域名">
              <el-input placeholder="授权发起页域名"></el-input>
            </el-form-item>
            <el-form-item label="授权事件接收URL">
              <el-input placeholder="授权事件接收URL"></el-input>
            </el-form-item>
            <el-form-item label="消息校验Token">
              <el-input placeholder="消息校验Token"></el-input>
            </el-form-item>
            <el-form-item label="消息加解密Key">
              <el-input placeholder="消息加解密Key"></el-input>
            </el-form-item>

            <el-form-item label="消息与事件接收URL">
              <el-input placeholder="消息与事件接收URL"></el-input>
            </el-form-item>

            <el-form-item label="公众号开发域名">
              <el-input placeholder="公众号开发域名"></el-input>
            </el-form-item>

            <el-form-item label="小程序服务器域名">
              <el-input placeholder="小程序服务器域名"></el-input>
            </el-form-item>

            <el-form-item label="小程序业务域名">
              <el-input placeholder="小程序业务域名"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <!-- 服务信息 -->
        <div class="service">
          <p style="margin-left: -70px">开发者设置</p>

          <!-- 网站ICP备案号 -->
          <div class="phone">
            <el-form style="max-width: 600px">
              <el-form-item label="开发者邮箱">
                <el-input placeholder="开发者邮箱"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <!-- 网站公安备案 -->
          <div class="phone">
            <el-form style="max-width: 600px">
              <el-form-item label="开发者手机号">
                <el-input placeholder="开发者手机号"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <!-- 网站公安链接 -->
          <div class="phone">
            <el-form style="max-width: 600px">
              <el-form-item label="开发者QQ">
                <el-input placeholder="开发者QQ"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <!-- 网站公安链接 -->
          <div class="phone">
            <el-form style="max-width: 600px">
              <el-form-item label="开发者微信">
                <el-input placeholder="开发者微信"></el-input>
              </el-form-item>
            </el-form>
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
        .phone {
          margin-top: 30px;
        }
      }

      .basic-asve {
        margin-left: 1000px;
      }
    }
  }
}
</style>
