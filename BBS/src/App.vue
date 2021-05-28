<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Login from './pages/Login/Login'
export default {
  name: 'App',
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    // 页面初次加载获取所有书籍信息
    this.$axios.get(`http://${this.$store.state.url}:8080/library/books`, {params: {}})
      .then((res) => {
        let data = res.data.data
        this.$store.commit('booksConfig', data)
      })
  }
}
</script>
<style>
*{
  padding: 0;
  margin-left: 0;
}
</style>
