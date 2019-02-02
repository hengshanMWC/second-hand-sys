<style lang="scss" scoped>
  .sys {
  
  }
</style>

<template lang="pug">
  .sys
    .box_bottom.f_sb
      div
        el-button(type="primary" @click="toAdd" plain) 新增
      el-button(type="danger" @click="dels" plain) 批量删除
    el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
      el-table-column(type="selection" width="40" fixed)
      el-table-column(prop="t_name" label="分类名称" width="180")
      el-table-column(prop="t_types" label="二级个数" width="100")
      el-table-column(prop="up_date" label="更新日期")
      el-table-column(prop="create_date" label="创建日期" )
      el-table-column(label="操作" width="155" fixed="right")
        template(slot-scope="scope")
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
      span 是否删除该分类
      span.dialog-footer(slot="footer")
        el-button(@click="closeDelAlert") 取消
        el-button(@click="del" type="primary")  确认
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  export default {
    name: "sys",
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
        this.$api(this.$SERVER.GET_TYPELIST, {
          params:this.getApiData
        })
          .then(data => this.dataList = data.data)
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
      toAdd(){
        this.$router.push('/typeDetail')
      },
      edit(id){
        this.$router.push('/typeDetail?id=' + id)
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
        this.$api(`${this.$SERVER.GET_TYPEDEL}?id=${this.delId}`)
          .then( data => {
            this.$message.success('删除成功')
            this.bAlert = false;
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
    mounted() {

    }
  }
</script>





