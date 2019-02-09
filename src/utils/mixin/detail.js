export default {
  data(){
    return {
      id: '',
    }
  },
  methods: {
    getInfo(){
      this.$api(this.$SERVER[this.api.info],{
        params: {id : this.id}
      }).then( data => {
        let info = data.data;
        info.id = this.id;
        this.apiData = info
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) this.submit()
      });
    },
    submit(){
      this.id ? this.upInfo() : this.addInfo()
    },
    upInfo(){
      this.apiInfo(this.api.upInfo)
    },
    addInfo(){
      this.apiInfo(this.api.add)
    },
    apiInfo(apiUrl){
      this.$api.post(this.$SERVER[apiUrl], this.apiData)
        .then( data => data.state ? this.thenSubmit('新增') : this.$message.error(data.mes))
    },
    thenSubmit(str){
      this.$message.success(str + '成功');
      this.$router.push('/' + this.success.url)
    },
  },
  watch: {
    $route: {
      handler(to) {
        this.id = to.query.id;
        this.id && this.getInfo()
      },
      immediate: true
    }
  },
}