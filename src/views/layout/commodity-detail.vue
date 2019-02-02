<style lang="scss" scoped>
  .commodityDetail {
    .avatar {
      width: 100%;
    }
  }
</style>

<template lang="pug">
  .commodityDetail
    el-form.demo-ruleForm.box_bottom(:model="apiData" :rules="rules" ref="ruleForm" label-width="100px")
      .box_bottom
        el-form-item(label="商品名字" prop="c_title")
          el-input(v-model="apiData.c_title")
      .box_bottom
        el-form-item(label="交易地址" prop="c_address")
          el-input(v-model="apiData.c_address")
      .box_bottom
        el-form-item(label="商品预览" prop="c_images")
          el-upload.avatar-uploader(
          :action="$SERVER.URL + $SERVER.PATH + $SERVER.GET_UPFLIE"
          list-type="picture-card"
          :file-list="filePath"
          :on-success="upSuccess"
          :on-preview="upPre"
          :before-upload="beforeAvatarUpload")
            i.el-icon-plus.avatar-uploader-icon.el-upload
          el-dialog(:visible.sync="dialogVisible")
            img.avatar(v-for="img in apiData.c_images" :src="$SERVER.FILEURL + img")
        .box_bottom
          el-form-item.inB(label="价格" prop="c_price")
            el-input.input(v-model="apiData.c_price" type="number")
          el-form-item.inB(label="数量" prop="c_num")
            el-input-number(v-model="apiData.c_num" @change="setNum" :min="1")
          el-form-item.inB(label="商品类型" prop="c_type")
            el-select(@change="getType2" v-model="apiData.c_type" placeholder="请选择")
              el-option(
              v-for="item in c_type"
              :key="item._id"
              :value="item.t_name")
          el-form-item.inB(label="二级类型" prop="c_type2")
            el-select(v-model="apiData.c_type2" placeholder="请选择")
              el-option(
              v-for="item in c_type2"
              :key="item"
              :value="item")
        .box_bottom
          el-form-item.inB(prop="c_state")
            el-radio(v-model="apiData.c_state" :label="1") 上架
            el-radio(v-model="apiData.c_state" :label="2") 下架
      el-col(:span="24")
        el-form-item
          el-button(type="primary" @click="submitForm('ruleForm')") 保存
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import { newJson } from '@/utils/js/index'
  export default {
    name: "commodityDetail",
    data() {
      return {
        dialogVisible: false,
        dialogImageUrl: '',
        id: '',
        c_type: [],
        c_type2: [],
        apiData: {
          u_id: '',
          c_title: '',
          c_type: '',
          c_type2: '',
          c_images: [],
          c_price: '',
          c_address: '',
          c_num: 1,
          c_state: 1,
        },
        schoolList: [],
        rules: {
          c_title: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 1, max: 16, message: '长度在 2 到 16个字符', trigger: 'blur' }
          ],
          c_type: [
            { required: true, message: '请选择商品类型', trigger: 'change' },
          ],
          c_type2: [
            { required: true, message: '请选择二级类型', trigger: 'change' },
          ],
          c_price: [
            { required: true, message: '请输入价格', trigger: 'blur'},
            { pattern: /^[^0]/,  message: '不能为0', trigger: 'blur' }
          ],
        },
      }
    },
    computed: {
      ...mapState(['userInfo']),
      ...mapGetters([]),
      filePath() {
        return this.apiData.c_images.map( file => ({url: this.$SERVER.FILEURL + file}))
      }
    },
    methods: {
      ...mapMutations([]),
      upSuccess(response, file, fileList) {
        this.apiData.c_images.push(response.data.url);
      },
      upPre(file){
        this.dialogImageUrl = this.$SERVER.FILEURL + file.response.data.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type.indexOf('image') !== -1;
        const isLt2M = file.size / 1024 / 1024 < 2;
        let len = 4
        let lenB = this.apiData.c_images.length < len
        if(!lenB) {
          this.$message.error(`最多只能上传${len}张`);
        }
        if (file.type.indexOf('image') === -1) {
          this.$message.error('只能上传图片');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return lenB && isJPG && isLt2M;
      },
      setNum(val){
        this.apiData.c_num = val;
        
      },
      getInfo(){
        this.$api(this.$SERVER.GET_COMMODITYINFO,{
          params: {id : this.id}
        }).then( data => {
          let info = data.data;
          this.apiData = info
          this.apiData.c_price /= 100
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) this.id ? this.upInfo() : this.addInfo()
        });
      },
      upInfo() {
        let apiData = newJson(this.apiData)
        apiData.c_price *= 100
        this.$api.post(this.$SERVER.POST_COMMODITYUPINFO,{...apiData, c_id: this.id})
          .then( data => data.state ? this.thenSubmit('编辑') : this.$message.error(data.mes))
      },
      addInfo() {
        let apiData = newJson(this.apiData)
        apiData.c_price *= 100
        this.$api.post(this.$SERVER.POST_COMMODITYADD, apiData)
          .then( data => data.state ? this.thenSubmit('新增') : this.$message.error(data.mes))
      },
      thenSubmit(str){
        this.$message.success(str + '成功');
        this.$router.push('/commodity')
      },
      getTypeList(){
        this.$api(this.$SERVER.GET_TYPELIST)
          .then( res => {
            this.c_type = res.data.list
            this.getType2()
          })
      },
      getType2(){
        let c_type = this.apiData.c_type;
        console.log(c_type)
        if(c_type === '') {
          this.c_type2 = [];
          return
        }
        this.c_type2 = this.c_type.find( obj => obj.t_name == c_type).t_types
      }
    },
    created() {
      this.getTypeList();
    },
    watch: {
      $route: {
        handler(to) {
          this.id = to.query.id;
          if(this.id) {
            this.getInfo()
          } else {
            this.apiData.u_id = this.userInfo._id
          }
        },
        immediate: true
      }
    },
  }
</script>


