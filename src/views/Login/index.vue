<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getLoginAPI } from "@/api/login";
import { useTokenStore } from "@/stores/loginStores";

const tokenStore = useTokenStore();
const router = useRouter();
const ruleForm = ref({
  name: "admin",
  password: "123456",
});

const rules = ref({
  name: [{ required: true, message: "请输入正确的账号", trigger: "blur" }],
  password: [
    { required: true, message: "请输入正确的密码", trigger: "blur" },
    { min: 6, max: 15, message: "请输入6-15位的密码", trigger: "blur" },
  ],
});

// 登入后端返回的数据
const loginList = ref({});

const gotoHome = async () => {
  const res = await getLoginAPI();
  console.log(res.data);
  loginList.value = res.data;

  if (
    loginList.value.name === ruleForm.value.name &&
    loginList.value.password === ruleForm.value.password
  ) {
    ElMessage({
      type: "success",
      message: "登录成功",
    });
    tokenStore.getToken(loginList.value.Token); //将token存入pinia 管理
    router.replace({ path: "/" });
    // localStorage.setItem("Token", loginList.value.Token);
  } else {
    ElMessage({
      type: "warning",
      message: "登录失败",
    });
  }
};
</script>

<template>
  <div class="login-box">
    <div class="login-frame">
      <div class="left"></div>
      <div class="right">
        <div class="login-title">
          <p>飞智sass管理框架</p>
          <h3>管理端</h3>
        </div>
        <div class="login-cont">
          <el-form
            style="max-width: 350px"
            :model="ruleForm"
            status-icon
            label-width="auto"
            :rules="rules"
            ref="formRef"
          >
            <el-form-item label="账号" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" />
            </el-form-item>
          </el-form>
          <el-button type="primary" round style="width: 300px" @click="gotoHome">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/src/assets/image/VCG211423863746.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  .login-frame {
    display: flex;
    justify-content: space-between;
    height: 100vh; // 让登录框垂直居中
    margin: 500px auto;
    width: 1000px;
    height: 500px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    .left {
      width: 500px;
      background-image: url(/src/assets/image/VCG211258128067.jpg);
      border-radius: 10px;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .right {
      text-align: center;
      width: 500px;
      .login-title {
        margin-top: 70px;
        color: #303133;
        font-family: "Open Sans", sans-serif; // 更换字体
        p {
          font-size: 30px;
        }
        h3 {
          margin-top: 10px;
        }
      }

      .login-cont {
        margin-top: 50px;
        margin-left: 80px;

        .el-button {
          transition: transform 0.3s ease;
          margin-top: 50px;
          margin-right: 30px;
          width: 100%;
          &:hover {
            transform: translateY(-2px); // 按钮悬浮效果
          }
        }
      }
    }
  }
}
</style>
