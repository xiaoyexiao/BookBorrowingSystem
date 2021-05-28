<template>
  <div v-loading="loading" class="backGround">
    <div class="enrollBox">
      <h2 class="head">欢迎注册</h2>
      <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
        <el-form-item label="昵称" prop="nikeName">
          <el-input v-model="form.nikeName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psw">
          <el-input v-model="form.psw" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPsw">
          <el-input v-model="form.confirmPsw" show-password></el-input>
        </el-form-item>
        <el-form-item label="年级" required prop="grade">
          <el-select v-model="form.grade">
            <el-option v-for="item in form.gradeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业班级" prop="majorClass">
          <el-input v-model="form.majorClass"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
          <el-button  @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Enroll',
  data () {
    // 验证学号是不是为12位数字
    let validNumber = (rule, value, callback) => {
      // let reg = /\b\d{12}\b/
      // if (!reg.test(value)) {
      //   callback(new Error('请输入正确学号'))
      // } else {
      //   callback()
      // }
    }
    // 验证两次密码是否相同
    let validPsw = (rule, value, callback) => {
      if (this.form.psw !== value) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      second: '',
      loading: false,
      form: {
        nikeName: '',
        name: '',
        number: '',
        psw: '',
        confirmPsw: '',
        grade: '',
        majorClass: '',
        email: '',
        phone: '',
        gradeOptions: [{
          value: '2017',
          label: '2017级'
        }, {
          value: '2018',
          label: '2018级'
        }, {
          value: '2019',
          label: '2019级'
        }, {
          value: '2020',
          label: '2020级'
        }]
      },
      rules: {
        nikeName: {required: true, message: '昵称不能为空', trigger: 'blur'},
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '学号不能为空', trigger: 'blur' },
          {validator: validNumber, trigger: 'blur'}
        ],
        psw: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        confirmPsw: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          {validator: validPsw, trigger: 'blur'}
        ],
        grade: [
          { required: true, message: '请选择年级', trigger: 'blur' }
        ],
        majorClass: [
          { required: true, message: '请输入专业全称和班级', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post(`http://${this.$store.state.url}:8080/library/studentRegister`, {
        name: this.form.name,
        nickname: this.form.nikeName,
        number: this.form.number,
        password: this.form.psw,
        clazz: parseInt(this.form.majorClass.replace(/[^0-9]/ig, '')),
        grade: parseInt(this.form.grade),
        major: this.form.majorClass.substring(0, this.form.majorClass.length - 2),
        email: this.form.email,
        phone: this.form.phone
      }).then((response) => {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 600)
        const timeJump = 1
        // 延时跳转
        if (!this.timer) {
          this.second = timeJump
          this.show = false
          this.timer = setInterval(() => {
            if (this.second > 0) {
              this.second--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
              this.$router.push('/skipping')
            }
          }, 300)
        }
      }).catch(() => {
        this.$message({
          message: '该学号已被注册！',
          type: 'error',
          duration: 800
        })
      })
    },
    resetForm (form) {
      this.$refs[form].resetFields()
    },
    back () {
      // 返回登录页
      this.$router.push('/')
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
.enrollBox >>> .el-form-item__content {
  margin-right: 80px;
}
.enrollBox >>>.el-button{
  margin-top: 10px;
  margin-right: 5px;
  margin-left: 2px;
}
.head {
  color: #909399;
  position: relative;
  top: -20px;
}

.enrollBox >>> .el-input__inner {
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid #C0C4CC;
  width: 250px;
  background: transparent;
  font-size: 16px;
}

.enrollBox >>> .el-form-item__label {
  color: #909399;
}

.backGround {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  position: absolute;
  background-repeat: no-repeat;
}

.enrollBox {
  position: relative;
  top: 10px;
  text-align: center;
  width: 400px;
  height: 580px;
  padding: 25px 20px 30px 20px;
  margin: auto;
  border-radius: 10px;
}
</style>
