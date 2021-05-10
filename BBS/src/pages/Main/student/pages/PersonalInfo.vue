<template>
  <div class="PersonalInfo">
      <el-card class="box-card">
        <i class="el-icon-user-solid"></i>
        <span class="nickName">{{personData.name}}</span>
        <div class="info1">
          <p style="padding: 8px">姓名：{{personData.name}}</p>
          <p style="padding: 8px">学号：{{personData.number}}</p>
          <p style="padding: 8px">年级：{{personData.grade}}级</p>
          <p style="padding: 8px">专业班级：{{personData.major+personData.clazz}}班</p>
        </div>
        <div class="info2">
          <p style="padding: 10px">电子邮箱：{{personData.email}}</p>
          <p style="padding: 10px">手机：{{personData.phone}}</p>
        </div>
        <div class="info3">
          <div style="display: inline-block;margin: 10px">
            <el-button class="infoButton" icon="el-icon-collection" circle></el-button>
            <span class="borrowInfo">借阅总数：<span style="color: #3080FF;font-weight: bolder">{{totalData.total}}</span></span>
          </div>
          <div style="display: inline-block;margin: 10px">
            <el-button class="infoButton" icon="el-icon-reading" circle></el-button>
            <span class="borrowInfo">待还数量：<span style="color: #3080FF;font-weight: bolder">{{totalData.borrowingNumber}}</span></span>
          </div>
          <div style="display: inline-block;margin: 10px">
            <el-button class="infoButton" icon="el-icon-warning-outline" circle></el-button>
            <span class="borrowInfo">账号状态：<span style="color: #3080FF;font-weight: bolder">安全</span></span>
          </div>
        </div>
      </el-card>
    <div class="tableHeader">
      <i class="el-icon-s-order" style="color: #F57D2D"></i>
      <span>待还图书</span>
    </div>
    <div class="tableBorder">
      <el-table class="table"  :data="table"
                :default-sort = "{prop: 'resting', order: 'ascending'}" height="370">
        <el-table-column width="20"></el-table-column>
        <el-table-column prop="book.name" label="书名" width="180"></el-table-column>
        <el-table-column prop="book.author" label="作者" width="150"></el-table-column>
        <el-table-column prop="book.category" label="类别" width="150"></el-table-column>
        <el-table-column prop="book.length" label="字数" width="150"></el-table-column>
        <el-table-column prop="book.publisher" label="出版社" width="150"></el-table-column>
        <el-table-column prop="resting" label="剩余借用时间/天" width="180" sortable>
          <template slot-scope="scope">
           <i class="el-icon-time"></i>
           <span style="margin-left: 10px">{{ scope.row.resting }}</span>
         </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click.native.prevent="defer(scope.row,table)" type="text" size="medium">续租</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInfo',
  data () {
    return {
      personData: [],
      table: [],
      totalData: [],
      // 不断更新的表单
      uploadData: [],
      // 初始表单
      oldTableData: [],
      // 当前页数
      currentPage: 1
    }
  },
  methods: {
    // 获取表单数据
    getTableData () {
      this.oldTableData = this.tableData
      this.uploadData = this.tableData
    },
    // 书籍续租
    defer (row, table) {
      this.$confirm('延期还书?(可延长30天)', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then((action) => {
        this.$axios.get('http://112.74.32.189:8080/library/reletBook', {
          params: {
            order: row.order
          }
        }).then((response) => {
          if (response.data.event === 0) {
            for (let i = 0; i < table.length; i++) {
              if (table[i] === row) {
                table[i].resting += 30
                break
              }
            }
            this.$message({
              type: 'success',
              message: '续租成功!'
            })
          } else {
            this.$message.error('续租失败,仅允许续租一次！')
          }
        })
      })
    }
  },
  // 加载组件时更新表单
  mounted () {
    this.getTableData()
    this.$axios.post('http://112.74.32.189:8080/library/getStudent', {
      account: this.$store.state.id
    }).then((response) => {
      // console.log(response.data.data)
      this.personData = response.data.data
    })
    this.$axios.get('http://112.74.32.189:8080/library/borrowingBook', {
      params: {
        account: '5'
      }
    }).then((response) => {
      // console.log(response.data.data)
      this.table = response.data.data
    })
    this.$axios.get('http://112.74.32.189:8080/library/recordNumber', {
      params: {
        account: '5'
      }
    }).then((response) => {
      // console.log(response.data.data)
      this.totalData = response.data.data
    })
  }
}
</script>
<style scoped>
.PersonalInfo{
  line-height: 10px;
  font-size: 20px;
}
.box-card{
  text-align: left;
  position: relative;
  margin: 0 auto;
  background-color: snow;
  border-radius: 10px;
  width: 1200px;
  height: 200px;
}
.el-icon-user-solid{
  font-size: 100px;
  color: #3080FF;
  position: relative;
  left: 50px;
  top: 18px;
}
.nickName{
  position: relative;
  left: 70px;
  bottom: 55px;
  line-height: 10px;
}
.info1{
  position: relative;
  left: 170px;
  bottom: 60px;
  width: 220px;
  border-right: #ddd solid 3px;
  font-size: 15px;
}
.info2{
  position: relative;
  left: 400px;
  top: -163px;
  width: 250px;
  height: 102px;
  border-right: #ddd solid 3px;
  font-size: 15px;
  padding-left: 15px;
}
.info3{
  position: relative;
  left: 700px;
  top: -300px;
  width: 700px;
  height: 500px;
}
.infoButton{
  font-size: 30px;
  margin: 20px 50px 30px 20px ;
  color: #3080FF;
  background-color: #E4E7ED;
}
.borrowInfo{
  display: block;
  font-size: 15px;
}
.tableHeader{
  width: 100px;
  font-size: 16px;
  position: relative;
  left: 20px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
}
.tableBorder{
  padding-bottom: 20px;
  border-radius: 10px;
  margin: 0 auto;
  width: 1200px;
  height: 350px;
  background-color: #FFFFFF;
}
.table{
  margin: 0px auto;
  width: 1120px;
}
</style>
