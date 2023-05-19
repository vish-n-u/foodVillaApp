import { useState, useEffect, useLayoutEffect } from "react";

function convertToHMS(val, setHr, setMin, setSec) {
  let hr =
    Math.floor(val / 3600) > 9
      ? Math.floor(val / 3600)
      : "0" + Math.floor(val / 3600);
  val %= 3600;
  let min =
    Math.floor(val / 60) > 9
      ? Math.floor(val / 60)
      : "0" + Math.floor(val / 60);
  val %= 60;
  let sec = val > 9 ? val : "0" + val;
  console.log(hr, min, sec);
  setHr(hr);
  setMin(min);
  setSec(sec);
}

const Timer = () => {}

function setVal(
  hr,
  setHr,
  min,
  setMin,
  sec,
  setSec,
  increase,
  data,
  isTimerStopped
) {
  if (isTimerStopped != true && typeof Number(data) == "number") {
    setHr("00");
    setMin("00");
    setSec("00");
    return;
  }
  if (increase == true) {
    if (hr[0] == 0) {
      let newVal = hr + min + sec;
      newVal = newVal.substring(1, newVal.length) + data;
      setHr(newVal[0] + newVal[1]);
      setMin(newVal[2] + newVal[3]);
      setSec(newVal[4] + newVal[5]);
    } else {
      return;
    }
  } else {
    if (Number(hr) > 0 || Number(min) > 0 || Number(sec) > 0) {
      console.log("reached");
      let newVal = hr + min + sec;
      newVal = "0" + newVal.substring(0, newVal.length - 1);
      setHr(newVal[0] + newVal[1]);
      setMin(newVal[2] + newVal[3]);
      setSec(newVal[4] + newVal[5]);
    } else {
      return;
    }
  }
}

export default Timer;
