<style lang="scss" scoped>
  .user {
  
  }
</style>

<template lang="pug">
  .user
    .box_bottom.f_sb
      div
        el-button(type="primary" @click="toAdd" plain) 新增
        el-button(type="primary" @click="search") 搜索
        el-button(type="primary" @click="reset" round) 重置
      el-button(type="danger" @click="dels" plain) 批量删除
    .box_bottom
      el-input.box_ss1(v-model="getApiData.u_account" placeholder="账号")
      el-input.box_ss(v-model="getApiData.u_name" placeholder="姓名")
      el-input.box_ss(v-model="getApiData.u_tel" placeholder="手机")
      el-input.box_ss(v-model="getApiData.u_address" placeholder="现居地址")
    .box_bottom
      school.box_ss1.inB(@list="getSchoolList" :school="getApiData.u_school" :schools="schoolList" @change="setSchool")
      el-select.box_ss(v-model="getApiData.u_static" clearable placeholder="是否认证")
        el-option(label="是否认证" value="")
        el-option(label="已认证" :value="true")
        el-option(label="尚未认证" :value="false")
      el-select.box_ss(v-model="getApiData.u_sex" clearable placeholder="所有性别")
        el-option(label="所有性别" value="")
        el-option(label="男" :value="1")
        el-option(label="女" :value="0")
    el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
      el-table-column(type="selection" width="40" fixed)
      el-table-column(prop="u_account" label="账号" width="150")
      el-table-column(prop="u_name" label="姓名" width="150")
      el-table-column(prop="u_school" label="学校" width="150")
      el-table-column(prop="u_tel" label="手机" width="115")
      el-table-column(prop="u_sex" label="性别" width="55")
        template(slot-scope="scope")
          span {{ scope.row.u_sex | fSex}}
      el-table-column(prop="u_static" label="是否认证" width="80")
        template(slot-scope="scope")
          span {{ scope.row.u_static ? '已认证' : '未认证'}}
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
    :current-page="getApiData.pageIndex"
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
  import mPage from '@/utils/mixin/page'
  import school from '@/components/school';

  export default {
    name: "user",
    mixins: [mPage],
    data() {
      return {
        schoolList: [],
        getApiData:{
          u_account: '',
          u_name: '',
          u_tel: '',
          u_address: '',
          u_static: '',
          u_sex: '',
          u_school: '',
        },
        api: {
          list: 'GET_USERLIST',
          del: 'GET_DELUSER',
        },
        to: 'userDetail'
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      getSchoolList(data){
        this.schoolList = data;
      },
      setSchool(val){
        this.getApiData.u_school = val;
      }
    },
    components:{
      school
    }
  }
</script>


