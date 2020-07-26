<style lang="scss" scoped>
  .proveDetail {
    .view {
      margin-bottom: 20px;
    }
    .input-box {
      margin-bottom: 20px;
    }
    .input-label {
      margin-right: 60px;
    }
    .red {
      color: #c52424;
    }
    .lv {
      color: #66c55a;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .tab-box {
      margin-top: 100px;
    }
  }
</style>

<template lang="pug">
  .proveDetail
    .inB.view
      span 当前状态：
      span(:class="apiData.p_state | stateClass") {{apiData.p_state | stateText}}
    el-form.demo-ruleForm.box_bottom(:model="apiData" ref="ruleForm" label-width="100px")
      <!--quill-editor.box_bottom(v-model="apiData.p_content")-->
      .input-box
        label.input-label
          span.label-text  真实姓名
          el-input.box_ss(v-model="apiData.p_name" placeholder="真实姓名")
        label.input-label
          span.label-text  身份证号或学号
          el-input.box_ss(v-model="apiData.p_prove" placeholder="身份证号或学号")
        label.input-label
          span.label-text  学校
        school.inB.box_ss(:school="apiData.p_school" @change="setSchool")
      .input-box
        el-form-item(label="证件" prop="u_avatar")
          el-upload.avatar-uploader(
          :action="$SERVER.URL + $SERVER.PATH + $SERVER.GET_UPFLIE"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload")
            img.avatar(v-if="apiData.p_image" :src="$SERVER.FILEURL + apiData.p_image")
            i.el-icon-plus.avatar-uploader-icon.el-upload(v-else)
      el-col(:span="24")
        el-button(type="primary" @click="submitForm('ruleForm')") 保存
    .tab-box
      .box_bottom.f_sb
        el-button(type="primary" @click="auditingAlert(id)" plain) 审核
        el-button(type="danger" @click="dels" plain) 批量删除
      el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
        el-table-column(type="selection" width="40" fixed)
        el-table-column(prop="u_name" label="指定人" width="150")
        el-table-column(prop="n_name" label="发布人" width="150")
        el-table-column(prop="n_name" label="审核状态" width="150")
          template(slot-scope="scope")
            span {{ scope.row.p_state | stateText}}
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
    title="认证审核"
    @close="closeProve"
    :visible.sync="bProve"
    width="80%")
      quill-editor(
      v-model="apiProveData.p_content")
      span.dialog-footer(slot="footer")
        el-button(@click="auditing(1)" type="primary") 通过
        el-button(@click="auditing(2)" type="warning") 不通过
    el-dialog(
    title="修改内容"
    @close="closeAlert"
    :visible.sync="bFollow"
    width="80%")
      quill-editor(
      v-model="apiNewsData.n_content")
      span.dialog-footer(slot="footer")
        el-button(@click="closeAlert") 取消
        el-button(@click="submitAlert" type="primary")  确认
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mPageOn from '@/utils/mixin/page-no-create'
  import mDetailOn from '@/utils/mixin/detail-no-watch'
  import school from '@/components/school';

  export default {
    name: "proveDetail",
    mixins: [mPageOn, mDetailOn],
    data() {
      return {
        api: {
          info: 'GET_PROVEINFO',
          upInfo: 'POST_PROVEUPINFO',
          list: 'GET_NEWSLIST',
          del: 'GET_NEWSDEL'
        },
        success: {
          url: 'prove'
        },
        apiData: {
          // p_content: '',
          p_prove: '',
          p_school: '',
        },
        apiNewsData: {
          n_content: '',
          id: '',
        },
        apiProveData: {
          p_content: '',
          id: '',
        },
        bProve: false,
        bFollow: false,
        getApiData: {
          pageSize: 10,
          pageIndex: 1,
          n_type: 2,
          l_id: '',
        },
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.apiData.u_avatar = res.data.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type.indexOf('image') !== -1;
        const isLt2M = file.size / 1024 / 1024 < 2;
        console.log(file,isJPG , isLt2M)

        if (file.type.indexOf('image') === -1) {
          this.$message.error('只能上传图片');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      setSchool(val){
        this.apiData.p_school = val;
      },
      closeProve(){
        this.apiProveData.p_content = '';
        this.apiProveData.id = '';
        this.apiProveData.p_state = ''
      },
      closeAlert(){
        this.apiNewsData.n_content = '';
        this.apiNewsData.id = '';
        this.bFollow = false;
      },
      auditingAlert(id){
        this.bProve = true;
        this.apiProveData.id = id;
      },
      upAlert(id){
        this.bFollow = true;
        if(typeof id !== 'object'){
          this.apiNewsData.id = id;
          this.getListData(id)
        }
      },
      getListData(id){
        this.$api(this.$SERVER.GET_NEWSINFO, {
          params:{
            id
          }
        })
          .then(res => this.apiNewsData.n_content = res.data.n_content)
      },
      auditing(p_state){
        this.apiProveData.p_state = p_state;
        this.$api.post(this.$SERVER.POST_PROVEAUDITING, this.apiProveData)
          .then( res => {
            this.bProve = false
            this.apiData.p_state = p_state
            this.closeProve();
            res.state ? this.$message.success('操作成功') :  this.$message.error(res.mes)
            this.getList();
          })
      },
      submitAlert() {
        console.log(this.apiNewsData)
        this.$api.post(this.$SERVER.POST_NEWSUPINFO, this.apiNewsData)
          .then(res => {
            this.closeAlert();
            res.state ? this.$message.success('操作成功') : this.$message.error(res.mes)
          })
      },
    },
    filters: {
      stateText(state){
        const arr = ['待审核','审核通过','审核不通过']
        return arr[state]
      },
      stateClass(state){
        const arr = ['gr','lv','red']
        return arr[state]
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
    components: {
      school
    }
  }
</script>


