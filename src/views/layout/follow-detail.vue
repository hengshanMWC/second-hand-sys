<style lang="scss" scoped>
  .followDetail {
    .tab-box {
      margin-top: 80px;
    }
  }
</style>

<template lang="pug">
  .followDetail
    el-form.demo-ruleForm.box_bottom(:model="apiData" ref="ruleForm" label-width="100px")
      quill-editor.box_bottom(v-model="apiData.f_content")
      el-col(:span="24")
        el-button(type="primary" @click="submitForm('ruleForm')") 保存
    .tab-box
      .box_bottom.f_sb
        el-button(type="primary" @click="upAlert" plain) 新增
        el-button(type="danger" @click="dels" plain) 批量删除
      el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
        el-table-column(type="selection" width="40" fixed)
        el-table-column(prop="u_name" label="指定人" width="150")
        el-table-column(prop="n_name" label="发布人" width="150")
        el-table-column(prop="up_date" label="更新日期" width="180")
        el-table-column(prop="create_date" label="创建日期" width="180")
        el-table-column(label="操作" fixed="right" width="155")
          template(slot-scope="scope")
            el-button(@click="upAlert(scope.row._id)" type="primary" size="small") 编辑
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
      v-model="apiListData.n_content")
      span.dialog-footer(slot="footer")
        el-button(@click="closeAlert") 取消
        el-button(@click="submitAlert" type="primary")  确认
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mPageOn from '@/utils/mixin/page-no-create'
  import mDetailOn from '@/utils/mixin/detail-no-watch'

  export default {
    name: "followDetail",
    mixins: [mPageOn, mDetailOn],
    data() {
      return {
        api: {
          info: 'GET_FEEDBACKINFO',
          upInfo: 'POST_FEEDBACKUPINFO',
          list: 'GET_NEWSLIST',
          del: 'GET_NEWSDEL'
        },
        success: {
          url: 'follow'
        },
        apiData: {
          f_content: '',
        },
        apiListData: {
          n_content: '',
          id: '',
        },
        bFollow: false,
        getApiData: {
          pageSize: 10,
          pageIndex: 1,
          n_type: 6,
          l_id: '',
        },
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      closeAlert(){
        this.apiListData.n_content = '';
        this.apiListData.id = '';
        this.bFollow = false;
      },
      upAlert(id){
        this.bFollow = true;
        if(typeof id !== 'object'){
          this.apiListData.id = id;
          this.getListData(id)
        }
      },
      getListData(id){
        this.$api(this.$SERVER.GET_NEWSINFO, {
          params:{
            id
          }
        })
          .then(res => this.apiListData.n_content = res.data.n_content)
      },
      submitAlert(f_type) {
        let {apiListData, apiData, $SERVER} = this;
        let data,api,fn;
        if(apiListData.id){
          //更新消息
          data = apiListData;
          api = $SERVER.POST_NEWSUPINFO
        } else {
          //增加反馈
          data = {
            id: this.id,
            f_content: apiListData.n_content
          }
          api = $SERVER.POST_FEEDBACKREPLY
          fn = this.getList
        }
        this.$api.post(api, data)
          .then(res => {
            this.closeAlert();
            res.state ? this.$message.success('操作成功') : this.$message.error(res.mes)
            if(fn) fn()
          })
      },
    },
    create(){
    
    },
    watch: {
      $route: {
        handler(to) {
          this.id = to.query.id;
          if(this.id){
            this.getApiData.pageIndex = 1;
            this.getApiData.l_id = this.id
            this.getInfo()
            this.getList()
          }
        },
        immediate: true
      }
    },
  }
</script>


