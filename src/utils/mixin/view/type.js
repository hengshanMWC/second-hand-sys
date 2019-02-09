export default {
  data(){
    return {
      c_type: [],
      c_type2: [],
    }
  },
  created() {
    this.getTypeList();
  },
  methods: {
    getTypeList(){
      this.$api(this.$SERVER.GET_TYPELIST)
        .then( res => {
          this.c_type = res.data.list
          this.getType2()
        })
    },
    getType2(){
      let c_type = this.apiData ? this.apiData.c_type : this.getApiData.c_type;
      if(c_type === '') {
        this.c_type2 = [];
        return
      }
      this.c_type2 = this.c_type.find( obj => obj.t_name == c_type).t_types
    }
  }
}