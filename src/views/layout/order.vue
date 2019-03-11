<style lang="scss" scoped>
  .order {
  }
</style>

<template lang="pug">
  .order
    .box_bottom.f_sb
      div
        <!--el-button(type="primary" @click="toAdd" plain) 新增-->
        el-button(type="primary" @click="search") 搜索
        el-button(type="primary" @click="reset" round) 重置
      el-button(type="danger" @click="dels" plain) 批量删除
    .box_bottom
      el-input.box_ss1(v-model="getApiData.c_title" placeholder="商品名称")
      el-select.box_ss(v-model="getApiData.o_state" clearable placeholder="状态")
        el-option(label="所有状态" value="")
        el-option(label="未发货" :value="1")
        el-option(label="发货" :value="2")
        el-option(label="交易成功" :value="3")
        el-option(label="订单失效" :value="0")
    el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
      el-table-column(type="selection" width="40" fixed)
      el-table-column(prop="c_title" label="商品名称" width="150")
      el-table-column(prop="s_name" label="卖家" width="150")
      el-table-column(prop="b_name" label="买家" width="150")
      el-table-column(prop="o_price" label="商品单价" width="100")
        template(slot-scope="scope")
          span {{scope.row.o_price | branch}}
      el-table-column(prop="o_num" label="数量" width="60")
      el-table-column(label="订单总价" width="150")
        template(slot-scope="scope")
          span {{scope.row.o_num * scope.row.o_price | branch}}
      el-table-column(prop="o_state" label="状态" width="100")
        template(slot-scope="scope")
          span {{scope.row.o_state | stateText}}
      el-table-column(prop="up_date" label="更新日期" width="170")
      el-table-column(prop="create_date" label="创建日期" width="170")
      el-table-column(label="操作" width="170" fixed="right")
        template(slot-scope="scope")
          el-button(@click="editAlert(scope.row._id)" type="primary" size="small") 修改状态
          <!--el-button(@click="edit(scope.row._id)" type="primary" size="small") 编辑-->
          el-button(@click="delAlert(scope.row._id)" type="danger" size="small") 删除
    el-pagination.box_bottom(
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="getApiData.pageIndex"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="getApiData.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="dataList.count")
    el-dialog(
    title="删除"
    :visible.sync="bAlert"
    width="25%")
      span 是否删除该用户
      span.dialog-footer(slot="footer")
        el-button(@click="closeDelAlert") 取消
        el-button(@click="del" type="primary")  确认
    el-dialog(
    title="修改状态"
    :visible.sync="bState"
    width="25%")
      el-select.box_ss(v-model="o_state" clearable placeholder="状态")
        el-option(label="未发货" :value="1")
        el-option(label="发货" :value="2")
        el-option(label="交易成功" :value="3")
        el-option(label="订单失效" :value="0")
      span.dialog-footer(slot="footer")
        el-button(@click="closeStateAlert") 取消
        el-button(@click="editState" type="primary")  确认
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mPage from '@/utils/mixin/page'
  export default {
    name: "order",
    mixins: [mPage],
    data() {
      return {
        bState: false,
        selId: '',
        o_state: '',
        getApiData: {
          c_title: '',
          o_state: '',
        },
        api: {
          list: 'GET_ORDERLIST',
          del: 'GET_ORDERDEL'
        },
        to: 'orderDetail',
      }
    },
    filters: {
      stateText(state){
        if(state === undefined || state === '') return
        let arr = ['订单失效', '未发货', '发货', '交易成功']
        return arr[state]
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
      // state(){
      //   let id = this.selId
      //   if(id === '') {
      //     this.o_state = ''
      //     return
      //   }
      //   let list = this.dataList.list
      //   this.o_state = list[list.findIndex(obj => obj._id === id)].o_state
      //   return this.o_state
      // }
    },
    methods: {
      ...mapMutations([]),
      editAlert(id){
        let list = this.dataList.list
        this.selId = id
        this.o_state = list[list.findIndex(obj => obj._id === id)].o_state
        this.bState = true;
      },
      closeStateAlert(){
        this.selId = ''
        this.o_state = ''
        this.bState = false;
      },
      editState(){
        this.$api.post(this.$SERVER.POST_ORDERUPINFO, {
          id: this.selId,
          o_state: this.o_state
        })
          .then( res => {
            this.closeStateAlert();
            this.getList()
            let state,text
            if(res.state){
              state = 'success'
              text = '成功'
            } else {
              state = 'error'
              text = '失败'
            }
            this.$message[state]('修改' + text)
          })
      }
    }
  }
</script>


