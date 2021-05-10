<template>
  <div>
    <div class="main">
      <div class="table">
        <el-table style="width: 100%" :data="uploadData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  v-loading="loading" :default-sort = "{prop: 'borrowDate', order: 'descending'}"  height="484">
          <el-table-column width="40"></el-table-column>
          <el-table-column prop="book.name" label="书名" width="160"></el-table-column>
          <el-table-column prop="book.no" label="序列号" width="140"></el-table-column>
          <el-table-column prop="book.studentName" label="借阅人" width="120"></el-table-column>
          <el-table-column prop="studentNo" label="学号" width="180"></el-table-column>
          <el-table-column prop="borrowDate" label="借阅时间" width="180" sortable>
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.borrowDate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="180" sortable :formatter="state"></el-table-column>
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
  name: 'BorrowingRecords',
  data () {
    return {
      // 加载开关
      loading: false,
      tableData: [
        {
          studentNumber: '201827010220',
          studentName: '小王',
          bookNumber: '01',
          bookName: '活着',
          borrowDate: '2018-01-23',
          status: '已归还'
        },
        {
          studentNumber: '201827010220',
          studentName: '小王',
          bookNumber: '01',
          bookName: '活着',
          borrowDate: '2018-01-23',
          status: '已归还'
        }, {
          studentNumber: '201827010220',
          studentName: '小王',
          bookNumber: '01',
          bookName: '活着',
          borrowDate: '2018-01-23',
          status: '借阅中-剩余时间/天：30'
        },
        {
          studentNumber: '201827010220',
          studentName: '小王',
          bookNumber: '01',
          bookName: '活着',
          borrowDate: '2018-01-23',
          status: '已归还'
        }, {
          studentNumber: '201827010220',
          studentName: '小王',
          bookNumber: '01',
          bookName: '活着',
          borrowDate: '2018-01-23',
          status: '已归还'
        }, {
          studentNumber: '201827010220',
          studentName: '小王',
          bookNumber: '01',
          bookName: '活着',
          borrowDate: '2018-01-23',
          status: '已归还'
        }, {
          studentNumber: '201827010220',
          studentName: '小王',
          bookNumber: '01',
          bookName: '活着',
          borrowDate: '2018-01-23',
          status: '已归还'
        }, {
          studentNumber: '201827010220',
          studentName: '小王',
          bookNumber: '01',
          bookName: '活着',
          borrowDate: '2018-01-23',
          status: '已归还'
        }, {
          studentNumber: '201827010220',
          studentName: '小王',
          bookNumber: '01',
          bookName: '活着',
          borrowDate: '2018-01-23',
          status: '已归还'
        }, {
          studentNumber: '201827010220',
          studentName: '小王',
          bookNumber: '01',
          bookName: '活着',
          borrowDate: '2018-01-23',
          status: '已归还'
        }
      ],
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
    // 处理状态的文本格式
    state (row, column) {
      return row.status === false ? `借阅中-剩余时间/天:${row.resting}` : '已归还'
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    // 根据搜索框搜索内容
    searchTable () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 300)
      this.currentPage = 1
      let newList = []
      if (this.search !== '') {
        this.oldTableData.forEach(item => {
          if (item.borrowDate.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.studentName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.bookName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.studentNumber.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.bookNumber.toLowerCase().indexOf(this.search.toLowerCase()) !== -1) {
            newList.push(item)
          }
        })
        this.uploadData = newList
      } else {
        this.uploadData = this.oldTableData
      }
    },
    deleteRow (row, table) {
      this.$confirm('确认删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((action) => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        if (action === 'confirm') {
          for (let i = 0; i < table.length; i++) {
            if (table[i] === row) {
              table.splice(i, 1)
              break
            }
          }
        }
      })
    }
  },
  // 加载组件时更新表单
  mounted () {
    this.$axios.get('http://112.74.32.189:8080/library/getAllRecord', {params: {}})
      .then((response) => {
        // console.log(response.data.data)
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
  height: 620px;
  background-color: #FFFFFF;
}
.table{
  padding-top: 20px;
  margin: 0px 20px 20px 60px ;
  width: 1220px;
}
.pagination{
  margin: 40px;
}
</style>
