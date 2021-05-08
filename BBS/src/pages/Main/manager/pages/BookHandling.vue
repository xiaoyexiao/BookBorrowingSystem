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
                <el-option label="文学" value="wenXue"></el-option>
                <el-option label="言情" value="yanQing"></el-option>
                <el-option label="玄幻" value="xu"></el-option>
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
                  height="480" v-loading="loading">
          <el-table-column width="60"></el-table-column>
          <el-table-column prop="number" label="序列号" width="120"></el-table-column>
          <el-table-column prop="name" label="书名" width="130"></el-table-column>
          <el-table-column prop="author" label="作者" width="130"></el-table-column>
          <el-table-column prop="style" label="类别" width="130"></el-table-column>
          <el-table-column prop="publisher" label="出版社" width="180"></el-table-column>
          <el-table-column prop="status" label="书刊状态" width="240"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button class="el-icon-circle-close" size="mini" type="danger" :disabled="scope.row.status!=='已归还'"
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
            value: 'social',
            label: '中文社科书库',
            children: [
              {
                value: '1A',
                label: '一层A库'
              },
              {
                value: '1B',
                label: '一层B库'
              }
            ]
          },
          {
            value: 'nature',
            label: '中文自然书库',
            children: [
              {
                value: '2A',
                label: '二层A库'
              },
              {
                value: '2B',
                label: '二层B库'
              }
            ]
          },
          {
            value: 'literature',
            label: '文学/外文书库',
            children: [
              {
                value: '3A',
                label: '三层A库'
              },
              {
                value: '3B',
                label: '三层B库'
              }
            ]
          }
        ]
      },
      // 上架书籍的对话框显示
      addBookDialogVisible: false,
      // 开关
      buttonValue: false,
      tableData: [
        {
          name: '活着1',
          author: '余华',
          style: '小说',
          publisher: '作家出版社',
          number: '01',
          status: '已归还'
        },
        {
          name: '活着2',
          author: '余华',
          style: '小说',
          publisher: '作家出版社',
          number: '01',
          status: '已归还'
        }, {
          name: '活着1',
          author: '余华',
          style: '小说',
          publisher: '作家出版社',
          number: '01',
          status: '已归还'
        }, {
          name: '活着1',
          author: '余华',
          style: '小说',
          publisher: '作家出版社',
          number: '01',
          status: '已归还'
        }, {
          name: '活着1',
          author: '余华',
          style: '小说',
          publisher: '作家出版社',
          number: '01',
          status: '已归还'
        }, {
          name: '活着1',
          author: '余华',
          style: '小说',
          publisher: '作家出版社',
          number: '01',
          status: '借阅中-剩余时间/天：30'
        }, {
          name: '活着1',
          author: '余华',
          style: '小说',
          publisher: '作家出版社',
          number: '01',
          status: '借阅中-剩余时间/天：30'
        }, {
          name: '活着1',
          author: '余华',
          style: '小说',
          publisher: '作家出版社',
          number: '01',
          status: '借阅中-剩余时间/天：30'
        }, {
          name: '活着1',
          author: '余华',
          style: '小说',
          publisher: '作家出版社',
          number: '01',
          status: '已归还'
        }, {
          name: '活着1',
          author: '余华',
          style: '小说',
          publisher: '作家出版社',
          number: '01',
          status: '已归还'
        }
      ],
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
    // 上传表单的提交按钮
    onSubmit (formName) {
      console.log(this.bookInfoForm.location)
      this.$message({
        type: 'success',
        message: '上架成功!'
      })
      this.$refs[formName].resetFields()
      this.addBookDialogVisible = false
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
      })
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
          if ((item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.author.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.style.toLowerCase().indexOf(this.search.toLowerCase()) !== -1) &&
            (!this.buttonValue || item.status === '已归还')) {
            newList.push(item)
          }
        })
        return newList
      } else {
        // 搜索框内容为空
        if (this.buttonValue) {
          // 开关打开了，过滤被借出的书
          this.oldTableData.forEach(item => {
            if (item.status === '已归还') {
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
    },
    // 获取表单数据
    getTableData () {
      this.oldTableData = this.tableData
      this.uploadData = this.tableData
    }
  },
  // 加载组件时更新表单
  mounted () {
    this.getTableData()
  }
}
</script>

<style scoped>
.main {
  margin: 0 15px;
  border-radius: 10px;
  padding-left: 10px;
  width: 1300px;
  height: 608px;
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
  margin: 15px auto;
}
</style>
