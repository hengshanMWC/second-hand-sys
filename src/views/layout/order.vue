<style lang="scss" scoped>
  .order {
  }
</style>

<template lang="pug">
  .order
    .box_bottom.f_sb
      div
        el-button(type="primary" @click="toAdd" plain) 新增
        el-button(type="primary" @click="search") 搜索
        el-button(type="primary" @click="reset" round) 重置
      el-button(type="danger" @click="dels" plain) 批量删除
    .box_bottom
      el-input.box_ss1(v-model="getApiData.c_title" placeholder="商品名称")
      <!--el-select.box_ss(v-model="getApiData.o_state" clearable placeholder="状态")-->
        <!--el-option(label="所有性别" value="")-->
        <!--el-option(label="男" :value="1")-->
        <!--el-option(label="女" :value="2")-->
        <!--el-option(label="女" :value="3")-->
        <!--el-option(label="女" :value="0")-->
    el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
      el-table-column(type="selection" width="40" fixed)
      el-table-column(prop="c_title" label="商品名称" width="150")
      el-table-column(prop="o_price" label="商品单价" width="100")
      el-table-column(prop="o_num" label="数量" width="60")
      el-table-column(label="订单总价" width="150")
        template(slot-scope="scope")
          span {{scope.row.o_num * scope.row.o_price}}
      el-table-column(prop="o_state" label="状态" width="100")
      el-table-column(prop="up_date" label="更新日期" width="170")
      el-table-column(prop="create_date" label="创建日期" width="170")
      el-table-column(label="操作" width="155" fixed="right")
        template(slot-scope="scope")
          el-button(@click="edit(scope.row._id)" type="primary" size="small") 编辑
          el-button(@click="delAlert(scope.row._id)" type="danger" size="small") 删除
    el-pagination.box_bottom(
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="getApiData.pageIndex + 1"
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
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mPage from '@/utils/mixin/page'
  export default {
    name: "order",
    mixins: [mPage],
    data() {
      return {
        getApiData: {
          c_title: '',
          o_state: '',
        },
        api: {
          list: 'GET_ORDERLIST',
          del: 'GET_ORDERDEL'
        }
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
    }
  }
</script>


