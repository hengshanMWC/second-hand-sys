<style lang="scss" scoped>
  .home {
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
  .home
    el-upload.avatar-uploader(
    :action="$SERVER.URL + $SERVER.PATH + $SERVER.GET_UPFLIE"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload")
      img.avatar(v-if="imageUrl" :src="imageUrl")
      i.el-icon-plus.avatar-uploader-icon.el-upload(v-else)
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "home",
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(res,file)
        this.imageUrl = this.$SERVER.FILEURL + res.data.url
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
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    created() {

    },
    mounted() {
    }
  }
</script>


