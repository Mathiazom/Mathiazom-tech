function refreshTime(){

  /* CURRENT TIME */
  var time = new Date();
  var date = time.getDate();
  var year = time.getFullYear();
  var month = time.getMonth()+1;
  var day = time.getDay();

  /* START DATE */
  var startDate = new Date();
  startDate.setDate(1);
  startDate.setMonth(0);
  startDate.setFullYear(year);
  var startDay = startDate.getDay();
  var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var startDayName = dayNames[startDate.getDay()];


  /* DATE VISUALIZER */
  function dateVisualizer(timeius){
    if(timeius < 10){
      timeius = "0"+timeius;
      return timeius;
    }else{
      return timeius;
    }
  }
  var dateVis = dateVisualizer(date)
  var monthVis = dateVisualizer(month)

  /* LEAPY CHECK */

  if((year/4)% 1 != 0){
    var leapyear = false;
  }else{
    var leapyear = true;
  }

  /* MONTH LENGTH */
  var monthLenReg = [31,28,31,30,31,30,31,31,30,31,30,31];
  var monthLenLeap = [31,29,31,30,31,30,31,31,30,31,30,31];

  if(!leapyear){
    var monthLen = monthLenReg[month-1];
  }else{
    var monthLen = monthLenLeap[month-1];
  }

  /* DAY OF THE YEAR */

  var dayOYear = date;

  if(!leapyear){
    for(i=0;i<month-1;i++){
      dayOYear = dayOYear + monthLenReg[i];
    }
  }else{
    for(i=0;i<month-1;i++){
      dayOYear = dayOYear + monthLenLeap[i];
    }
  }

  /* DAYS LEFT */

  if(!leapyear){
    var daysLeft = 365-dayOYear;
  }else{
    var daysLeft = 366-dayOYear;
  }

  /* START WEEK */

  var startWeek = 1;

  if(startDay == 6 && (((year-1)/4)% 1 == 0) || startDay == 5){
    startWeek = 53;
  }else if(startDay == 6 || startDay == 0){
    startWeek = 52;
  }

  /* EXTRA DAYS */
  var extraDays = 0;
  var dayAdjust = [7,1,2,3,4,5,6];

  if(startDay > 4 || startDay == 0){
    extraDays = extraDays + (8-dayAdjust[startDay]);
  }else{
    extraDays = extraDays - dayAdjust[startDay] + 1;
  }

  /* WEEK OF THE YEAR */

  var weekOYear = ((dayOYear - extraDays) + (7-dayAdjust[day]))/7;
  if(weekOYear < 1){
    weekOYear = startWeek;
  }

  /* PRINTING PRESS
  console.log("------------------------------------------------------------------------");
  console.log(time);
  console.log("Week of year: " + weekOYear);
  console.log("Day of year: " + dayOYear);
  console.log("Start day this year: " + startDayName);
  console.log("Start week this year: " + startWeek);
  console.log("Extra days for this year: " + extraDays);
  console.log("Leapyear: " + leapyear);*/

  /* LA MILLISECONDE */

  var milliSince = time.getTime();
  var milliSinceComS = Math.floor(milliSince/1000);
  var milliSinceComH = Math.floor(milliSinceComS/3600);
  var milliSinceComD = Math.floor(milliSinceComH/24);
  var milliSinceComY = Math.floor(milliSinceComD/365)

  /* DOMINATOR */
  document.getElementById('datepara').innerHTML = dateVis + "." + monthVis + "." + year;
  document.getElementById('weekpara').innerHTML = weekOYear;
  document.getElementById('daypara').innerHTML = dayOYear;
  document.getElementById('daysLeftpara').innerHTML = daysLeft;
  document.getElementById('milliSincepara').innerHTML = milliSince;
  document.getElementById('milliSinceCom').innerHTML = milliSinceComS + " seconds" + "<br/>" + milliSinceComH + " hours" + "<br/>" + milliSinceComD + " days" + "<br/>" + milliSinceComY + " years";
}

function init(){

  document.getElementById('loadDiv').style.display = "none";

  /* PAINTER */
  var pagePaints = ["#007ac1","green","#ef6c00","#b71c1c"];
  var infoPage = 0;
  var infoPages = document.getElementsByClassName('inner');
  var infoPageNum = infoPages.length;
  /* PAGE SLIDE */
  infoPages[0].style.display = "block";
  document.body.style.background = pagePaints[infoPage];
  document.getElementById('pageFieldR').addEventListener('click',function(){
    pageSlider(1,1);
  });

  document.getElementById('pageFieldL').addEventListener('click',function(){
    pageSlider(-1,0);
  });

  function pageSlider(pageDir,limAdj){
    if(infoPage < infoPageNum - limAdj){
      infoPages[infoPage].style.display = "none";
      infoPage = infoPage + pageDir;
      if(infoPage < 0){
        infoPage = infoPageNum-1;
      }
      infoPages[infoPage].style.display = "block";
      document.body.style.background = pagePaints[infoPage];
    }else{
      infoPages[infoPage].style.display = "none";
      infoPage = 0;
      infoPages[infoPage].style.display = "block";
      document.body.style.background = pagePaints[infoPage];
    }
  }

  setInterval(function(){
    refreshTime();
  },100);
}

window.onload = function(){
  init();
};
