<style lang="scss" scoped>
  .user {
  
  }
</style>

<template lang="pug">
  .user
    .box_bottom.f_sb
      div
        el-button(type="primary" @click="toAddUser" plain) 新增
        el-button(type="primary" @click="getUserList") 搜索
        el-button(type="primary" @click="reset" round) 重置
      el-button(type="danger" @click="dels" plain) 批量删除
    .box_bottom
      el-input.box_ss1(v-model="getApiData.u_account" placeholder="账号")
      el-input.box_ss(v-model="getApiData.u_name" placeholder="姓名")
      el-input.box_ss(v-model="getApiData.u_tel" placeholder="手机")
      el-input.box_ss(v-model="getApiData.u_address" placeholder="现居地址")
      el-select.box_ss(v-model="getApiData.u_static" clearable placeholder="是否认证")
        el-option(label="全部" value="")
        el-option(label="已认证" value="1")
        el-option(label="尚未认证" value="0")
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
    name: "user",
    data() {
      return {
        dataList: {
          count: 1,
          list: []
        },
        getApiData:{
          pageSize: 10,
          pageIndex: 1,
          u_account: '',
          u_name: '',
          u_tel: '',
          u_address: '',
          u_static: '',
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
      getUserList(){
        this.$api(this.$SERVER.GET_USERLIST, {
          params:this.getApiData
        })
          .then(data => this.dataList = data.data)
      },
      reset(){
        Object.keys(this.getApiData).forEach( val => {
          if(val !== 'pageSize' && val!== 'pageIndex') this.getApiData[val] = '';
        })
        this.getUserList();
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
      delAlert(id){
        this.delId = id;
        this.bAlert = true
      },
      closeDelAlert(){
        this.delId = '';
        this.bAlert = false
      },
      del(){
        this.$api(`${this.$SERVER.GET_DELUSER}?id=${this.delId}`)
          .then( data => {
            this.$message.success('删除成功')
            this.bAlert = false;
            this.getUserList();
          })
      },
      dels() {
        console.log(this.delApiData)
      }
    },
    created() {
      this.getUserList();
    },
    mounted() {

    }
  }
</script>


