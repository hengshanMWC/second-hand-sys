<style lang="scss" scoped>
  .follow {
  }
</style>

<template lang="pug">
  .follow
    .box_bottom.f_sb
      div
        <!--el-button(type="primary" @click="toAdd" plain) 新增-->
        el-button(type="primary" @click="search") 搜索
        el-button(type="primary" @click="reset" round) 重置
      el-button(type="danger" @click="dels" plain) 批量删除
    .box_bottom
      el-select.w(v-model="getApiData.f_type" clearable placeholder="反馈类型")
        el-option(label="反馈类型" value="")
        el-option(label="界面视觉" :value="1")
        el-option(label="功能相关" :value="2")
        el-option(label="内容错误" :value="3")
        el-option(label="其他" :value="4")
    el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
      el-table-column(type="selection" width="40" fixed)
      el-table-column(prop="u_account" label="反馈账号" width="180")
      el-table-column(prop="f_type" label="反馈类型" width="100")
        template(slot-scope="scope")
          span {{ scope.row.f_type | fType}}
      el-table-column(prop="up_date" label="更新日期" width="180")
      el-table-column(prop="create_date" label="创建日期" width="180")
      el-table-column(label="操作" fixed="right" width="210")
        template(slot-scope="scope")
          el-button(@click="upAlert(scope.row._id)" size="small") 回复
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
    title="反馈回复"
    @close="closeAlert"
    :visible.sync="bFollow"
    width="80%")
      quill-editor(
      v-model="apiData.f_content")
      span.dialog-footer(slot="footer")
        el-button(@click="closeAlert") 取消
        el-button(@click="submitAlert" type="primary")  确认
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mPage from '@/utils/mixin/page'
  export default {
    name: "follow",
    mixins: [mPage],
    data() {
      return {
        api: {
          list: 'GET_FEEDBACKLIST',
          del: 'GET_FEEDBACKDEL'
        },
        to: 'followDetail',
        getApiData: {
          f_type: '',
        },
        bFollow: false,
        apiData: {
          f_content: '',
          id: '',
        },
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      closeAlert(){
        this.apiData.f_content = '';
        this.apiData.id = '';
        this.bFollow = false;
      },
      upAlert(id){
        this.bFollow = true;
        this.apiData.id = id;
      },
      submitAlert(f_type){
        this.$api.post(this.$SERVER.POST_FEEDBACKREPLY, this.apiData)
          .then( res => {
            this.closeAlert();
            res.state ? this.$message.success('操作成功') :  this.$message.error(res.mes)
            this.getList();
          })
      },
    },
    filters:{
      fType(type){
        if(type === undefined || type === '') return ''
        const arr = ['','界面视觉','功能相关','内容错误', '其他']
        return arr[type]
      },
    }
  }
</script>


