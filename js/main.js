'use strict'

{
  var timer = document.getElementById('timer');
  var min = document.getElementById('min');
  var sec = document.getElementById('sec');
  var reset = document.getElementById('reset');
  var start = document.getElementById('start');
  var img1 = document.getElementById('ten_minutes');
  var img2 = document.getElementById('one_minute');
  var img3 = document.getElementById('ten_seconds');
  var img4 = document.getElementById('one_second');
  var img5 = document.getElementById('m_hundred');
  var img6 = document.getElementById('m_ten');
  var img7 = document.getElementById('m_one');

  var startTime; //スタートを押したときの時間
  var timeLeft; //残り時間
  var timeToCountDown = 0; //設定時間
  var timerId;
  var isRunning = false;

  function make_tag(basename){
    return "images/" + basename + ".png"
  }

  function split_number(num){
    var ten;
    var one;
    ten = Math.floor(num / 10);
    one = num % 10;
    return [ten, one];
  }

  function split_number3(num){
    var hundred;
    var ten;
    var one;
    hundred = Math.floor(num / 100);
    ten = Math.floor(num / 10);
    one = num % 10;
    return [hundred, ten, one];
  }

  // 表示させるための関数
  function updateTimer(t){
    var d = new Date(t);
    var m = split_number(d.getMinutes());
    var s = split_number(d.getSeconds());
    var ms = split_number3(d.getMilliseconds());
    img1.src = make_tag(m[0]);
    img2.src = make_tag(m[1]);
    img3.src = make_tag(s[0]);
    img4.src = make_tag(s[1]);
    img5.src = make_tag(ms[0]);
    img6.src = make_tag(ms[1]);
    img7.src = make_tag(ms[2]);
  }


  function countDown(){
    timerId = setTimeout(function(){
      timeLeft = timeToCountDown - (Date.now() - startTime);
      if (timeLeft < 0){
        isRunning = false;
        start.textContent = 'Start';
        clearTimeout(timerId);
        timeLeft = 0;
        timeToCountDown = 0;
        updateTimer(timeLeft);
        return;
      }
      updateTimer(timeLeft);
      countDown();
    }, 10);
  }


  start.addEventListener('click', function(){
    if (isRunning === false){
      isRunning = true;
      start.textContent = 'Stop';
      startTime = Date.now();
      countDown();
    }else{
      isRunning = false;
      start.textContent = 'Start';
      timeToCountDown = timeLeft;
      clearTimeout(timerId);
    }
  });

  min.addEventListener('click', function(){
    if (isRunning === true ){
      return;
    }
    timeToCountDown += 60 * 1000;
    if( timeToCountDown >= 60 * 60 * 1000){
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  sec.addEventListener('click', function(){
    if (isRunning === true ){
      return;
    }
    timeToCountDown += 1000;
    if( timeToCountDown >= 60 * 60 * 1000){
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  reset.addEventListener('click', function(){
    timeToCountDown = 0;
    updateTimer(timeToCountDown);
  });


}