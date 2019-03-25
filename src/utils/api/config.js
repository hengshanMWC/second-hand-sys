export default {
  // URL: 'http://mwc.ac.cn:81/',
  // FILEURL: 'http://mwc.ac.cn:81/second-hand',
  URL: 'http://localhost:81/',
  FILEURL: 'http://localhost:81/second-hand',
  // URL: '139.199.88.199:4444',
  PATH: 'second-hand/api/',
  GET_PROVINCELIST: 'common/provinceList',//省份
  GET_CITYLIST: 'common/cityList',//城市
  GET_SCHOOILIST: 'common/schoolList',//学校
  GET_UPFLIE: 'common/upFile',//上传图片

  //用户
  POST_LOGIN: 'user/login',//登录
  GET_ISLOGIN: 'user/isLogin',//检查是否登录
  GET_QUIT: 'user/quit',//退出登录
  GET_CURRENTUSERINFO: 'user/currentInfo',//拿到当前登录人信息
  POST_ADDUSER: 'user/add',//添加用户
  GET_USERLIST: 'user/list',//查询用户列表
  GET_USERINFO: 'user/info',//用户信息
  POST_UPUSERINFO: 'user/upInfo',//更新用户信息
  GET_DELUSER: 'user/del',//删除用户
  //管理员
  GET_SYSFIST: 'sys/list',//管理员列表
  POST_ADDSYS: 'sys/add',//添加用户
  //商品分类
  GET_TYPELIST: 'type/list',//分类列表
  POST_TYPEADD: 'type/add',//添加分类
  GET_TYPEINFO: 'type/info',//分类详情
  POST_TYPEUPINFO: 'type/upInfo',//分类更新
  GET_TYPEDEL: 'type/del',//分类删除
  //商品管理
  GET_COMMODITYLIST: 'commodity/list',//商品列表
  POST_COMMODITYADD: 'commodity/add',//添加商品
  GET_COMMODITYINFO: 'commodity/info',//商品详情
  POST_COMMODITYUPINFO: 'commodity/upInfo',//商品更新
  GET_COMMODITYDEL: 'commodity/del',//商品删除
  //订单管理
  GET_ORDERLIST: 'order/list',//order列表
  POST_ORDERADD: 'order/add',//添加order
  GET_ORDERINFO: 'order/info',//order详情
  POST_ORDERUPINFO: 'order/upInfo',//order更新
  GET_ORDERDEL: 'order/del',//order删除
  //banner
  GET_BANNERLIST: 'banner/list',//banner列表
  POST_BANNERADD: 'banner/add',//添加banner
  GET_BANNERINFO: 'banner/info',//banner详情
  POST_BANNERUPINFO: 'banner/upInfo',//banner更新
  GET_BANNERDEL: 'banner/del',//banner删除
  //认证
  GET_PROVELIST: 'prove/list',//认证列表
  POST_PROVEADD: 'prove/add',//添加认证
  GET_PROVEINFO: 'prove/info',//认证详情
  POST_PROVEUPINFO: 'prove/upInfo',//认证更新
  GET_PROVEDEL: 'prove/del',//认证删除
  POST_PROVEAUDITING: 'prove/auditing',//审核认证
  //反馈
  GET_FEEDBACKLIST: 'feedback/list',//反馈列表
  POST_FEEDBACKADD: 'feedback/add',//添加反馈
  GET_FEEDBACKINFO: 'feedback/info',//反馈详情
  POST_FEEDBACKUPINFO: 'feedback/upInfo',//反馈更新
  GET_FEEDBACKDEL: 'feedback/del',//反馈删除
  POST_FEEDBACKREPLY: 'feedback/reply',//问题回复
  //消息
  GET_NEWSLIST: 'news/list',//消息列表
  POST_NEWSADD: 'news/add',//添加消息
  GET_NEWSINFO: 'news/info',//消息详情
  POST_NEWSUPINFO: 'news/upInfo',//消息更新
  GET_NEWSDEL: 'news/del',//消息删除
}