<template>
  <div class="main" v-loading="loading">
    <div class="container">
      <button type="button" class="el-carousel__arrow el-carousel__arrow--left"
              @click="lastPage" style="height: 40px;width: 40px;left: 6px;font-size: 20px">
        <i class="el-icon-arrow-left"></i>
      </button>
      <button type="button" class="el-carousel__arrow el-carousel__arrow--right"
              @click="nextPage" style="height: 40px;width: 40px;right: 6px;font-size: 20px">
        <i class="el-icon-arrow-right"></i>
      </button>
      <el-row :gutter="60">
        <el-col :span="6">
          <el-card class="card" :class="[{'disabled':this.index+0>=this.sum}]"
                   :body-style="{ padding: '0px',height:'260px'}">
            <a href="#"  @click="toBook(0)" :title="(this.index+0>=this.sum)?false:this.electronicBookData[this.index+0].name">
              <img :src="(this.index+0>=this.sum)?false:this.electronicBookData[this.index+0].src" class="image">
            </a>
            <div class="span">
              <div class="name">{{ (this.index+0>=this.sum)?false:this.electronicBookData[this.index+0].name }}</div>
              <div class="author">{{ (this.index+0>=this.sum)?false:this.electronicBookData[this.index+0].author }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card" :class="[{'disabled':this.index+1>=this.sum}]"
                   :body-style="{ padding: '0px',height:'260px'}">
            <a href="#"  @click="toBook(1)"  :title="(this.index+1>=this.sum)?false:this.electronicBookData[this.index+1].name">
              <img :src="(this.index+1>=this.sum)?false:this.electronicBookData[this.index+1].src" class="image">
            </a>
            <div class="span">
              <div class="name">{{ (this.index+1>=this.sum)?false:this.electronicBookData[this.index+1].name }}</div>
              <div class="author">{{ (this.index+1>=this.sum)?false:this.electronicBookData[this.index+1].author }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card" :class="[{'disabled':this.index+2>=this.sum}]"
                   :body-style="{ padding: '0px',height:'260px'}">
            <a href="#"  @click="toBook(2)"  :title="(this.index+2>=this.sum)?false:this.electronicBookData[this.index+2].name">
              <img :src="(this.index+2>=this.sum)?false:this.electronicBookData[this.index+2].src" class="image">
            </a>
            <div class="span">
              <div class="name">{{ (this.index+2>=this.sum)?false:this.electronicBookData[this.index+2].name }}</div>
              <div class="author">{{ (this.index+2>=this.sum)?false:this.electronicBookData[this.index+2].author }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card" :class="[{'disabled':this.index+3>=this.sum}]"
                   :body-style="{ padding: '0px',height:'260px'}">
            <a href="#"  @click="toBook(3)"  :title="(this.index+3>=this.sum)?false:this.electronicBookData[this.index+3].name">
              <img :src="(this.index+3>=this.sum)?false:this.electronicBookData[this.index+3].src" class="image">
            </a>
            <div class="span">
              <div class="name">{{ (this.index+3>=this.sum)?false:this.electronicBookData[this.index+3].name }}</div>
              <div class="author">{{ (this.index+3>=this.sum)?false:this.electronicBookData[this.index+3].author }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter='60'>
        <el-col :span="6">
          <el-card class="card" :class="[{'disabled':this.index+4>=this.sum}]"
                   :body-style="{ padding: '0px',height:'260px'}">
            <a href="#"  @click="toBook(4)"  :title="(this.index+4>=this.sum)?false:this.electronicBookData[this.index+4].name">
              <img :src="(this.index+4>=this.sum)?false:this.electronicBookData[this.index+4].src" class="image">
            </a>
            <div class="span">
              <div class="name">{{ (this.index+4>=this.sum)?false:this.electronicBookData[this.index+4].name }}</div>
              <div class="author">{{ (this.index+4>=this.sum)?false:this.electronicBookData[this.index+4].author }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card" :class="[{'disabled':this.index+5>=this.sum}]"
                   :body-style="{ padding: '0px',height:'260px'}">
            <a href="#"  @click="toBook(5)"  :title="(this.index+5>=this.sum)?false:this.electronicBookData[this.index+5].name">
              <img :src="(this.index+5>=this.sum)?false:this.electronicBookData[this.index+5].src" class="image">
            </a>
            <div class="span">
              <div class="name">{{ (this.index+5>=this.sum)?false:this.electronicBookData[this.index+5].name }}</div>
              <div class="author">{{ (this.index+5>=this.sum)?false:this.electronicBookData[this.index+5].author }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card" :class="[{'disabled':this.index+6>=this.sum}]"
                   :body-style="{ padding: '0px',height:'260px'}">
            <a href="#"  @click="toBook(6)"  :title="(this.index+6>=this.sum)?false:this.electronicBookData[this.index+6].name">
              <img :src="(this.index+6>=this.sum)?false:this.electronicBookData[this.index+6].src" class="image">
            </a>
            <div class="span">
              <div class="name">{{ (this.index+6>=this.sum)?false:this.electronicBookData[this.index+6].name }}</div>
              <div class="author">{{ (this.index+6>=this.sum)?false:this.electronicBookData[this.index+6].author }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card" :class="[{'disabled':this.index+7>=this.sum}]"
                   :body-style="{ padding: '0px',height:'260px'}">
            <a href="#"  @click="toBook(7)"  :title="(this.index+7>=this.sum)?false:this.electronicBookData[this.index+7].name">
             <img :src="(this.index+7>=this.sum)?false:this.electronicBookData[this.index+7].src" class="image">
            </a>
            <div class="span">
              <div class="name">{{ (this.index+7>=this.sum)?false:this.electronicBookData[this.index+7].name }}</div>
              <div class="author">{{ (this.index+7>=this.sum)?false:this.electronicBookData[this.index+7].author }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ElectronicLibrary',
  data () {
    return {
      loading: false,
      // 图书总数
      sum: '',
      // 当前页的第一个索引值
      index: 0,
      currentPage: 1,
      electronicBookData: [
        {
          src: require('../../../../assets/images/bookImg/1.jpg'),
          name: '活着',
          author: '余华'
        },
        {
          src: require('../../../../assets/images/bookImg/2.jpg'),
          name: '百年孤独',
          author: '[哥伦比亚]加西亚·马尔克斯'
        },
        {
          src: require('../../../../assets/images/bookImg/3.jpg'),
          name: '追风筝的人',
          author: '[美]卡勒德·胡赛尼'
        },
        {
          src: require('../../../../assets/images/bookImg/4.jpg'),
          name: '看见',
          author: '柴静'
        },
        {
          src: require('../../../../assets/images/bookImg/5.jpg'),
          name: '白夜行',
          author: '[日本]东野圭吾'
        },
        {
          src: require('../../../../assets/images/bookImg/6.jpg'),
          name: '平凡的世界',
          author: '路遥'
        },
        {
          src: require('../../../../assets/images/bookImg/7.jpg'),
          name: '斗破苍穹',
          author: '天蚕土豆'
        },
        {
          src: require('../../../../assets/images/bookImg/8.jpg'),
          name: '三国演义',
          author: '罗贯中'
        },
        {
          src: require('../../../../assets/images/bookImg/9.jpg'),
          name: '傲慢与偏见',
          author: '[英国]简·奥斯汀'
        },
        {
          src: require('../../../../assets/images/bookImg/10.jpg'),
          name: '红楼梦',
          author: '曹雪芹'
        }
      ]
    }
  },
  methods: {
    toBook (num) {
      let index = this.index + num
      this.$router.push(
        {
          path: '/student/electronic-book',
          query: { index: index }
        }
      )
      return false
    },
    lastPage () {
      if (this.currentPage !== 1) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 300)
        this.currentPage -= 1
        this.index -= 8
      }
    },
    nextPage () {
      if (this.currentPage !== 2) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 300)
        this.currentPage += 1
        this.index += 8
      }
    }
  },
  mounted () {
    this.sum = this.electronicBookData.length
  }
}
</script>

<style scoped>
.main {
  margin: 0 15px;
  padding: 30px 50px 10px;
  border-radius: 10px;
  width: 1200px;
  height: 580px;
  background-color: #FFFFFF;
}
.span{
  padding-top: 10px;
  font-size: 14px;
  text-align: left;
  padding-left: 60px;
}
.author{
  padding-top: 5px;
  color: #909399;
}
.el-row {
  margin-bottom: 20px;
}

.disabled{
  display: none;
}

.image {
  width: 160px;
  height: 190px;
}
</style>
