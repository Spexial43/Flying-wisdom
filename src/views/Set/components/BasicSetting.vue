<!-- 基础设置 -->
<script setup>
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getSetAPI } from "@/api/set";
// 图片上传...
const imgUrl = ref("");
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw);
};
const imgUrl2 = ref("");
const onSelectFile2 = (uploadFile) => {
  imgUrl2.value = URL.createObjectURL(uploadFile.raw);
};
const imgUrl3 = ref("");
const onSelectFile3 = (uploadFile) => {
  imgUrl3.value = URL.createObjectURL(uploadFile.raw);
};
const imgUrl4 = ref("");
const onSelectFile4 = (uploadFile) => {
  imgUrl4.value = URL.createObjectURL(uploadFile.raw);
};

// 获取input数据
const siteName = ref("");
const siteKeywords = ref("");
const siteDescription = ref("");
const contactPhone = ref("");

// 获取图片数据
const uploadFiles = ref([]);

// 提交数据到后端
const submitData = async () => {
  // 检查输入是否为空
  if (
    !siteName.value.trim() ||
    !siteKeywords.value.trim() ||
    !siteDescription.value.trim() ||
    !contactPhone.value.trim()
  ) {
    ElMessage({
      type: "warning",
      message: "输入内容不能为空",
    });
    return; // 如果有任何一个输入为空，则不继续执行
  }

  const res = await getSetAPI({
    siteName: siteName.value,
    siteKeywords: siteKeywords.value,
    siteDescription: siteDescription.value,
    contactPhone: contactPhone.value,
    imgUrl: imgUrl.value,
    imgUrl2: imgUrl2.value,
    imgUrl3: imgUrl3.value,
    imgUrl4: imgUrl4.value,
  });
  console.log(res.data);
  if (res.data.contactPhone !== "") {
    ElMessage({
      type: "success",
      message: "保存成功",
    });
    siteName.value = "";
    siteKeywords.value = "";
    siteDescription.value = "";
    contactPhone.value = "";
    imgUrl.value = "";
    imgUrl2.value = "";
    imgUrl3.value = "";
    imgUrl4.value = "";
  } else {
    ElMessage({
      type: "warning",
      message: "输入内容不能为空",
    });
  }
};
</script>

<template>
  <div class="BasicSetting-box">
    <div class="BasicSetting-cont">
      <div class="hd">
        <p>基础设置</p>
      </div>

      <div class="bd">
        <p style="margin-left: -70px">后台设置</p>
        <el-form style="max-width: 600px">
          <!-- 站点名称 -->
          <el-form-item label="站点名称">
            <el-input v-model="siteName"></el-input>
          </el-form-item>

          <!-- Logo 上传 -->
          <div class="logo-one">
            <el-form-item label="长方形Logo" prop="cover_img">
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

          <!-- Logo 上传 -->
          <div class="logo-one">
            <el-form-item label="正方形Logo" prop="cover_img">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="onSelectFile2"
              >
                <img v-if="imgUrl2" :src="imgUrl2" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </div>

          <!-- 网站关键字 -->
          <el-form-item label="网站关键字" style="margin-top: 40px">
            <el-input v-model="siteKeywords" placeholder="网站关键字"></el-input>
          </el-form-item>

          <!-- 网站简介 -->
          <el-form-item label="网站简介" style="margin-top: 40px">
            <el-input v-model="siteDescription" type="textarea" />
          </el-form-item>
        </el-form>

        <!-- 服务信息 -->
        <div class="service">
          <p style="margin-left: -70px">服务信息</p>

          <div class="phone">
            <el-form style="max-width: 600px">
              <!-- 联系电话 -->
              <el-form-item label="联系电话">
                <el-input v-model="contactPhone" placeholder="联系电话"></el-input>
              </el-form-item>

              <!-- 公众号二维码 -->
              <div class="logo-one">
                <el-form-item label="公众号二维码" prop="cover_img">
                  <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="onSelectFile3"
                  >
                    <img v-if="imgUrl3" :src="imgUrl3" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                </el-form-item>
              </div>

              <!-- 客服二维码 -->
              <div class="logo-one">
                <el-form-item label="客服二维码" prop="cover_img">
                  <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="onSelectFile4"
                  >
                    <img v-if="imgUrl4" :src="imgUrl4" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="basic-asve">
      <el-button type="primary" @click="submitData">保存</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.BasicSetting-box {
  .BasicSetting-cont {
    .hd {
      padding-bottom: 30px;
    }
    .bd {
      margin-left: 60px;
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
    }
  }
  .basic-asve {
    margin-left: 1000px;
  }
}
</style>
