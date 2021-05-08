<template>
  <div class="container">
    <div class="header">
      <Header :status="status"  v-on:getHomeValue="getHomeValue"></Header>
    </div>
    <div class="pageHeader">
      <i :class=iconSrc style="color: #F57D2D"></i>
      {{pageName}}
    </div>
    <div class="aside">
      <StudentAside v-on:childByValue="childByValue"></StudentAside>
    </div>
    <div class="main" v-loading="loading">
      <router-view :status="status"></router-view>
    </div>
  </div>
</template>

<script>
import StudentAside from './StudentAside'
import Header from '../Header'
import MainPage from '../MainPage'
export default {
  name: 'StudentHome',
  components: {StudentAside, Header, MainPage},
  data () {
    return {
      status: 'student', // 要传入子组件的身份信息
      loading: true,
      pageName: '主页',
      iconSrc: 'el-icon-s-home'
    }
  },
  methods: {
    childByValue: function (page, icon) {
      this.iconSrc = icon
      this.pageName = page
    },
    getHomeValue (v1, v2) {
      this.pageName = v1
      this.iconSrc = v2
    }
  },
  beforeRouteUpdate (to, from, next) { // 跳转页面
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 800)
    next()
  },
  mounted () {
    // 一刷新就跳转到主页
    window.onload = e => {
      this.$router.push('/student/home')
    }
    setTimeout(() => {
      this.loading = false
    }, 800)
  }
}
</script>

<style>
div,body,html{
  margin: 0;
  padding: 0;
  border: 0;
  text-decoration: none;
  margin: 0;
}
/*页头*/
.pageHeader{
  position: fixed;
  top:50px;
  left:200px;
  height: 50px;
  width: 1336px;
  line-height: 50px;
  font-weight: bolder;
  padding-left: 25px;
  background-color: #E4E7ED;
}
.main {
  position: fixed;
  left: 200px;
  top: 100px;
  height: 725px;
  width: 1336px;
  background-color: #E4E7ED;
  text-align: center;
}
</style>
