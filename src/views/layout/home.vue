<style lang="scss" scoped>
  .home {
  
  }
</style>

<template lang="pug">
  .home
    quill-editor(
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)")
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "home",
    data(){
      return {
        content: `<p>hello world</p>`,
        editorOption: {}
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    },
    methods: {
      onEditorReady(editor) { // 准备编辑器
      },
      onEditorBlur(){}, // 失去焦点事件
      onEditorFocus(){}, // 获得焦点事件
      onEditorChange(){}, // 内容改变事件
    },
    mounted() {
      console.log('this is current quill instance object', this.myQuillEditor)
    },
    created() {

    },
  }
</script>


