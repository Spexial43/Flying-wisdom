<!-- 版权设置 -->
<script setup>
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";
import { postCopyrightAPI } from "@/api/set";
// 图片上传...
const imgUrl = ref("");
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw);
};

// 获取input 数据
const companyName = ref(""); //公司名称
const copyrightLink = ref(""); //版权链接
const copyrightInfo = ref(""); //版权信息
const ICP = ref(""); //网站ICP备案号
const Provider = ref(""); //网站公安备案
const PoliceLink = ref(""); //网站公安链接

// 提交数据到后端
const submitData = async () => {
  // 检查输入是否为空
  if (
    !companyName.value.trim() ||
    !copyrightLink.value.trim() ||
    !copyrightInfo.value.trim() ||
    !ICP.value.trim() ||
    !Provider.value.trim() ||
    !PoliceLink.value.trim() ||
    !imgUrl.value.trim()
  ) {
    ElMessage({
      type: "warning",
      message: "输入内容不能为空",
    });
    return; // 如果有任何一个输入为空，则不继续执行
  }

  const res = await postCopyrightAPI({
    companyName: companyName.value,
    copyrightLink: copyrightLink.value,
    copyrightInfo: copyrightInfo.value,
    ICP: ICP.value,
    Provider: Provider.value,
    PoliceLink: PoliceLink.value,
    imgUrl: imgUrl.value,
  });
  console.log(res.data.companyName);

  if (res.data.companyName !== "") {
    ElMessage({
      type: "success",
      message: "保存成功",
    });
    companyName.value = "";
    copyrightLink.value = "";
    copyrightInfo.value = "";
    ICP.value = "";
    Provider.value = "";
    PoliceLink.value = "";
    imgUrl.value = "";
  }
};
</script>

<template>
  <div class="CopyrightSetting-box">
    <div class="CopyrightSetting-cont">
      <div class="hd">
        <p>版权设置</p>
      </div>
      <div class="bd">
        <p style="margin-left: -70px">后台设置</p>

        <!-- Logo 上传 -->
        <div class="logo-one">
          <el-form-item label="logo">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="onSelectFile"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </div>

        <!-- 公司名称 -->
        <div class="website-keyword">
          <el-form style="max-width: 600px">
            <el-form-item label="公司名称">
              <el-input placeholder="公司名称" v-model="companyName"></el-input>
            </el-form-item>

            <!-- 版权链接 -->
            <el-form-item label="版权链接">
              <el-input placeholder="版权链接" v-model="copyrightLink"></el-input>
            </el-form-item>

            <!-- 版权信息 -->
            <el-form-item label="版权信息">
              <el-input type="textarea" v-model="copyrightInfo" />
            </el-form-item>
          </el-form>
        </div>

        <!-- 服务信息 -->
        <div class="service">
          <p style="margin-left: -70px">备案设置</p>

          <!-- 网站ICP备案号 -->
          <div class="phone">
            <el-form style="max-width: 600px">
              <el-form-item label="网站ICP备案号">
                <el-input placeholder="网站ICP备案号" v-model="ICP"></el-input>
              </el-form-item>

              <!-- 网站公安备案 -->
              <el-form-item label="网站公安备案">
                <el-input placeholder="网站公安备案" v-model="Provider"></el-input>
              </el-form-item>

              <!-- 网站公安链接 -->
              <el-form-item label="网站公安链接">
                <el-input placeholder="网站公安链接" v-model="PoliceLink"></el-input>
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

        .avatar-uploader {
          border: 1px solid #ccc;
          margin-left: 20px;

          .avatar {
            width: 150px;
            height: 150px;
          }

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
        margin-top: 10px;
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
