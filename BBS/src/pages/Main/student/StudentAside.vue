<template>
  <div class="aside" style="width: 200px">
    <el-menu router :default-active="this.$route.path">
      <el-menu-item index="/student/home" id="main" @click.native="send($event)">
        <i class="el-icon-s-home"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user"></i>个人中心</template>
        <el-menu-item-group>
          <el-menu-item index="/student/info" id="information" @click.native="send($event)">我的信息</el-menu-item>
          <el-menu-item index="/student/borrow-info" id="borrow" @click.native="send($event)">借阅记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-reading"></i>图书信息</template>
        <el-menu-item-group>
          <el-menu-item index="/student/book-searching" id="search" @click.native="send($event)">图书检索</el-menu-item>
          <el-menu-item index="/student/electronic-library" id="ebook" @click.native="send($event)">电子书库</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-notebook-2"></i>我的收藏</template>
        <el-menu-item-group>
          <el-menu-item index="/student/paper-shelves" id="paper" @click.native="send($event)">收藏书单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'StudentAside',
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
        case 'information':
          this.page = '我的信息'
          this.icon = 'el-icon-s-custom'
          break
        case 'borrow':
          this.page = '借阅记录'
          this.icon = 'el-icon-s-order'
          break
        case 'search':
          this.page = '图书检索'
          this.icon = 'el-icon-search'
          break
        case 'ebook':
          this.page = '电子书库'
          this.icon = 'el-icon-s-order'
          break
        case 'paper':
          this.page = '收藏书单'
          this.icon = 'el-icon-notebook-1'
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
