<style lang="scss" scoped>
  .user {
  }
</style>

<template lang="pug">
  .user
    .box_bottom
      el-button(type="primary" @click="toAddUser") 新增用户
      el-button(type="danger" @click="dels") 批量删除
    el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
      el-table-column(type="selection" width="40" fixed)
      el-table-column(prop="u_account" label="账号" width="150")
      el-table-column(prop="u_name" label="姓名" width="150")
      el-table-column(prop="u_tel" label="手机" width="115")
      el-table-column(prop="u_sex" label="性别" width="55")
      el-table-column(prop="u_static" label="是否认证" width="80")
      el-table-column(prop="u_address" label="现居地址" width="250")
      el-table-column(prop="up_date" label="更新日期" width="170")
      el-table-column(prop="create_date" label="创建日期" width="170")
      el-table-column(label="操作" width="155" fixed="right")
        template(slot-scope="scope")
          el-button(@click="edit(scope.row._id)" type="primary" size="small") 编辑
          el-button(@click="del(scope.row._id)" type="danger" size="small") 删除
    el-pagination.box_bottom(
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="getApiData.pageIndex + 1"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="getApiData.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="dataList.count")
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  
  export default {
    name: "user",
    data() {
      return {
        dataList: {
          count: 1,
          list: []
        },
        getApiData:{
          pageSize: 10,
          pageIndex: 0,
        },
        delApiData: []
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      getUserList(){
        this.$api(this.$SERVER.GET_USERLIST, {
          params:this.getApiData
        })
          .then(data => this.dataList = data.data)
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
        this.getUserList();
      },
      handleCurrentChange(val) {
        this.getApiData.pageIndex = val - 1;
        this.getUserList();
      },
      toAddUser(){
        this.$router.push('/userDetail')
      },
      edit(id){
        this.$router.push('/userDetail?id=' + id)
      },
      del(id){
        this.$api(`${this.$SERVER.GET_DELUSER}?id=${id}`)
          .then( data => {
            console.log(data)
            this.$message.success('删除成功')
            this.getUserList();
          })
      },
      dels(){
      
      },
    },
    created() {
      this.getUserList();
    },
    mounted() {

    }
  }
</script>


