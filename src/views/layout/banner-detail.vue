<style lang="scss" scoped>
  $width: 950px;
  $height: 250px;
  .bannerDetail {
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
      width: $width;
      height: $height;
      line-height: $height;
      text-align: center;
    }
    .avatar {
      width: $width;
      height: $height;
      display: block;
    }
  }
</style>

<template lang="pug">
  .bannerDetail
    el-form.demo-ruleForm.box_bottom(:model="apiData" :rules="rules" ref="ruleForm" label-width="100px")
      el-form-item.box_bottom(label="图片" prop="b_image")
        el-upload.avatar-uploader(
        :action="$SERVER.URL + $SERVER.PATH + $SERVER.GET_UPFLIE"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload")
          img.avatar(v-if="apiData.b_image" :src="$SERVER.FILEURL + apiData.b_image")
          i.el-icon-plus.avatar-uploader-icon.el-upload(v-else)
      el-form-item.inB(label="跳转路径" prop="b_url")
        el-input.w(v-model="apiData.b_url")
      el-form-item.inB(label="权重" prop="b_weight")
        el-input.w(v-model="apiData.b_weight" type="number")
      el-form-item.inB(label="状态" prop="b_state")
        el-radio-group(v-model="apiData.b_state")
          el-radio(:label="1") 上架
          el-radio(:label="2") 下架
      el-form-item.box_bottom
        el-button(type="primary" @click="submitForm('ruleForm')") 保存
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mDetail from '@/utils/mixin/detail'

  export default {
    name: "bannerDetail",
    mixins: [mDetail],
    data() {
      return {
        api: {
          info: 'GET_BANNERINFO',
          upInfo: 'POST_BANNERUPINFO',
          add: 'POST_BANNERADD',
        },
        success: {
          url: 'banner'
        },
        apiData: {
          b_image: '',
          b_url: '',
          b_state: 2,
          b_weight: 0,
        },
        rules: {
          b_image: [
            { required: true, message: '请输上传图片', trigger: 'blur' },
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
        this.apiData.b_image = res.data.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type.indexOf('image') !== -1;
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (file.type.indexOf('image') === -1) {
          this.$message.error('只能上传图片');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    },
  }
</script>


