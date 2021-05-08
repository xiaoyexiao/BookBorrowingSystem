<template>
  <div>
    <div class="main">
      <div class="table">
        <el-table style="width: 100%" :data="uploadData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  v-loading="loading" height="486" :default-sort = "{prop: 'borrowDate', order: 'descending'}" >
          <el-table-column width="10"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="书目号">
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
          <el-table-column prop="style" label="类别" width="130"></el-table-column>
          <el-table-column prop="wordCount" label="字数" width="120"></el-table-column>
          <el-table-column prop="publisher" label="出版社" width="150"></el-table-column>
          <el-table-column prop="storageLocation" label="馆藏地" width="150"></el-table-column>
          <el-table-column prop="remainAmount" label="现存数量" width="150"></el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <el-input prefix-icon="el-icon-search" v-model="search" style="width: 100px" size="medium" placeholder="输入关键字搜索" @input="searchTable"/>
            </template>
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
  name: 'PaperShelves',
  data () {
    return {
      tableData: [
        {
          star: true,
          name: '活着',
          author: '余华',
          style: '小说',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          remainAmount: 2,
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: true,
          name: '活着',
          author: '余华',
          style: '小说',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          remainAmount: 2,
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: true,
          name: '活着',
          author: '余华',
          style: '小说',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          remainAmount: 2,
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        },
        {
          star: true,
          name: '活着',
          author: '余华',
          style: '小说',
          wordCount: '12000',
          publisher: '作家出版社',
          storageLocation: '文学书库（3B）',
          remainAmount: 2,
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
          remainAmount: 2,
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
          remainAmount: 2,
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
          remainAmount: 2,
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
          remainAmount: 2,
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
          remainAmount: 2,
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
          remainAmount: 2,
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
          remainAmount: 2,
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
          remainAmount: 2,
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
          remainAmount: 2,
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
          remainAmount: 2,
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
          remainAmount: 2,
          number: '01',
          description: '《活着》是作家余华的代表作之一，讲述了在大时代背景下，随着内战、三反五反，大跃进，文化大革命等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。'
        }
      ],
      // 加载开关
      loading: false,
      // 不断更新的表单
      uploadData: [],
      // 初始表单
      oldTableData: [],
      // 搜索框内容
      search: '',
      // 数据总数
      // dataSum: 10,
      // 每页条数
      pageSize: 9,
      // 当前页数
      currentPage: 1
    }
  },
  methods: {
    // 处理点击
    clickStar (index, rows) {
      let newIndex = (this.currentPage - 1) * this.pageSize + index
      console.log(newIndex)
      if (!rows[newIndex].star) {
        this.$message({
          duration: 1000,
          message: '收藏成功！',
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
    // 根据书名、作者、类别搜索内容
    searchTable () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 300)
      // 每次刷新都把页面重置为1
      this.currentPage = 1
      let newList = []
      if (this.search !== '') {
        this.oldTableData.forEach(item => {
          if (item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.author.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
            item.style.toLowerCase().indexOf(this.search.toLowerCase()) !== -1) {
            newList.push(item)
          }
        })
        this.uploadData = newList
      } else {
        this.uploadData = this.oldTableData
      }
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
.main{
  border-radius: 10px;
  margin: 0 15px;
  padding-left: 10px;
  width: 1300px;
  height: 620px;
  background-color: #FFFFFF;
}
.table{
  margin: 20px auto;
  width: 1220px;
  height: 500px;
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
  margin: 40px auto;
}
</style>
