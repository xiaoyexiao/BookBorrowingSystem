<template>
  <div>
    <div v-loading="loading" class="backGround">
      <img :src="backgroundImageSrc" width="100%" height="100%" alt="">
    </div>
    <div class="loginBox">
      <el-form ref="form" :model="form" :rules="rules" label-width="60px"  class="inputBox">
        <div class="titleLabel">用户登录
        </div>
        <el-form-item label="学号" style="margin-top: 30px" prop="name">
          <el-input prefix-icon="el-icon-user" v-model="form.name" placeholder="请输入账号" clearable style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psw">
          <el-input @keydown.enter.native="onSubmit('form')" prefix-icon="el-icon-key" placeholder="请输入密码" v-model="form.psw" show-password style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="用户" ></el-radio>
            <el-radio label="管理员"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-link @click="toEnroll" type="info" style="position: absolute;top: 295px;left: 25px;color: #746b39">用户注册</el-link>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" style="width: 200px">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    // 验证学号是不是n位数字
    let validNumber = (rule, value, callback) => {
      let reg = /^[0-9]+$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确学号'))
      } else {
        callback()
      }
    }
    return {
      backgroundImageSrc: require('../../assets/images/backgroundimg/3.jpg'),
      loading: false,
      form: {
        name: '',
        psw: '',
        status: '用户'
      },
      rules: {
        name: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { validator: validNumber, trigger: 'blur' }
        ],
        psw: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择对应身份', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    toEnroll () {
      this.$router.push('/enroll')
    },
    onSubmit (form) {
      this.$refs[form].validate((valid) => {
        this.$axios({
          method: 'POST',
          url: `http://${this.$store.state.url}:8080/library/login`,
          data: {account: this.form.name, password: this.form.psw, isManager: this.form.status !== '用户'}
        }).then((res) => {
          // console.log(res.data.data)
          if (res.data.data.isPass) {
            this.$store.commit('setId', res.data.data.account)
            if (this.form.status === '用户') {
              this.$store.commit('setStatus', 1)
              this.$router.push('/student/home')
            } else {
              this.$store.commit('setStatus', 0)
              this.$router.push('/manager/home')
            }
          } else {
            // 输入字符不符合规则
            this.$message({
              message: '账号或密码错误',
              type: 'warning',
              duration: 800
            })
            return false
          }
        })
      })
    }
  },
  mounted () {
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 300)
  }
}
</script>
<style scoped>
.backGround{
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;
  background-repeat: no-repeat;
  position: absolute;
}
.loginBox{
  z-index:1;
}
.titleLabel{
  /*登录框标题*/
  text-align: center;
  width: 310px;
  height: 30px;
  color: #746b39;
  padding-bottom: 10px;
  border-bottom: 1px solid #606266;
  margin-bottom: 20px;
  font-size: 21px;
  font-weight: 600;
}
.inputBox{
  /*登录框*/
  position: relative;
  top: 120px;
  right: -450px;
  text-align: center;
  width: 330px;
  height: 320px;
  padding: 25px 20px 30px 20px;
  border: 3px solid #f6d592;
  margin: auto;
  border-radius: 10px;
}
.loginBox >>> .el-form-item__label{
  color: black;
}
</style>
