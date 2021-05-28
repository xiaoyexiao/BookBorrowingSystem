<template>
  <div>
    <div class="main">
      <div class="table">
        <el-table style="width: 100%" :data="uploadData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  v-loading="loading" :default-sort = "{prop: 'borrowSum', order: 'descending'}" height="484">
          <el-table-column width="20"></el-table-column>
          <el-table-column prop="student.name" label="姓名" width="90"></el-table-column>
          <el-table-column prop="student.number" label="学号" width="140"></el-table-column>
          <el-table-column prop="student.grade" label="年级" width="110"></el-table-column>
          <el-table-column prop="" label="专业班级" width="160">
            <template slot-scope="scope">
              {{scope.row.student.major}}{{scope.row.student.clazz}}班
            </template>
          </el-table-column>
          <el-table-column prop="student.email" label="电子邮箱" width="190"></el-table-column>
          <el-table-column prop="student.phone" label="手机号" width="150"></el-table-column>
          <el-table-column prop="total" label="借阅总数" width="110" sortable></el-table-column>
          <el-table-column prop="borrowingNumber" label="待还总数" width="120" sortable></el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <el-input prefix-icon="el-icon-search" v-model="search" size="mini" placeholder="输入关键字搜索" @input="searchTable"/>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @current-change="handleCurrentChange" :page-size="pageSize"
                         layout="total,prev, pager, next, jumper" :total="this.uploadData.length" background >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRecords',
  data () {
    return {
      tableData: [
        {
          name: '小李',
          number: 201827010240,
          grade: '2017级',
          majorClass: '软件工程2班',
          email: '947449714@qq.com',
          phone: '19927533604',
          borrowSum: 4,
          returnedSum: 2
        },
        {
          name: '小李额',
          number: 201827010240,
          grade: '2018级',
          majorClass: '软件工程2班',
          email: '947449714@qq.com',
          phone: '19927533604',
          borrowSum: 3,
          returnedSum: 0
        }, {
          name: '小李',
          number: 201827010240,
          grade: '2018级',
          majorClass: '软件工程2班',
          email: '947449714@qq.com',
          phone: '19927533604',
          borrowSum: 2,
          returnedSum: 1
        }, {
          name: '小李',
          number: 201827010240,
          grade: '2018级',
          majorClass: '软件工程2班',
          email: '947449714@qq.com',
          phone: '19927533604',
          borrowSum: 2,
          returnedSum: 1
        }, {
          name: '小李',
          number: 201827010240,
          grade: '2018级',
          majorClass: '软件工程2班',
          email: '947449714@qq.com',
          phone: '19927533604',
          borrowSum: 2,
          returnedSum: 1
        }, {
          name: '小李',
          number: 201827010240,
          grade: '2018级',
          majorClass: '软件工程2班',
          email: '947449714@qq.com',
          phone: '19927533604',
          borrowSum: 2,
          returnedSum: 1
        }, {
          name: '小李',
          number: 201827010240,
          grade: '2018级',
          majorClass: '软件工程2班',
          email: '947449714@qq.com',
          phone: '19927533604',
          borrowSum: 2,
          returnedSum: 1
        }, {
          name: '小李',
          number: 201827010240,
          grade: '2018级',
          majorClass: '软件工程2班',
          email: '947449714@qq.com',
          phone: '19927533604',
          borrowSum: 2,
          returnedSum: 1
        }, {
          name: '小李',
          number: 201827010240,
          grade: '2018级',
          majorClass: '软件工程2班',
          email: '947449714@qq.com',
          phone: '19927533604',
          borrowSum: 2,
          returnedSum: 1
        }, {
          name: '小李',
          number: 201827010240,
          grade: '2018级',
          majorClass: '软件工程2班',
          email: '947449714@qq.com',
          phone: '19927533604',
          borrowSum: 5,
          returnedSum: 3
        }
      ],
      loading: false,
      // 不断更新的表单
      uploadData: [],
      // 初始表单
      oldTableData: [],
      // 搜索框内容
      search: '',
      // 每页条数
      pageSize: 9,
      // 当前页数
      currentPage: 1
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    // 根据姓名、学号、年级、专业班级搜索内容
    searchTable () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 300)
      this.currentPage = 1
      let newList = []
      if (this.search !== '') {
        this.oldTableData.forEach(item => {
          if (item.student.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            // 数字别忘了先转为字符串！！！
            item.student.number.toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) !== -1 ||
            item.student.grade.toString().toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.student.major.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.student.clazz.toString().toLowerCase().indexOf(this.search.toLowerCase()) !== -1) {
            newList.push(item)
          }
        })
        this.uploadData = newList
      } else {
        this.uploadData = this.oldTableData
      }
    }
  },
  // 加载组件时更新表单
  mounted () {
    this.$axios.get(`http://${this.$store.state.url}:8080/library/getAllStudent`, {params: {}})
      .then((response) => {
        console.log(response.data.data)
        this.oldTableData = response.data.data
        this.uploadData = response.data.data
      })
  }
}
</script>

<style scoped>
.main{
  border-radius: 10px;
  margin: 0 15px;
  width: 1300px;
  height: 640px;
  background-color: #FFFFFF;
}
.table{
  padding-top: 20px;
  margin: 0px 20px 20px 60px ;
  width: 1220px;
}
.pagination{
  margin-top: 60px;
}
</style>
