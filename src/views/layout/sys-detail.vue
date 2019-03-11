<style lang="scss" scoped>
  .sys-detail {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
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
  }
</style>

<template lang="pug">
  .sys-detail
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
        el-form-item(label="年龄" prop="u_age")
          el-input(v-model="apiData.u_age")
        el-form-item(label="学校" prop="u_school")
          school(:school="apiData.u_school" @change="setSchool")
      el-col(:span="12")
        el-form-item(label="头像" prop="u_avatar")
          el-upload.avatar-uploader(
          :action="$SERVER.URL + $SERVER.PATH + $SERVER.GET_UPFLIE"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload")
            img.avatar(v-if="apiData.u_avatar" :src="$SERVER.FILEURL + apiData.u_avatar")
            i.el-icon-plus.avatar-uploader-icon.el-upload(v-else)
      el-col(:span="6")
        el-form-item(label="省份" prop="u_province")
          province(:province="apiData.u_province" :provinces="provinceList" @change="setCityList")
      el-col(:span="6")
        el-form-item(label="城市" prop="u_city")
          el-select(v-model="apiData.u_city")
            el-option(
            v-for="item in cityList"
            :key="item"
            :label="item"
            :value="item")
      el-col(:span="12")
        el-form-item(label="现居地址" prop="u_address")
          el-input(v-model="apiData.u_address")
      el-col(:span="24")
        el-form-item(label="简介" prop="u_introduce")
          el-input(v-model="apiData.u_introduce" type="textarea")
      el-col(:span="24")
        el-form-item(label="是否认证" prop="u_static")
          el-radio-group(v-model="apiData.u_static")
            el-radio(:label="true") 已经认证
            el-radio(:label="false") 尚未认证
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
  import address from '@/utils/mixin/address'
  import province from '@/components/province';
  import school from '@/components/school';
  export default {
    name: "sysDetail",
    mixins: [address],
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
          u_province: '',
          u_city: '',
          u_static: false,
        },
        rules: {
          u_account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 1, max: 16, message: '长度在 1 到 16个字符', trigger: 'blur' }
          ],
          u_name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 16, message: '长度在 1 到 16个字符', trigger: 'blur' }
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
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getUserInfo(){
        this.$api(this.$SERVER.GET_USERINFO,{
          params: {id : this.id}
        }).then( data => {
          console.log(data)
          let info = data.data;
          info.u_password = '';
          this.apiData = info
          this.getCityList()
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) this.id ? this.upUser() : this.addUser()
        });
      },
      upUser() {
        this.$api.post(this.$SERVER.POST_UPUSERINFO,{...this.apiData, id: this.id})
          .then( data => data.state ? this.thenSubmit('编辑') : this.$message.error(data.mes))
      },
      addUser() {
        this.$api.post(this.$SERVER.POST_ADDSYS,this.apiData)
          .then( data => data.state ? this.thenSubmit('新增') : this.$message.error(data.mes))
      },
      thenSubmit(str){
        this.$message.success(str + '成功');
        this.$router.push('/sys')
      },
      setSchool(val){
        this.apiData.u_school = val;
      }
    },
    created() {
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
    },
    components: {
      province,
      school
    }
  }
</script>



