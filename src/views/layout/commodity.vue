<style lang="scss" scoped>
  .commodity {
  }
</style>

<template lang="pug">
  .commodity
    .box_bottom.f_sb
      div
        el-button(type="primary" @click="toAddUser" plain) 新增
        el-button(type="primary" @click="getList") 搜索
        el-button(type="primary" @click="reset" round) 重置
        el-button(type="danger" @click="dels" plain) 批量删除
    el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
      el-table-column(type="selection" width="40" fixed)
      el-table-column(prop="c_title" label="商品名称" width="150")
      el-table-column(prop="c_type" label="分类" width="150")
      el-table-column(prop="c_type2" label="子分类" width="150")
      el-table-column(prop="c_price" label="价格" width="160")
      el-table-column(prop="c_num" label="数量" width="50")
      el-table-column(prop="c_state" label="状态" width="50")
      el-table-column(prop="up_date" label="更新日期" width="170")
      el-table-column(prop="create_date" label="创建日期" width="170")
      el-table-column(label="操作" width="155" fixed="right")
        template(slot-scope="scope")
          el-button(@click="upState(scope.row._id, scope.row.c_state)" type="primary" size="small") {{scope.row.c_state | getStateText}}
          el-button(@click="edit(scope.row._id)" type="primary" size="small") 编辑
          el-button(@click="delAlert(scope.row._id)" type="danger" size="small") 删除
    el-pagination.box_bottom(
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="getApiData.pageIndex + 1"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="getApiData.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="dataList.count")
    el-dialog(
    title="删除"
    :visible.sync="bAlert"
    width="25%")
      span 是否删除该用户
      span.dialog-footer(slot="footer")
        el-button(@click="closeDelAlert") 取消
        el-button(@click="del" type="primary")  确认
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "commodity",
    data() {
      return {
        dataList: {
          count: 1,
          list: []
        },
        getApiData:{
          pageSize: 10,
          pageIndex: 1,
        },
        delApiData: [],
        delId: '',
        bAlert: false,
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      getList(){
        this.$api(this.$SERVER.GET_COMMODITYLIST, {
          params:this.getApiData
        })
          .then(data => this.dataList = data.data)
      },
      reset(){
        Object.keys(this.getApiData).forEach( val => {
          if(val !== 'pageSize' && val!== 'pageIndex') this.getApiData[val] = '';
        })
        this.getList();
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.delApiData = val.map( val => val._id)
      },
      handleSizeChange(val) {
        this.getApiData.pageSize = val ;
        this.getList();
      },
      handleCurrentChange(val) {
        this.getApiData.pageIndex = val - 1;
        this.getList();
      },
      toAddUser(){
        this.$router.push('/commodityDetail')
      },
      edit(id){
        this.$router.push('/commodityDetail?id=' + id)
      },
      delAlert(id){
        this.delId = id;
        this.bAlert = true
      },
      closeDelAlert(){
        this.delId = '';
        this.bAlert = false
      },
      del(){
        this.$api(`${this.$SERVER.GET_COMMODITYDEL}?id=${this.delId}`)
          .then( data => {
            this.$message.success('删除成功')
            this.bAlert = false;
            this.getList();
          })
      },
      upState(c_id, c_state){
        this.$api.post(this.$SERVER.POST_COMMODITYUPINFO, {
          c_id,
          c_state: c_state == 1 ? 2 : 1
        })
          .then( res => {
            res.state ? this.$message.success('操作成功') :  this.$message.error(res.mes)
            this.getList();
          })
      },
      dels() {
        console.log(this.delApiData)
      }
    },
    created() {
      this.getList();
    },
    filters: {
      getStateText(state){
        return state == 2 ? '上架' : '下架'
      }
    }
  }
</script>


