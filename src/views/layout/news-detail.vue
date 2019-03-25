<style lang="scss" scoped>
  .newsDetail {
  }
</style>

<template lang="pug">
  .newsDetail
    el-form.demo-ruleForm.box_bottom(:model="apiData" ref="ruleForm" label-width="100px")
      template(v-if="!id")
        el-form-item.inB(prop="n_type")
          el-radio(v-model="apiData.n_type" :label="0") 官方公告
          el-radio(v-model="apiData.n_type" :label="1") 个人信息
        el-form-item.inB(label="指定人" prop="u_id" v-show="apiData.n_type === 1")
          user-list(@change="setUser" :user="apiData.n_account")
      template(v-else)
        .box_bottom
          span 消息类型：
          el-input.w(v-model="n_type" disabled)
      quill-editor.box_bottom(v-model="apiData.n_content")
      el-col(:span="24")
        el-button(type="primary" @click="submitForm('ruleForm')") 保存
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import { newJson } from '@/utils/js/index'
  import userList from '@/components/user-list'
  import mDetail from '@/utils/mixin/detail'
  export default {
    name: "newsDetail",
    mixins: [mDetail],
    data() {
      return {
        userList: [],
        userLoading: false,
        apiData: {
          n_type: 0,
          n_content: '',
          n_account: '',
        },
        api: {
          info: 'GET_NEWSINFO',
          upInfo: 'POST_NEWSUPINFO',
          add: 'POST_NEWSADD',
        },
        success: {
          url: 'news'
        },
      }
    },
    computed: {
      ...mapState(['']),
      ...mapGetters([]),
      // n_type:{
      //   get(){
      //     const arr = [
      //       '公告', '个人消息','认证', '问题反馈', '商品',
      //     ]
      //     return arr[this.apiData.n_type]
      //   },
      //   set(...a){
      //     console.log(...a)
      //   }
      // },
      n_type(){
        const arr = [
          '官方公告', '个人消息','认证消息', '问题反馈','订单消息', '商品留言', '反馈回复', '订单评价',
        ]
        return arr[this.apiData.n_type]
      }
    },
    methods: {
      ...mapMutations([]),
      setUser(val){
        this.apiData.n_account = val;
      },
    },
    created(){
    
    },
    components: {
      userList
    }
  }
</script>


