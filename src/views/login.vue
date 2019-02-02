<style lang="scss" scoped>
  .login {
    .title {
      font-size: 36px;
      text-align: center;
      margin-top: 55px;
      letter-spacing: 4px;
      .list-enter-active {
        transition: all .45s;
      }
      .list-enter {
        opacity: 0;
      }
    }
    .bottom {
      margin-bottom: 30px;
    }
    .box {
      border: thin solid #ddd;
      border-radius: 10px;
      padding: 7%;
      .button {
        width: 100%;
      }
    }
  }
</style>

<template lang="pug">
  .login
    el-col(:span="8" :offset="8")
      el-col.title.bottom
        transition-group.title(tag="h1",name="list")
          span(v-for="(val) in title" :key="`title${val}`") {{val}}
      el-col.box
        el-col
          el-input.bottom(v-model="apiData.u_account" placeholder="请输入账号")
          el-input.bottom(v-model="apiData.u_password" placeholder="请输入密码" type="password")
        el-col
          el-button.button(type="primary" @click="login") 登录
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "login",
    data() {
      return {
        apiData:{
          u_account: '',
          u_password: '',
        },
        title: [],
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      login(){
        this.$api.post(this.$SERVER.POST_LOGIN,this.apiData)
          .then( data => {
              if(!data.state) {
                this.$message.error(data.mes);
                return
              }
              if(data.data.power) {
                this.$message.success('登录成功');
                this.setUserInfo(data.data)
                this.$router.push('/')
              } else {
                this.$message.error('普通用户不能登录！');
              }
          })
        // this.$api(this.$SERVER.GET_QUIT)
        //   .then( res => res.state && this.$api.post(this.$SERVER.POST_LOGIN,this.apiData))
        //   .then( data => {
        //     if(!data.state) {
        //       this.$message.error(data.mes);
        //       return
        //     }
        //     if(data.data.power) {
        //       this.$message.success('登录成功');
        //       this.setUserInfo(data.data)
        //       this.$router.push('/')
        //     } else {
        //       this.$message.error('普通用户不能登录！');
        //     }
        //   })
      },
      startTitle(text){
        if(text.length){
          text = text.split('');
          let word = text.shift();
          this.title.push(word);
          setTimeout(this.startTitle,150,text.join(''));
        }
      }
    },
    created() {
    },
    mounted() {
      this.startTitle('校园二手交易后台')
    }
  }
</script>


