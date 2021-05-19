<template>
  <div>
    <div class="main">
      <div class="header">
        <el-button class="el-icon-plus" size="mini" type="primary" @click.native="addBookDialogVisible = true">上架新书
        </el-button>
        <!--上传图书出现的对话框-->
        <el-dialog title="上架新书" :visible.sync="addBookDialogVisible" :append-to-body="true" top="100px"
                   width="45%" center style="" class="dialog" :close-on-click-modal="false">
          <el-form :model="bookInfoForm" ref="bookInfoForm" label-width="80px" size="medium">
            <el-form-item label="书名：" prop="name" style="display: inline-block">
              <el-input v-model="bookInfoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="作者：" prop="author" style="display: inline-block;margin-left: 40px">
              <el-input v-model="bookInfoForm.author"></el-input>
            </el-form-item>
            <el-form-item label="类别：" prop="style" style="display: inline-block;width: 286px">
              <el-select v-model="bookInfoForm.style">
                <el-option label="学术" value="学术"></el-option>
                <el-option label="诗歌" value="诗歌"></el-option>
                <el-option label="日本文学" value="日本文学"></el-option>
                <el-option label="随笔" value="随笔"></el-option>
                <el-option label="散文" value="散文"></el-option>
                <el-option label="科学" value="科学"></el-option>
                <el-option label="小说" value="小说"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字数：" prop="wordCount" style="display: inline-block;margin-left: 40px">
              <el-input v-model="bookInfoForm.wordCount"></el-input>
            </el-form-item>
            <el-form-item label="出版社：" prop="publisher" style="display: inline-block">
              <el-input v-model="bookInfoForm.publisher"></el-input>
            </el-form-item>
            <el-form-item label="馆藏地：" prop="location" style="display: inline-block;margin-left: 40px;width: 286px">
              <el-cascader v-model="bookInfoForm.location" :options="bookInfoForm.options"
                         :props="{ expandTrigger: 'hover' }">
              </el-cascader>
            </el-form-item>
            <el-form-item label="描述：" prop="desc">
              <el-input type="textarea" v-model="bookInfoForm.desc" :rows="4"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('bookInfoForm')">上架</el-button>
              <el-button @click="resetForm('bookInfoForm')">重置</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <span class="searchSpan">关键字:</span>
        <el-input class="search" prefix-icon="el-icon-search" v-model="search"
                  size="mini" placeholder="输入关键字搜索" @keyup.enter.native="searchTable"/>
        <el-button type="primary" class="confirmButton" @click="searchTable">查询</el-button>
        <span class="filterSpan">不显示借出的图书信息</span>
        <el-switch v-model="buttonValue" @change="amountFilter($event)"></el-switch>
      </div>
      <div class="table">
        <el-table style="width: 100%" :data="uploadData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  height="492" v-loading="loading">
          <el-table-column width="60"></el-table-column>
          <el-table-column prop="book.no" label="序列号" width="120"></el-table-column>
          <el-table-column prop="book.name" label="书名" width="160"></el-table-column>
          <el-table-column prop="book.author" label="作者" width="220"></el-table-column>
          <el-table-column prop="book.category" label="类别" width="130"></el-table-column>
          <el-table-column prop="book.publisher" label="出版社" width="180"></el-table-column>
          <el-table-column prop="status" label="状态" width="220" sortable :formatter="state"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button class="el-icon-circle-close" size="mini" type="danger" :disabled="scope.row.status!==true"
                         @click="deleteBook(scope.row)">下架
              </el-button>
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
  name: 'BookHanding',
  data () {
    return {
      // 上传表单
      bookInfoForm: {
        name: '',
        author: '',
        style: '',
        wordCount: '',
        publisher: '',
        desc: '',
        location: [],
        options: [
          {
            value: '总馆',
            label: '总馆'
          },
          {
            value: '泰山',
            label: '泰山'
          },
          {
            value: '启林',
            label: '启林'
          },
          {
            value: '华山',
            label: '华山'
          }
        ]
      },
      // 上架书籍的对话框显示
      addBookDialogVisible: false,
      // 开关
      buttonValue: false,
      // 不断更新的表单
      uploadData: [],
      // 初始表单
      oldTableData: [],
      // 搜索框内容
      search: '',
      // 图表加载开关
      loading: false,
      searchName: '',
      searchStyle: '',
      // 数据总数
      // dataSum: 10,
      // 每页条数
      pageSize: 9,
      // 当前页数
      currentPage: 1
    }
  },
  methods: {
    // 处理状态的文本格式
    state (row, column) {
      return row.status === false ? `借阅中-归还日期:${row.deadline}` : '已归还'
    },
    // 上传表单的提交按钮
    onSubmit (formName) {
      let obj = {
        book: {
          name: this.bookInfoForm.name,
          author: this.bookInfoForm.author,
          summary: this.bookInfoForm.desc,
          publisher: this.bookInfoForm.publisher,
          located: this.bookInfoForm.location,
          category: this.bookInfoForm.style,
          length: this.bookInfoForm.wordCount,
          no: Math.round(Math.random() * 10000)
        },
        status: true
      }
      this.oldTableData.push(obj)
      this.$axios.post('http://112.74.32.189:8080/library/saveBook', {
        name: this.bookInfoForm.name,
        author: this.bookInfoForm.author,
        summary: this.bookInfoForm.desc,
        publisher: this.bookInfoForm.publisher,
        located: this.bookInfoForm.location,
        category: this.bookInfoForm.style,
        length: this.bookInfoForm.wordCount
      }).then((response) => {
        console.log(this.bookInfoForm.wordCount)
        // this.uploadData.push()
      })
      // console.log(this.bookInfoForm.location)
      this.$message({
        type: 'success',
        message: '上架成功!'
      })
      this.$refs[formName].resetFields()
      this.addBookDialogVisible = false
      this.search = ''
      this.updatedTable()
    },
    // 上架表单的重置按钮
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 取消按钮
    cancel () {
      this.addBookDialogVisible = false
    },
    deleteBook (row) {
      this.$confirm('确认下架该书?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((action) => {
        this.$message({
          type: 'success',
          message: '下架成功!'
        })
        if (action === 'confirm') {
          this.$axios.get('http://112.74.32.189:8080/library/deleteBook', {
            params: {
              bookID: row.book.no
            }
          }).then((response) => {
            console.log(response.data.data)
          })
          for (let i = 0; i < this.oldTableData.length; i++) {
            if (this.oldTableData[i] === row) {
              this.oldTableData.splice(i, 1)
              break
            }
          }
          for (let i = 0; i < this.uploadData.length; i++) {
            if (this.uploadData[i] === row) {
              this.uploadData.splice(i, 1)
              break
            }
          }
        }
      }).catch(() => {})
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
            (!this.buttonValue || item.status === true)) {
            newList.push(item)
          }
        })
        return newList
      } else {
        // 搜索框内容为空
        if (this.buttonValue) {
          // 开关打开了，过滤被借出的书
          this.oldTableData.forEach(item => {
            if (item.status === true) {
              newList.push(item)
            }
          })
          return newList
        } else {
          return this.oldTableData
        }
      }
    },
    // 开关过滤被借完的书
    amountFilter (e) {
      this.uploadData = this.updatedTable()
    },
    // 根据书名、作者、类别搜索内容,注意开关为true时要过滤现存量为0的书
    searchTable () {
      this.uploadData = this.updatedTable()
    },
    // 实时更新当前页
    handleCurrentChange (val) {
      this.currentPage = val
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 300)
    }
  },
  // 加载组件时更新表单
  mounted () {
    this.oldTableData = this.$store.state.books
    this.uploadData = this.$store.state.books
  }
}
</script>

<style scoped>
.main {
  margin: 0 15px;
  border-radius: 10px;
  padding-left: 10px;
  width: 1300px;
  height: 640px;
  background-color: #FFFFFF;
}

.header {
  text-align: left;
  padding-top: 20px;
  margin-bottom: 10px;
}

.el-icon-plus {
  margin-left: 80px;
}

.searchSpan {
  margin-left: 450px;
  display: inline-block;
  font-size: 13px;
  width: 60px;
}

.filterSpan {
  margin-left: 60px;
  display: inline-block;
  font-size: 13px;
  width: 140px;
}

/*表格行间距*/
.main >>> .el-table td, .el-table th {
  padding: 10px 0;
}

.search {
  display: inline-block;
  width: 150px;
}

.confirmButton {
  width: 80px;
  height: 30px;
  line-height: 30px;
  padding: 0;
  margin-left: 10px;
  font-size: 14px;
}

.table {
  margin: 0px auto;
  width: 1220px;
  border-top: 1px solid #E4E7ED;
}

.pagination {
  margin: 20px auto;
}
</style>
