<template>
  <div class='login_container'>
    <div class='login_box'>
      <!-- 头像 -->
      <div class='avatar_box'>
        <img src='../assets/logo.png'
             alt />
      </div>
      <!-- 表单 -->
      <el-form label-width='0'
               class='login_form'
               :model='loginForm'
               :rules='loginFromRules'
               ref='loginFormRef'>
        <!-- 用户名 -->
        <el-form-item prop='username'>
          <el-input v-model='loginForm.username'
                    prefix-icon='el-icon-user'></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop='password'>
          <el-input v-model='loginForm.password'
                    prefix-icon='el-icon-lock'
                    type='password'></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class='btns'>
          <el-button type='primary'
                     @click='login'>登录</el-button>
          <el-button type='info'
                     @click='resetLoginForm'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFromRules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm: function () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$axios.post('login', this.loginForm)
        if (res.meta.status === 200) {
          this.$message.success(res.meta.msg)
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login_container {
  background-color: #2b4b6b;
  width: 100%;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 2px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
