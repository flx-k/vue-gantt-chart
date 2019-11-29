/**
 * 获取两个日期的差值
 * @param {日期A} date1 
 * @param {日期B} date2 
 */
function getDays(date1, date2) {
  var sdate = new Date(date1);
  var now = new Date(date2);
  var days = now.getTime() - sdate.getTime();
  var day = parseInt(days / (1000 * 60 * 60 * 24));
  return day;
}

function getMothDaysMap(date1, date2) {
  var sdate = new Date(date1);
  var now = new Date(date2);
  var sy = sdate.getFullYear();
  var sm = sdate.getMonth() + 1;
  var ny = sdate.getFullYear();
  var nm = sdate.getMonth() + 1;
  let map = {};
  let marr=[];
  let days = 0;
  for (var y = sy; y <= ny; y++) {
    if (y == ny) {
      for (var m = sm; m <= nm; m++) {
        let d = new Date(y, m, 0).getDate();
        days += d
        let k = y + '-' + m;
        map[k] = d
        marr.push(k)
      }
    } else {
      for (var m = sm; m <= 12; m++) {
        let d = new Date(y, m, 0).getDate();
        days += d
        let k = y + '-' + m;
        map[k] = d
        marr.push(k)
      }
    }
  }
  map['days']=days
  return map;
}


export {
  getDays,
  getMothDaysMap
}
