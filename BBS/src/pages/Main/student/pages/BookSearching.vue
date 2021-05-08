<template>
  <div>
    <div class="main">
      <div class="header">
        <span class="searchSpan">关键字:</span>
        <el-input  class="search" prefix-icon="el-icon-search" v-model="search"
                   size="mini" placeholder="输入关键字搜索" @keyup.enter.native="searchTable"/>
        <el-button type="primary" class="confirmButton" @click="searchTable" >查询</el-button>
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
                  <span>{{ props.row.number }}</span>
                </el-form-item>
                <el-form-item label="书籍描述">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="书名" width="130"></el-table-column>
          <el-table-column prop="author" label="作者" width="130"></el-table-column>
          <el-table-column prop="style" label="类别" width="130" :filters="sectorStyle" :filter-method="filterStyle"></el-table-column>
          <el-table-column prop="wordCount" label="字数" width="120"></el-table-column>
          <el-table-column prop="publisher" label="出版社" width="150"></el-table-column>
          <el-table-column prop="storageLocation" label="馆藏地" width="150"></el-table-column>
          <el-table-column prop="status" label="书刊状态" width="220"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button icon="el-icon-star-off" circle class="star"
              v-bind:class="['starStyle',{'starColor':scope.row.star}]" @click="clickStar(scope.$index,uploadData)"></el-button>
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
      tableData: [
        {
          star: true,
          name: '活着1',
          author: '余华',
          style: '小说',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          number: '01',
          status: '可借',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: true,
          name: '活着2',
          author: '余华',
          style: '传记',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          status: '可借',
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: true,
          name: '活着3',
          author: '余华',
          style: '传记',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          status: '可借',
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: true,
          name: '活着3',
          author: '余华',
          style: '小说',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          status: '可借',
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: false,
          name: '活着2',
          author: '余华',
          style: '小说',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          status: '可借',
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: false,
          name: '活着1',
          author: '余华',
          style: '传记',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          status: '借出-应还日期：2018-01-12',
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: false,
          name: '活着',
          author: '余华',
          style: '小说',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          status: '借出-应还日期：2018-01-12',
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: false,
          name: '活着1',
          author: '余华',
          style: '小说',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          status: '借出-应还日期：2018-01-12',
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: false,
          name: '活着2',
          author: '余华',
          style: '小说',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          status: '借出-应还日期：2018-01-12',
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: false,
          name: '活着',
          author: '余华',
          style: '小说',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          status: '借出-应还日期：2018-01-12',
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        }
      ],
      sectorStyle: [
        {
          'text': '小说',
          'value': '小说'
        },
        {
          'text': '传记',
          'value': '传记'
        }
      ],
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
      // 数据总数
      // dataSum: 10,
      // 每页条数
      pageSize: 9,
      // 当前页数
      currentPage: 1
    }
  },
  methods: {
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
          if ((item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.author.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.style.toLowerCase().indexOf(this.search.toLowerCase()) !== -1) &&
            (!this.value || item.status === '可借') &&
            // 没有书类别筛选或者满足筛选条件
            (this.styles.length === 0 || this.contains(this.styles, item.style))) {
            newList.push(item)
          }
        })
        return newList
      } else {
        // 搜索框内容为空
        if (this.value) {
          // 开关打开了，过滤被借出的书
          this.oldTableData.forEach(item => {
            if (item.status === '可借' &&
              (this.styles.length === 0 || this.contains(this.styles, item.style))) {
              newList.push(item)
            }
          })
          return newList
        } else {
          this.oldTableData.forEach(item => {
            if (this.styles.length === 0 || this.contains(this.styles, item.style)) {
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
      return row.style === value
    },
    // 处理收藏按钮的点击
    clickStar (index, rows) {
      let newIndex = (this.currentPage - 1) * this.pageSize + index
      // console.log(newIndex)
      if (!rows[newIndex].star) {
        this.$message({
          duration: 1000,
          message: '收藏成功！已添加到"收藏书单"',
          type: 'success'
        })
        rows[newIndex].star = true
      } else {
        this.$message({
          duration: 1000,
          message: '取消收藏！'
        })
        rows[newIndex].star = false
      }
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
    this.$axios.get('http://112.74.32.189:8080/library/getStudent', {params: {}})
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
