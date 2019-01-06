<style lang="scss" scoped>
  .user-detail {
  }
</style>

<template lang="pug">
  .user-detail
    el-form.demo-ruleForm.box_bottom(:model="apiData" :rules="rules" ref="ruleForm" label-width="100px")
      el-col(:span="12")
        el-form-item(label="账号" prop="u_account")
          el-input(v-model="apiData.u_account")
      el-col(:span="12")
        el-form-item(label="密码" prop="u_password")
          el-input(v-model="apiData.u_password" type="password")
      el-col(:span="12")
        el-form-item(label="用户名" prop="u_name")
          el-input(v-model="apiData.u_name")
      el-col(:span="12")
        el-form-item(label="手机号码" prop="u_tel")
          el-input(v-model="apiData.u_tel")
      el-col(:span="12")
        el-form-item(label="邮箱" prop="u_mail")
          el-input(v-model="apiData.u_mail")
      el-col(:span="12")
        el-form-item(label="QQ" prop="u_qq")
          el-input(v-model="apiData.u_qq")
      el-col(:span="12")
        el-form-item(label="微信" prop="u_wx")
          el-input(v-model="apiData.u_wx")
      el-col(:span="12")
        el-form-item(label="头像" prop="u_avatar")
          el-input(v-model="apiData.u_avatar")
      el-col(:span="12")
        el-form-item(label="年龄" prop="u_age")
          el-input(v-model="apiData.u_age")
      el-col(:span="12")
        el-form-item(label="学校" prop="u_school")
          el-input(v-model="apiData.u_school")
      el-col(:span="24")
        el-form-item(label="现居地址" prop="u_address")
          el-input(v-model="apiData.u_address")
      el-col(:span="24")
        el-form-item(label="简介" prop="u_introduce")
          el-input(v-model="apiData.u_introduce" type="textarea")
      el-col(:span="24")
        el-form-item(label="是否认证" prop="u_static")
          el-radio-group(v-model="apiData.u_static")
            el-radio(:label="1") 已经认证
            el-radio(:label="0") 尚未认证
      el-col(:span="24")
        el-form-item(label="性别" prop="u_sex")
          el-radio-group(v-model="apiData.u_sex")
            el-radio(:label="1") 男
            el-radio(:label="0") 女
      el-col(:span="24")
        el-form-item
          el-button(type="primary" @click="submitForm('ruleForm')") 保存
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "userDetail",
    data() {
      return {
        id: '',
        apiData: {
          u_account: '',
          u_password: '',
          u_name: '',
          u_tel: '',
          u_mail: '',
          u_qq: '',
          u_wx: '',
          u_avatar: '',
          u_age: '',
          u_sex: 1,
          u_school: '',
          u_address: '',
          u_introduce: '',
          u_static: 0,
        },
        rules: {
          u_account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16个字符', trigger: 'blur' }
          ],
          u_name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16个字符', trigger: 'blur' }
          ],
        },
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      getUserInfo(){
        this.$api(this.$SERVER.GET_USERINFO,{
          params: {id : this.id}
        }).then( data => {
          let info = data.data;
          info.u_password = '';
          this.apiData = info
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) this.id ? this.upUser() : this.addUser()
        });
      },
      upUser() {
        this.$api.post(this.$SERVER.POST_UPUSERINFO,{...this.apiData, id: this.id})
          .then( data => this.thenSubmit('更新'))
      },
      addUser() {
        this.$api.post(this.$SERVER.POST_ADDUSER,this.apiData)
          .then( data => this.thenSubmit('新增'))
      },
      thenSubmit(str){
        this.$message.success(str + '成功');
        this.$router.push('/user')
      }
    },
    created() {
    
    },
    mounted() {

    },
    watch: {
      $route: {
        handler(to) {
          this.id = to.query.id;
          if(this.id) {
            this.getUserInfo()
          } else {
            this.rules.u_password = [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 5, max: 30, message: '长度在 5 到 30个字符', trigger: 'blur' }
            ]
          }
        },
        immediate: true
      }
    }
  }
</script>


