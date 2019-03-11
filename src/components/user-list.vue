<style lang="scss" scoped>
  .user-list {
  }
</style>

<template lang="pug">
  .user-list
    el-select.sel_box(
    v-model="val"
    filterable
    remote
    reserve-keyword
    placeholder="请输入用户账号"
    :remote-method="getUserList"
    :loading="userLoading"
    @change="setVal")
      el-option(
      v-for="item in list"
      :key="item._id"
      :label="item.u_account"
      :value="item.u_account")
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "userList",
    props: ['user'],
    data() {
      return {
        userLoading: false,
        list: [],
        val: '',
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      getUserList(content){
        if(content !== '') {
          this.userLoading = true;
          this.$api(this.$SERVER.GET_USERLIST, {
            params: {
              u_account: content,
              pageSize: 10,
              pageIndex: 1,
            }
          }).then( res => {
            this.userLoading = false
            this.list = res.data.list
          })
        }
      },
      setVal(e){
        this.$emit('change', e)
      }
    },
    watch: {
      user(newVal){
        this.val = newVal;
      }
    }
  }
</script>


