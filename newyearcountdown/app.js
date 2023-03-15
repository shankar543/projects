const hrs  = document.getElementById("hrs") 
const mins  = document.getElementById("mins") 
const days  = document.getElementById("days") 
const secs  = document.getElementById("secs") 
const newyear = '1 jan 2024'
function countDownCalculator(){
    let newyearsecs = new Date(newyear)
    let today = new Date();
    let totalSec = (newyearsecs-today)/1000;
    let daysleft = Math.floor(totalSec/60/60/24)
    let hrsleft = Math.floor(totalSec/60/60%24);
    let minleft = Math.floor(totalSec/60%60);
    let secleft = Math.floor(totalSec%60);
    hrs.innerText  = timeFormatter(hrsleft);
    mins.innerText = timeFormatter(minleft);
    days.innerText = timeFormatter(daysleft);
    secs.innerText = timeFormatter(secleft);
}
setInterval(countDownCalculator,1000)
function timeFormatter(time){
    return time<10?`0${time}`:time
}