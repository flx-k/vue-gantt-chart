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
    
}


export{
    getDays,getMothDaysMap
}

