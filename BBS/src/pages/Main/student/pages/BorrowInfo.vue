<template>
  <div>
    <div class="main">
      <div class="table">
        <el-table style="width: 100%" :data="uploadData.filter(item=>item.visible===true).slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  v-loading="loading" :default-sort = "{prop: 'borrowDate', order: 'descending'}"  height="555">
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
          <el-table-column prop="book.name" label="书名" width="140"></el-table-column>
          <el-table-column prop="book.author" label="作者" width="180"></el-table-column>
          <el-table-column prop="book.category" label="类别" width="70"></el-table-column>
          <el-table-column prop="book.length" label="字数" width="80"></el-table-column>
          <el-table-column prop="book.publisher" label="出版社" width="150"></el-table-column>
          <el-table-column prop="borrowDate" label="借阅日期" width="130" sortable>
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.borrowDate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="180" :formatter="state"  sortable></el-table-column>
          <el-table-column label="操作" width="60">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.row,uploadData)" type="text" size="medium">删除</el-button>
            </template>
          </el-table-column>
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
  name: 'BorrowInfo',
  data () {
    return {
      table: [],
      // 刷新开关
      loading: false,
      // 不断更新的表单
      uploadData: [],
      // 初始表单
      oldTableData: [],
      // 搜索框内容
      search: '',
      // 每页条数
      pageSize: 8,
      // 当前页数
      currentPage: 1
    }
  },
  methods: {
    // 处理状态的文本格式
    state (row, column) {
      return row.status === false ? `借阅中-剩余时间/天:${row.resting}` : '已归还'
    },
    // 翻页更新
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
          if (item.book.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.book.no.toString().indexOf(this.search.toLowerCase()) !== -1 ||
            item.book.category.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
          item.book.author.toLowerCase().indexOf(this.search.toLowerCase()) !== -1) {
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
          // console.log(row.order)
          this.$axios.get('http://112.74.32.189:8080/library/hideRecord', {
            params: {
              order: row.order
            }
          }).then((response) => {
            // console.log(response.data.data)
          })
          for (let i = 0; i < table.length; i++) {
            if (table[i] === row) {
              table[i].visible = false
              break
            }
          }
        }
      })
    }
  },
  // 加载组件时更新表单
  mounted () {
    this.$axios.post('http://112.74.32.189:8080/library/borrowRecord', {
      account: this.$store.state.id
    }).then((response) => {
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
  margin: 10px 70px;
  width: 1200px;
  height: 620px;
  background-color: #FFFFFF;
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
.table{
  margin: 10px 20px 20px 30px ;
  width: 1140px;
  height: 500px;
}
.pagination{
  margin: 10px auto;
}
</style>
