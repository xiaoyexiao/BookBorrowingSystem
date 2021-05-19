<template>
  <div>
    <div class="main">
      <div class="header">
        <span class="searchSpan">关键字:</span>
        <el-input  class="search" prefix-icon="el-icon-search" v-model="search"
                   size="mini" placeholder="输入关键字搜索" @keyup.enter.native="searchTable"/>
        <el-button type="primary" class="confirmButton" @click="searchTable">查询</el-button>
        <span class="filterSpan">不显示借出的图书信息</span>
        <el-switch v-model="value" @change="amountFilter($event)"></el-switch>
      </div>
      <div class="table">
        <el-table style="width: 100%" :data="uploadData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  height="483" v-loading="loading" @filter-change="filterChange">
          <el-table-column width="10"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="序列号">
                  <span>{{ props.row.book.no }}</span>
                </el-form-item>
                <el-form-item label="书籍描述" style="display: block">
                  <span>{{ props.row.book.summary }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="book.name" label="书名" width="180"></el-table-column>
          <el-table-column prop="book.author" label="作者" width="220"></el-table-column>
          <el-table-column prop="book.category" label="类别" width="80" :filters="sectorStyle" :filter-method="filterStyle"></el-table-column>
          <el-table-column prop="book.length" label="字数" width="80"></el-table-column>
          <el-table-column prop="book.publisher" label="出版社" width="180"></el-table-column>
          <el-table-column prop="book.located" label="馆藏地" width="80"></el-table-column>
          <el-table-column prop="" label="书刊状态" width="210" :formatter="state"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button icon="el-icon-star-off" circle class="star"
              v-bind:class="['starStyle',{'starColor':scope.row.star}]" @click="clickStar(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @current-change="handleCurrentChange" :page-size="pageSize"
                         layout="total,prev, pager, next, jumper" :total="uploadData.length" background>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookSearching',
  data () {
    return {
      // 开关
      value: false,
      sectorStyle: [],
      // 不断更新的表单
      uploadData: [],
      // 初始表单
      oldTableData: [],
      // 书的类别限定
      styles: [],
      // 搜索框内容
      search: '',
      // 加载开关
      loading: false,
      searchName: '',
      searchStyle: '',
      // 每页条数
      pageSize: 9,
      // 当前页数
      currentPage: 1
    }
  },
  methods: {
    // 处理状态的文本格式
    state (row, column) {
      return row.status === false ? `借阅中-归还时间:${row.deadline}` : '已归还'
    },
    // 判断数组中是否有对应元素
    contains (arr, obj) {
      let i = arr.length
      while (i--) {
        if (arr[i] === obj) {
          return true
        }
      }
      return false
    },
    // 根据关键字、开关和书的类别从table更新数据！
    updatedTable () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 300)
      this.currentPage = 1
      let newList = []
      if (this.search !== '') {
        // 搜索框有内容
        this.oldTableData.forEach(item => {
          if ((item.book.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.book.author.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.book.category.toLowerCase().indexOf(this.search.toLowerCase()) !== -1) &&
            (!this.value || item.status === true) &&
            // 没有书类别筛选或者满足筛选条件
            (this.styles.length === 0 || this.contains(this.styles, item.book.category))) {
            newList.push(item)
          }
        })
        return newList
      } else {
        // 搜索框内容为空
        if (this.value) {
          // 开关打开了，过滤被借出的书
          this.oldTableData.forEach(item => {
            if (item.status === true &&
              (this.styles.length === 0 || this.contains(this.styles, item.book.category))) {
              newList.push(item)
            }
          })
          return newList
        } else {
          this.oldTableData.forEach(item => {
            if (this.styles.length === 0 || this.contains(this.styles, item.book.category)) {
              newList.push(item)
            }
          })
          return newList
        }
      }
    },
    // 过滤类别时候更新styles数组
    filterChange (filter) {
      this.styles = []
      for (let i in filter) {
        for (let t in filter[i]) {
          // 将过滤项添加进类别数组中
          this.styles.push(filter[i][t])
        }
      }
      let table = this.updatedTable()
      this.uploadData = table
    },
    // 根据类别过滤
    filterStyle (value, row) {
      return row.book.category === value
    },
    // 处理收藏按钮的点击
    clickStar (index) {
      let newIndex = (this.currentPage - 1) * this.pageSize + index
      if (!this.uploadData[newIndex].star) {
        this.$axios.get('http://112.74.32.189:8080/library/saveCollect', {
          params: {
            account: this.$store.state.id,
            bookID: this.uploadData[newIndex].book.no
          }
        })
        this.$message({
          duration: 1000,
          message: '收藏成功！',
          type: 'success'
        })
      } else {
        this.$axios.get('http://112.74.32.189:8080/library/deleteCollect', {
          params: {
            account: this.$store.state.id,
            bookID: this.uploadData[newIndex].book.no
          }
        })
        this.$message({
          duration: 1000,
          message: '取消收藏！'
        })
      }
      this.uploadData[newIndex].star = !this.uploadData[newIndex].star
      // console.log(newIndex)
      // console.log(this.uploadData[newIndex])
      // console.log(this.uploadData)
    },
    // 实时更新当前页
    handleCurrentChange (val) {
      this.currentPage = val
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    // 开关过滤被借完的书
    amountFilter (e) {
      this.uploadData = this.updatedTable()
    },
    // 根据书名、作者、类别搜索内容,注意开关为true时要过滤现存量为0的书
    searchTable () {
      this.uploadData = this.updatedTable()
    }
  },
  // 加载组件时更新表单
  mounted () {
    this.$axios.get('http://112.74.32.189:8080/library/countCategories', {
      params: {}
    }).then((response) => {
      // console.log(response.data.data)
      for (let key in response.data.data) { // 遍历键值对
        let obj = {
          text: key,
          value: key
        }
        this.sectorStyle.push(obj)
      }
    })
    this.$axios.get('http://112.74.32.189:8080/library/getCollections', {params: {
      account: this.$store.state.id
    }})
      .then((res) => {
        let data = JSON.parse(JSON.stringify(this.$store.state.books))
        let starArray = []
        res.data.data.forEach((val) => {
          starArray.push(val.collection.book.no)
        })
        data.forEach((item) => {
          if (starArray.indexOf(item.book.no) > -1) {
            item['star'] = true
          } else {
            item['star'] = false
          }
        })
        this.$store.commit('booksConfig', data)
        this.oldTableData = data
        this.uploadData = data
      })
  }
}
</script>

<style scoped>
.main{
  margin: 0 15px;
  border-radius: 10px;
  padding-left: 10px;
  width: 1300px;
  height: 620px;
  background-color: #FFFFFF;
}
.header{
  text-align: left;
  margin-top: 20px;
  margin-bottom: 10px;
}
.searchSpan{
  margin-left: 100px;
  display: inline-block;
  font-size: 13px;
  width: 60px;
}
.filterSpan{
  margin-left: 80px;
  display: inline-block;
  font-size: 13px;
  width: 140px;
}
.search{
  display:inline-block;
  width: 150px;
}
.confirmButton{
  width: 70px;
  height: 30px;
  line-height: 30px;
  padding: 0;
  margin-left: 10px;
}
.table{
  margin: 0px auto;
  width: 1220px;
  border-top: 1px solid #E4E7ED;
}
/*搜索框宽度*/
.main >>> .el-input--medium .el-input__inner{
  width: 160px;
}
/*展开栏*/
.main >>> .demo-table-expand label{
  width: 80px;
  color: #99a9bf;
  display: inline;
}
.main >>> .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
/*收藏图标的样式*/
.starStyle{
  background-color: snow;
  color:  #99a9bf;
  font-size: 19px;
  border: none;
}
.starColor{
  color: #F57D2D;
}
.main >>> .star:hover{
  color: #F57D2D;
}
.main >>> .star.is-circle{
  padding: 0px;
}
.pagination{
  margin: 20px auto;
}
</style>
