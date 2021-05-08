<template>
  <div class="main">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="personalBoard" style="margin: 20px 50px 0px;padding-top: 50px">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :color="activity.color"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
      <el-col :span="13"><div class="noticeBoard">
        <el-carousel height="400px">
          <el-carousel-item v-for="item in imagesBox" :key="item.id">
            <img :src="item.idView" class="image">
          </el-carousel-item>
        </el-carousel>
      </div></el-col>
      <el-col :span="5">
        <div class="asideBoard">
          <el-calendar v-model="date">
          </el-calendar>
        </div>
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
      imagesBox: [{id: 0, idView: require('../../assets/images/backgroundimg/1.png')},
        {id: 1, idView: require('../../assets/images/backgroundimg/2.png')},
        {id: 2, idView: require('../../assets/images/backgroundimg/3.jpg')}],
      activities: [
        {
          content: '借阅图书“活着”',
          timestamp: '2018-04-12 20:46',
          color: '#F57D2D'
        }, {
          content: '借阅图书“平凡的世界”',
          timestamp: '2018-04-03 20:46',
          color: '#F57D2D'
        }, {
          content: '借阅图书“红楼梦”',
          timestamp: '2018-04-03 20:46',
          color: '#F57D2D'
        }
      ]
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
.personalBoard{
  border-radius: 8px;
  height: 400px;
  margin: 5px;
}
.main >>>.el-timeline-item__tail{
border-left:3px solid #909399;
}
/*走马灯*/
.noticeBoard{
  border-radius: 8px;
  height: 400px;
  margin: 5px;
}
.image{
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
/*日历*/
.asideBoard{
  border-radius: 8px;
  height: 400px;
  margin: 5px;
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
  height: 40px;
  padding: 5px;
  -webkit-text-stroke-width: thin;
}
</style>
