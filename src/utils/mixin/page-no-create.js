export default {
  data(){
    return {
      dataList: {
        count: 1,
        list: []
      },
      getApiData: {
        pageSize: 10,
        pageIndex: 1,
      },
      delApiData: [],
      delId: '',
      bAlert: false,
    }
  },
  methods: {
    search(){
      this.getApiData.pageIndex = 1
      this.getList();
    },
    getList(){
      this.$api(this.$SERVER[this.api.list], {
        params:this.getApiData
      })
        .then(data => this.dataList = data.data)
    },
    //分页
    handleSizeChange(val) {
      this.getApiData.pageSize = val ;
      this.getList();
    },
    handleCurrentChange(val) {
      this.getApiData.pageIndex = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.delApiData = val.map( val => val._id)
    },
    //重置
    reset(){
      Object.keys(this.getApiData).forEach( val => {
        if(val !== 'pageSize' && val!== 'pageIndex') this.getApiData[val] = '';
      })
      this.getList();
    },
    editShow(){

    },
    //删除
    delAlert(id){
      this.delId = id;
      this.bAlert = true
    },
    closeDelAlert(){
      this.delId = '';
      this.bAlert = false
    },
    del(e){
      let key = typeof e === "object" ? 'delId' : e
      let id = this[key];
      this.$api(`${this.$SERVER[this.api.del]}?id=${id}`)
        .then( data => {
          this.$message.success('删除成功')
          this.bAlert = false;
          this.getList();
        })
    },
    dels() {
      this.$confirm(`确定要批量删除${this.delApiData.length}条信息？`, '警告！', {
        confirmButtonText: '批量删除',
        cancelButtonText: '取消删除',
        type: 'error'
      }).then(() => this.del('delApiData'))
        .catch( () => {})
      console.log(this.delApiData)
    },
    toAdd(){
      this.$router.push('/' + this.to)
    },
    edit(id){
      this.$router.push(`/${this.to}?id=` + id)
    },
  },
  filters: {
    getStateText(state){
      return state == 2 ? '上架' : '下架'
    }
  }
}