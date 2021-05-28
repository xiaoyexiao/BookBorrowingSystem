<template>
  <div class="main">
    <el-row>
      <el-col :span="24">
        <img src="../../assets/images/backgroundimg/header.jpg" style="width: 100%">
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="6">
        <div id="pieChart">
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
      myChart: null,
      date: new Date(),
      display: false,
      imagesBox: [{id: 0, idView: require('../../assets/images/backgroundimg/show1.jpg')},
        {id: 1, idView: require('../../assets/images/backgroundimg/show2.jpg')},
        {id: 2, idView: require('../../assets/images/backgroundimg/show3.jpg')},
        {id: 3, idView: require('../../assets/images/backgroundimg/show4.jpg')},
        {id: 4, idView: require('../../assets/images/backgroundimg/show5.jpg')}],
      option: {
        title: {
          text: '图书分类',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)' // 提示的文本格式a b c d分别指系列、数据项、数值、百分比，详见文档
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '60%',
            data: [],
            emphasis: { // 触碰数据时的显示
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.$axios.get(`http://${this.$store.state.url}:8080/library/countCategories`, {params: {}})
      .then((response) => {
        // console.log(response.data.data)
        for (let key in response.data.data) { // 遍历键值对
          let obj = {
            value: response.data.data[key],
            name: key
          }
          this.option.series[0].data.push(obj)
        }
        // console.log(this.option.series[0].data)
        this.myChart = this.$echarts.init(document.getElementById('pieChart'))
        this.myChart.setOption(this.option)
      })
    setTimeout(() => {
      this.display = true
    }, 800)
  }
}
</script>

<style scoped>
#pieChart{
  padding-top: 10px;
  height: 315px;
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
