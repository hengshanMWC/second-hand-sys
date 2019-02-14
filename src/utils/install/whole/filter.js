export default {
  fSex(sex, def = '未知'){
    let arr = ['女', '男']
    try{
      return arr[sex]
    } catch {
      return def
    }
  },
  formatTime(date = new Date(), format = 0, slice = '-') {
    if (typeof date === 'string' || typeof date === 'number') date = new Date(date)
    const repair = num => num < 10 ? '0' + num : num;
    const aFn = [
      () => date.getFullYear(),
      () => repair(date.getMonth() + 1),
      () => repair(date.getDate()),
      () => repair(date.getHours()),
      () => repair(date.getMinutes()),
      () => repair(date.getSeconds()),
    ]
    const styles = [
      slice,
      slice,
      ' ',
      ':',
      ':',
      ''
    ]
    function oFn() {
      let str = '';
      Array.isArray(format) ?
        aFn.slice(format[0], format[1]).forEach((fn, i, arr) => str += arr.length - 1 > i ? fn() + styles[format[0] + i] : fn()) :
        aFn.slice(format).forEach((fn, i) => str += (fn() + styles[i]))
      return str;
    }
    return oFn();
  },
  branch(price, yf){
    price /= 100
    if (yf){
      yf /= 100
      price += yf
    }
    return isNaN(price) ? '数据加载' : price.toFixed(2)
  },
}
