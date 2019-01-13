export default {
  URL: 'http://localhost:3000/',
  // URL: '139.199.88.199:4444',
  PATH: 'second-hand/api/',
  GET_PROVINCELIST: 'common/provinceList',//省份
  GET_CITYLIST: 'common/cityList',//城市
  GET_SCHOOILIST: 'common/schoolList',//学校
  GET_UPIMG: 'common/upImg',//上传图片

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
}