// 유저가 값을 입력한다
// +버튼을 클릭하면 할일이 추가된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이생긴다
// 1.check 버튼을 클릭하는 순간 true false
// 2.true 이면 끝난걸로 간주하고 밑줄보여주기
// 3.false 이면 안끝난걸로 간주하고 그대로

// 유저가 delete 버튼을 누르면 할일이 삭제 된다
// 
// 진행중 끝남 탭을 누르면 under-line 이 이동한다
// 끝남탭은 끝난것만 진행중탭은 진행중인 것만 나온다
// 전체 탭을 누르면 전체 아이템으로 돌아온다


let userInput = document.getElementById("user-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".tab-items div")
let underLine = document.getElementById("under-line")
let isComplete = false;
let taskList = [];
let mode = "all";
let filterList = [];
let list = [];

for (let i =0; i <tabs.length; i++){
    tabs[i].addEventListener("click",function(e){filter(e)})
};


addButton.addEventListener("click",addTask);
userInput.addEventListener("keypress",function(e){
    if(e.key ==="Enter"){
        e.preventDefault();
        document.getElementById("add-button").click();
    }
})


function addTask () {
    let taskValue = userInput.value;
    if (taskValue ==="") return alert ("할일을 입력해주세요");
    let task = {
        content: taskValue,
        isComplete: false,
        id : generateRandomID(),
    };
    taskList.push(task);
    console.log(taskList);
    userInput.value ="";
    render();
}

function render (){
    let result ="";
    list = [];
    if(mode ==="all"){
        list = taskList;
    }else{
        list = filterList;
    } 
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            result += `<div class="task task-done">
                            <span>${list[i].content}</span>
                            <div class="button-box">
                                <button onclick="toggleDone('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>`;
        }else{
            result += `<div class="task">
                            <span>${list[i].content}</span>
                            <div class="button-box">
                                <button onclick="toggleDone('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>`;
        }
       
    }

    document.getElementById("task-board").innerHTML = result;
}


function toggleDone(id){
    for(let i = 0;i <taskList.length; i++){
        if(taskList[i].id === id){
            taskList[i].isComplete = !taskList[i].isComplete
            break;
        }
    }
    filter();
}

function deleteTask(id){
  for(let i =0; i < taskList.length; i++){
        if(taskList[i].id === id){
            taskList.splice(i,1);
            break;
        }
    }  
    filter();
}

function filter(e){
    if(e){
        mode = e.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) +"px";
    }

    filterList = [];
    if(mode === "ongoing"){
        for(let i =0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
    }else if( mode === "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
    }
    render();
}









function generateRandomID(){
    return "_" + Math.random().toString(36).substr(2, 16);
}