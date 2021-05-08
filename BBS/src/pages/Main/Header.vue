<template>
  <div class="header">
    <div class="span">
      <i class="el-icon-s-fold"></i>
      <span>借阅管理系统</span>
    </div>
    <el-link :underline="false" :href="`//localhost:8080/${status}/home`" @click.native="backToHome">回到主页<i class="el-icon-house"></i></el-link>
    <el-divider direction="vertical"></el-divider>
      <el-link :underline="false">常用<i class="el-icon-s-operation"></i></el-link>
    <el-divider direction="vertical"></el-divider>
    <el-link :underline="false">更多<i class="el-icon-more-outline"></i></el-link>
    <el-divider direction="vertical"></el-divider>
    <el-link :underline="false">设置<i class="el-icon-s-tools"></i></el-link>
    <el-divider direction="vertical"></el-divider>
    <span class="dropDownButton">
      <el-dropdown>
      <el-button class="el-icon-user-solid" style="border: #E4E7ED;">
        <span  style="margin-left: 6px">{{nikeName}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="centerDialogVisible = true">退出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
    </span>
    <el-dialog  :visible.sync="centerDialogVisible" width="25%" center style="line-height: 10px" class="dialog">
      <span>确认退出？</span>
      <span slot="footer" class="dialog-footer" style="font-size: 10px" >
        <el-button type="primary" @click="exit" style="margin-right: 50px" id="button1">确 定</el-button>
        <el-button @click="centerDialogVisible = false" id="button2">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['status'],
  data () {
    return {
      account: '',
      nikeName: '',
      centerDialogVisible: false
    }
  },
  methods: {
    exit () {
      this.centerDialogVisible = false
      this.$router.push('/')
    },
    backToHome () {
      this.$emit('getHomeValue', '主页', 'el-icon-s-home')
    }
  },
  mounted () {
    if (this.$store.state.status === 1) {
      // 登录者身份是用户
      this.$axios.post('http://112.74.32.189:8080/library/getStudent', {
        account: this.$store.state.id
      }).then((response) => {
        this.nikeName = response.data.data.name
      })
    } else {
      this.$axios.post('http://112.74.32.189:8080/library/getStudent', {
        account: this.account
      }).then((response) => {
        console.log(response.data)
      })
    }
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  color: #333;
  text-align: right;
  line-height: 45px;
}
.span{
  display: inline;
  position: fixed;
  left: 220px;
  font-weight: 600;
  font-size: 20px;
  color: #7F7B83;
}
.el-link{
color: #7F7B83;
  padding: 0px;
  font-size: 16px;
  font-weight: bold;
}
.el-link:hover,.el-icon-switch-button:hover{
  color: #F57D2D;
  font-weight: bolder;
}
/*右上角下拉框样式*/
.dropDownButton >>> .el-button{
  color: #7F7B83;
  position: relative;
  top: 3px;
  padding-left: 0px;
  font-weight: bolder;
  font-size: 16px;
}
.el-icon-user-solid >>> .el-button:focus, .el-button:hover{
  color: #F57D2D;
  background-color: snow;
}
#button1:hover{
  color: #feffff;
  background-color: #60acff;
}
#button2:hover{
   color: #87A9E2;
   background-color: #ECF3FF;
 }
</style>
