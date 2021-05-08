<template>
  <div class="aside" style="width: 200px">
    <el-menu router :default-active="this.$route.path">
      <el-menu-item index="/manager/home" id="main" @click.native="send($event)">
        <i class="el-icon-s-home"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item index="/manager/book-handling" id="manage" @click.native="send($event)">
        <i class="el-icon-set-up"></i>
        <span slot="title">图书管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-order"></i>信息查询</template>
        <el-menu-item-group>
          <el-menu-item index="/manager/borrowing-records" id="borrow" @click.native="send($event)">查看借阅信息</el-menu-item>
          <el-menu-item index="/manager/user-records" id="user" @click.native="send($event)">查看用户信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'ManagerAside',
  data () {
    return {
      page: '',
      icon: ''
    }
  },
  methods: {
    send (e) {
    // 获取所点击的元素，根据元素改变值，然后传向父组件
      switch (e.currentTarget.id) {
        case 'main':
          this.page = '主页'
          this.icon = 'el-icon-s-home'
          break
        case 'manage':
          this.page = '图书管理'
          this.icon = 'el-icon-set-up'
          break
        case 'borrow':
          this.page = '借阅信息'
          this.icon = 'el-icon-document-copy'
          break
        case 'user':
          this.page = '用户信息'
          this.icon = 'el-icon-document-copy'
          break
      }
      this.$emit('childByValue', this.page, this.icon)
    }
  }
}
</script>

<style scoped>
.aside >>>.el-menu-item{
  font-size: 16px;
  color: #7F7B83;
}
.aside >>>.el-menu-item.is-active,.el-menu-item:hover{
  color: #F57D2D;
  font-weight: 1000;
  background-color: #3E434C;
}
.aside >>>.el-menu-item.is-active{
  color: #F57D2D;
  font-weight: 1000;
  background-color: #3E434C;
}
.aside >>>.el-submenu__title:hover{
  color: #F57D2D;
  font-weight: 1000;
  background-color: #3E434C;
}
.aside >>> .el-submenu__title{
  font-size: 16px;
  color: #7F7B83;
}
.aside >>> .el-menu{
  background-color: #282E38;
}
.aside{
  position: fixed;
  top:0px;
  left:0px;
  height: 1200px;
  width: 200px;
  background-color: #282E38;
  text-align: center;
}
</style>
