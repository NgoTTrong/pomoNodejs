const selection = document.querySelector('.selection');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const startButton = document.querySelector('.startButton');
const resetButton = document.querySelector('.resetButton');
const activity = document.querySelector('.activity');
const addTask = document.querySelector('.addTask');
const pomodoro = document.querySelector('.pomodoro');
const short = document.querySelector('.short');
const long = document.querySelector('.long');
const innerTask = document.querySelector('.innerTask');
const listTask = document.querySelector('.listTask');
const deleteTask = document.querySelectorAll('.delete');


let minutesDefault = 25;
let secondsDefault = 0;

let minutesTimer;
let secondsTimer;


function setStatus(status){
    if (status == "Pomodoro"){
        pomodoro.classList.add('active');
        minutesDefault = 25;
        secondsDefault = "00";
        if (short.classList.contains('active')){
            short.classList.remove('active');
        }
        if (long.classList.contains('active')){
            long.classList.remove('active');
        }
    }else if (status == "shortBreak"){
        short.classList.add('active');
        minutesDefault = 5;
        secondsDefault = "00";
        if (pomodoro.classList.contains('active')){
            pomodoro.classList.remove('active');
        }
        if (long.classList.contains('active')){
            long.classList.remove('active');
        }

    }else{
        long.classList.add('active');
        minutesDefault = 10;
        secondsDefault = "00";
        if (short.classList.contains('active')){
            short.classList.remove('active');
        }
        if (pomodoro.classList.contains('active')){
            pomodoro.classList.remove('active');
        }
    }
    clearInterval(minutesTimer);
    clearInterval(secondsTimer);
    startButton.innerText = "Start";
    minutes.innerText = minutesDefault;
    seconds.innerText = secondsDefault;
    activity.innerText = "Time to focus!";
}
let currentStatus = "Pomodoro";
setStatus(currentStatus);
pomodoro.addEventListener('click',()=>{
    currentStatus = "Pomodoro";
    setStatus(currentStatus);
})
short.addEventListener('click',()=>{
    currentStatus = "shortBreak";
    setStatus(currentStatus);
})
long.addEventListener('click',()=>{
    currentStatus = "longBreak";
    setStatus(currentStatus);
})
startButton.onclick = function(){
     if (this.innerHTML == "Start"){
        this.innerHTML = "Pause";
        --minutesDefault;
        secondsDefault = 59;
        minutes.innerText = minutesDefault;
        seconds.innerText = secondsDefault;
        runTime();
    }else if(this.innerHTML == "Pause"){
        this.innerHTML = "Resume";
        clearInterval(minutesTimer);
        clearInterval(secondsTimer);
    }else{
        this.innerHTML = "Pause";
        runTime();
    }
}
resetButton.onclick = function(){
    setStatus(currentStatus);
}
let runTime = function(){

    minutesTimer = setInterval(function minutesRun(){
        --minutesDefault;
        minutes.innerText = minutesDefault;
    }, 1000*60);
    secondsTimer = setInterval(function secondsRun(){
        --secondsDefault;
        seconds.innerText = secondsDefault;
        if (secondsDefault<=0){
            if (minutesDefault<=0){
                clearInterval(minutesTimer);
                clearInterval(secondsTimer);
                if (currentStatus == "Pomodoro"){
                    activity.innerText = "Time to break <3";
                }else{
                    activity.innerText = "Time to work <3";
                }
            }
            secondsDefault = 60;
        }
    },1000);
}
addTask.onclick = function(){
    innerTask.classList.remove('visible');
}

innerTask.addEventListener("keydown",(e)=>{
    if (e.code === 'Enter'){
        const task = document.createElement('div');
        task.classList.add('task');
        task.innerHTML = `<input type="checkbox">
                        <span class="work">        ${innerTask.value}</span>
                        <span class="delete">
                            <i class="fas fa-trash-alt"></i>
                        </span>`;
        listTask.appendChild(task);
        task.onclick = function(e){
            if(e.target.closest('.delete')){
                listTask.removeChild(task);
            }
        }
        innerTask.value = '';
    }
})