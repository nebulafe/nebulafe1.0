/**
 * 格式化日期
 * @param  {[type]} date    [description]
 * @param  {[type]} pattern [description]
 * @return {[type]}         [description]
 */
Date.format = function (date, pattern) {
  if (!date) {
    date = new Date;
  }else{
    if(!isDate(date)){
      date = new Date(date);
    }
  }
  pattern = pattern || 'yyyy-MM-dd';
  var y = date.getFullYear().toString();
  var o = {
    M: date.getMonth() + 1, //month
    d: date.getDate(), //day
    h: date.getHours(), //hour
    m: date.getMinutes(), //minute
    s: date.getSeconds() //second
  };
  pattern = pattern.replace(/(y+)/ig, function(a, b) {
    return y.substr(4 - Math.min(4, b.length));
  });
  for (var i in o) {
    pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function(a, b) {
      return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
    });
  }
  return pattern;
}

global.isEmail = function(str){
  var r=/^[a-zA-Z0-9]+([._\-][a-zA-Z0-9]+)*@([a-zA-Z0-9]+([._\-][a-zA-Z0-9]+))+$/;
  if(!str.length){
      return false;
  }
  return r.test(str)
}
/**
 * 获取日期
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
global.getDate = function(date){
  return Date.format(date);
}
/**
 * 获取日期和时间
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
global.getDateTime = function(date){
  return Date.format(date, "yyyy-MM-dd hh:mm:ss");
}

function toQueryPair(key, value) {
  if (typeof value == 'undefined') {
    return key;
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}

global.toQueryString = function(obj) {
  var ret = [];
  for (var key in obj) {
    key = encodeURIComponent(key);
    var values = obj[key];
    if (values && values.constructor == Array) { //数组
      var queryValues = [];
      for (var i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    } else { //字符串
      ret.push(toQueryPair(key, values));
    }
  }
  return ret.join('&');
}

global.navLinks =  [
  { label: '首页',    key: 'home',    href: '/' },
  { label: '课程',    key: 'course',    href: '/course' },
  { label: '合作机构',    key: 'partner',   href: '/partner' }
];