<style lang="scss" scoped>
  .typeDetail {
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .box_bottom {
      display: block;
    }
    .text {
      width: 400px
    }
  }
</style>

<template lang="pug">
  .typeDetail
    .box_bottom
      .box_bottom
        el-input.w(
        placeholder="请输入分类名称"
        v-model="apiData.t_name"
        clearable)
        el-input.wl(
        type="number"
        placeholder="请输入权重"
        v-model="apiData.t_weight"
        clearable)
      el-input.text.box_bottom(
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="apiData.t_text")
      .box_bottom
        el-tag(
        :key="tag"
        v-for="tag in apiData.t_types"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)") {{tag}}
        el-input(
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm")
        el-button(v-else class="button-new-tag" size="small" @click="showInput") + New type2
      el-button(type="primary" @click="submit") 保存
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mDetail from '@/utils/mixin/detail'
  export default {
    name: "typeDetail",
    mixins: [mDetail],
    data() {
      return {
        api: {
          info: 'GET_TYPEINFO',
          upInfo: 'POST_TYPEUPINFO',
          add: 'POST_TYPEADD',
        },
        success: {
          url: 'type'
        },
        apiData: {
          t_name: '',
          t_text: '',
          t_types: [],
          t_weight: 0,
        },
        inputVisible: false,
        inputValue: '',
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      handleClose(tag) {
        this.apiData.t_types.splice(this.apiData.t_types.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.apiData.t_types.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      
    },
  }
</script>


