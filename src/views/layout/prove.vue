<style lang="scss" scoped>
  .prove {

  }
</style>

<template lang="pug">
  .prove
    .box_bottom.f_sb
      div
        <!--el-button(type="primary" @click="toAdd" plain) 新增-->
        el-button(type="primary" @click="search") 搜索
        el-button(type="primary" @click="reset" round) 重置
      el-button(type="danger" @click="dels" plain) 批量删除
    .box_bottom
      el-select.w(v-model="getApiData.p_state" clearable placeholder="审核状态")
        el-option(label="审核状态" value="")
        el-option(label="待审核" :value="0")
        el-option(label="审核通过" :value="1")
        el-option(label="审核不通过" :value="2")
    el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
      el-table-column(type="selection" width="40" fixed)
      el-table-column(prop="p_name" label="审请姓名" width="180")
      el-table-column(prop="p_prove" label="审请证件" width="200")
      el-table-column(prop="p_school" label="审请学校" width="180")
      el-table-column(prop="p_state" label="审核状态" width="100")
        template(slot-scope="scope")
          span {{ scope.row.p_state | fAuditing}}
      el-table-column(prop="up_date" label="更新日期" width="180")
      el-table-column(prop="create_date" label="创建日期" width="180")
      el-table-column(label="操作" fixed="right" width="210")
        template(slot-scope="scope")
          el-button(@click="auditingAlert(scope.row._id)" size="small") 审核
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
      span 是否删除该分类
      span.dialog-footer(slot="footer")
        el-button(@click="closeDelAlert") 取消
        el-button(@click="del" type="primary")  确认
    el-dialog(
    title="认证审核"
    @close="closeProve"
    :visible.sync="bProve"
    width="80%")
      quill-editor(
      v-model="apiData.p_content")
      span.dialog-footer(slot="footer")
        el-button(@click="auditing(1)" type="primary") 通过
        el-button(@click="auditing(2)" type="warning") 不通过
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mPage from '@/utils/mixin/page'
  export default {
    name: "prove",
    mixins: [mPage],
    data() {
      return {
        api: {
          list: 'GET_PROVELIST',
          del: 'GET_PROVEDEL'
        },
        to: 'proveDetail',
        getApiData: {
          p_state: '',
        },
        bProve: false,
        apiData: {
          p_content: '',
          id: '',
          p_state: '',
        },
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      closeProve(){
        this.apiData.p_content = '';
        this.apiData.id = '';
        this.apiData.p_state = ''
      },
      auditingAlert(id){
        this.bProve = true;
        this.apiData.id = id;
      },
      auditing(p_state){
        this.apiData.p_state = p_state;
        this.$api.post(this.$SERVER.POST_PROVEAUDITING, this.apiData)
          .then( res => {
            this.bProve = false
            this.closeProve();
            res.state ? this.$message.success('操作成功') :  this.$message.error(res.mes)
            this.getList();
          })
      },
    },
    filters:{
      fAuditing(state){
        if(state === undefined || state === '') return ''
        const arr = ['待审核','审核通过','审核不通过']
        return arr[state]
      },
    }
  }
</script>