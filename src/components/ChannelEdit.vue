<script setup>
import { onMounted, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { getManagerAPI, updataUsernameAPI, addUsernameAPI } from "@/api/Manager";

// 获取单个管理员的头像
const imgUrl = ref(""); // 将imgUrl初始化为字符串

const getManager = async () => {
  const res = await getManagerAPI();
  console.log(res.data, "res");
  imgUrl.value = res.data.header;
};
onMounted(() => getManager());
const formModel = ref({
  cate_affirm: "",
  cate_password: "",
  header: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  state: "正常",
  id: "",
  name: "",
  radio1: "",
  role: "",
  uname: "",
});

// 新增管理员
const dialogVisible = ref(false);
const open = (row) => {
  dialogVisible.value = true;
  formModel.value = { ...row };
};

const rules = ref({
  cate_password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 15, message: "请输入6-15位的密码", trigger: "blur" },
  ],
  cate_affirm: [
    { required: true, message: "两次输入的密码不一致", trigger: "blur" },
    { min: 6, max: 15, message: "请输入 6-15 位密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.cate_password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
    },
  ],
});

// 向外暴露
defineExpose({
  open,
});

const radio1 = ref("1");

const emit = defineEmits(["success"]);
const formRef = ref();

//  新增管理员,编辑管理员
const onSubmit = async () => {
  await formRef.value.validate();
  const isEdit = formModel.value.id;
  const payload = { ...formModel.value }; // 这里使用 formModel 的当前值
  if (isEdit) {
    await updataUsernameAPI(isEdit, payload);
    ElMessage.success("编辑成功");
  } else {
    await addUsernameAPI(payload);
    ElMessage.success("添加成功");
    getManager();
  }
  dialogVisible.value = false;
  // ...提交数据的代码
  emit("update-data");
};
</script>

<template>
  <div class="box">
    <!-- 新增管理员 -->
    <el-dialog
      v-model="dialogVisible"
      :title="formModel.name ? '编辑管理员' : '新增管理员'"
      width="600"
    >
      <span class="box-cont">
        <!-- 渲染部分 -->
        <div class="account">
          <el-form style="max-width: 400px" ref="formRef" :rules="rules">
            <!-- 账号 -->
            <el-form-item label="账号" prop="uname">
              <el-input v-model="formModel.uname" />
            </el-form-item>

            <!--头像-->
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:3008/tableData"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="formModel.header" :src="formModel.header" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>

            <!-- 姓名 -->
            <el-form-item label="姓名" style="margin-top: 30px" prop="name">
              <el-input v-model="formModel.name" />
            </el-form-item>

            <!-- 密码 -->
            <el-form-item label="密码" style="margin-top: 30px" prop="cate_password">
              <el-input v-model="formModel.cate_password" />
            </el-form-item>

            <!-- 确认密码 -->
            <el-form-item label="确认密码" style="margin-top: 30px" prop="cate_affirm">
              <el-input v-model="formModel.cate_affirm" />
            </el-form-item>

            <!-- 角色 -->
            <el-form-item label="角色" style="margin-top: 30px" prop="role">
              <el-select placeholder="请选择角色" v-model="formModel.role">
                <el-option label="前端开发工程师" value="前端开发工程师" />
                <el-option label="后端开发工程师" value="后端开发工程师" />
              </el-select>
            </el-form-item>

            <!-- 用户状态 -->
            <el-form-item label="用户状态">
              <el-radio-group v-model="formModel.radio1" class="ml-4">
                <el-radio value="1" size="large">正常</el-radio>
                <el-radio value="2" size="large">锁定</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 确认和取消 -->
            <el-form-item>
              <el-button type="primary" style="width: 70px" @click="onSubmit">确认</el-button>
              <el-button style="width: 70px" @click="cancel = dialogVisible = false"
                >取消</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.box {
  .box-cont {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    .avatar-uploader {
      .avatar {
        width: 78px;
        height: 78px;
      }

      .avatar-uploader-icon {
        width: 80px;
        height: 80px;
        border: 1px solid #e0dede;
      }
    }

    // 姓名
    .box-name {
      display: flex;
      align-items: center;
    }

    // 用户状态
    .mb-2 {
      display: flex;
      text-align: center;

      .ml-4 {
        margin-left: 20px;
      }
    }

    // 按钮
    .button-el {
      display: flex;
      justify-content: end;
    }
  }
}
</style>
