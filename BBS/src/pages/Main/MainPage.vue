<template>
  <div class="main">
    <el-row>
      <el-col :span="24">
        <img src="../../assets/images/backgroundimg/header.jpg" style="width: 100%">
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="6">
        <div class="pieChart">
        </div>
      </el-col>
      <el-col :span="12">
        <div class="noticeBoard">
        <el-carousel height="310px">
          <el-carousel-item v-for="item in imagesBox" :key="item.id">
            <img :src="item.idView" class="image">
          </el-carousel-item>
        </el-carousel>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="asideBoard">
          <el-calendar v-model="date">
          </el-calendar>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="footerImg1"><img src="../../assets/images/backgroundimg/show6.jpg" alt=""></div>
      </el-col>
      <el-col :span="12">
        <div class="footerImg2"><img src="../../assets/images/backgroundimg/show7.jpg" alt=""></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: ['status'], // 拿到了学生信息
  data () {
    return {
      // 日历
      date: new Date(),
      display: false,
      imagesBox: [{id: 0, idView: require('../../assets/images/backgroundimg/show1.jpg')},
        {id: 1, idView: require('../../assets/images/backgroundimg/show2.jpg')},
        {id: 2, idView: require('../../assets/images/backgroundimg/show3.jpg')},
        {id: 3, idView: require('../../assets/images/backgroundimg/show4.jpg')},
        {id: 4, idView: require('../../assets/images/backgroundimg/show5.jpg')}]
    }
  },
  mounted () {
    setTimeout(() => {
      this.display = true
    }, 800)
  }
}
</script>

<style scoped>
.pieChart{
  height: 325px;
  background-color: pink;
}
.main >>>.el-timeline-item__tail{
border-left:3px solid #909399;
}
/*走马灯*/
.noticeBoard{
  margin: 5px;
}
.image{
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
/*日历*/
.asideBoard{
  margin: 0 60px 0;
}
.asideBoard >>> .el-calendar{
  border-radius: 8px;
  background-color: #E4E7ED;
}
.asideBoard >>> .el-calendar__header{
  display: contents;
}
.asideBoard >>> .el-calendar__title{
  padding: 5px;
  border-radius: 10px;
}
.asideBoard >>> .el-calendar-table .el-calendar-day{
  height: 32px;
  padding: 2px 5px 2px;
  -webkit-text-stroke-width: thin;
}
.asideBoard >>> .el-calendar__body{
  padding: 0;
}
.footerImg1{
  margin: 20px 10px 10px 20px;
  height: 200px;
}
.footerImg2{
  margin: 20px 20px 10px 10px;
  height: 200px;
}
img{
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
</style>
