'use strict'

{
// 今回使うid(timer,start stop,reset)をDOM操作で引っ張る
const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

// 変数の宣言
let startTime;
let timeOutId;
let elapsedTime = 0;

// メインの関数
// 今の時間からスタートした時間を引いて描画する関数を10ミリセックループさせる(止める時のためにtimeOutIdをつける)
function countUp(){
  const d = new Date(Date.now() - startTime + elapsedTime);
  const m = String(d.getMinutes()).padStart(2,'0');
  const s = String(d.getSeconds()).padStart(2,'0');
  const ms = String(d.getMilliseconds()).padStart(3,'0');

  timer.textContent = `${m}:${s}.${ms}`;
    timeOutId = setTimeout(() => {
    countUp();
  },10)
}

// スタートする前にボタンがどうなってるか設定する関数(inactiveクラスをつけるか外すか)
function setBtnStateInitial(){
  start.classList.remove('inactive');
  stop.classList.add('inactive');
  reset.classList.add('inactive');
}
// スタートしてる時ボタンがどうなってるか設定する関数(inactiveクラスをつけるか外すか)
function setBtnStateRanning(){
  start.classList.add('inactive');
  stop.classList.remove('inactive');
  reset.classList.add('inactive');
}
// スタート=>ストップ時にボタンがどうなってるか設定する関数(inactiveクラスをつけるか外すか)
function setBtnStateStoped(){
  start.classList.remove('inactive');
  stop.classList.add('inactive');
  reset.classList.remove('inactive');
}

// スタート前のボタン設定にする関数発動
setBtnStateInitial();

// スタートボタンを押したら〜の処理
//   1,スタート=>ストップ時にボタンがどうなってるか設定する関数発動
//   2,スタートした時間を記憶
//   3,メイン関数発動
//   4,ボタンにinactiveクラスがついてたらそもそも実行しないようにする
start.addEventListener('click',() => {
  if(start.classList.contains('inactive') === true){
    return;
  }
  setBtnStateRanning();
  startTime = Date.now();
  countUp();
})
// ストップボタンを押したら〜の処理
//   1,スタートしてる時ボタンがどうなってるか設定する関数
//   2,10ミリセック毎に繰り返していた処理を終える
//   3,経過時間の変数を代入(経過時間 = 経過時間 + 今の時間 - スタートした時間)
//   4,ボタンにinactiveクラスがついてたらそもそも実行しないようにする
stop.addEventListener('click',() => {
  if(stop.classList.contains('inactive') === true){
    return;
  }
  setBtnStateStoped();
  clearTimeout(timeOutId);
  elapsedTime += Date.now() - startTime;

})
// リセットボタンを押したら〜
//   1,スタート=>ストップ時にボタンがどうなってるか設定する関数の発動
//   2,timerの文字を00:00.000に書き換え
//   3,経過時間の変数に0を代入
//   4,ボタンにinactiveクラスがついてたらそもそも実行しないようにする
reset.addEventListener('click',() => {
  if(reset.classList.contains('inactive') === true){
    return;
  }
  setBtnStateInitial();
  timer.textContent = '00:00.000';
  elapsedTime = 0;
})







}