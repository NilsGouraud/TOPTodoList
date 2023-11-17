import { Task } from "./modules/Task";
import { List } from "./modules/List";

const formCreateTask=document.getElementById("formCreateTask");
const listsDisplay=document.getElementById("lists");
const overlay=document.getElementById("overlay");
const formCreateList=document.getElementById("formCreateList");
const buttonCreateNewList=document.getElementById("buttonCreateNewList");
const buttonAddToLists=document.getElementById("buttonAddToLists");
const buttonAddTask=document.getElementById("buttonAddTask");
const inputTask=document.getElementById("inputTask");

buttonCreateNewList.onclick=()=>{
    formCreateList.classList.add("active");
    overlay.classList.add("active");
}
buttonAddToLists.onclick=()=>{
    let listName=document.getElementById("inputTask").value;
    lists.push(new List(listName));
    createLists();
    localStorage.setItem("lists",JSON.stringify(lists));
    formCreateList.classList.remove("active");
    overlay.classList.remove("active");
    
}
buttonAddTask.onclick=()=>{
    let form=document.getElementById("description");
    let taskToAdd=form.value;
    console.log(taskToAdd);
    if(taskToAdd!=""){
        const currentList=getCurrentListFromDom();
        currentList.add(new Task(taskToAdd));
        getTasksDom().innerHTML="";
        createTasksDom(currentList).forEach(element => {
            getTasksDom().append(element);
        });
        form.value="";
        localStorage.setItem("lists",JSON.stringify(lists));
        return;
    }
    console.log(taskToAdd);
    alert("the task field is empty")
}

overlay.onclick=()=>{
    formCreateList.classList.remove("active");
    overlay.classList.remove("active");
    const currentList=document.getElementsByClassName("currentList");
    currentList[0].classList.remove("currentList");
    formCreateTask.remove();
}


let lists=[];
if(localStorage.getItem("lists")!=null){
    console.log(localStorage.getItem("lists"));
    JSON.parse(localStorage.getItem("lists")).forEach(stuff=>{
        let tasks=stuff.tasks;
        let list=new List(stuff.title);
        tasks.forEach(task=>{
            list.add(task);
        });
        lists.push(list);
        
        console.log(list)
    });
    console.log(JSON.parse(localStorage.getItem("lists")));
}
const listOne=new List("list one");
const listTwo=new List("list two");

const taskOne=new Task("nothing to do yet")
const taskTwo=new Task("same")

const createLists=()=>{
    listsDisplay.innerHTML="";
    for(const l of lists){
        let divList=document.createElement("div");
        divList.classList.add("list");
        makeSelectable(divList);
        const tasks=document.createElement("div");
        tasks.classList.add("tasks");
        createTasksDom(l).forEach(element => {
            tasks.append(element)
        });
        divList.append(showTitle(l),tasks);
        listsDisplay.append(divList);
    }
}

const makeSelectable=(list)=>{
    list.onclick=()=>{
        list.classList.add("currentList"); 
        overlay.classList.add("active");
        if(document.querySelector(".currentList")==null){
            overlay.classList.remove("active");
        }
        if(document.querySelector(".currentList #formCreateTask")==null){
            const tasks=list.getElementsByClassName("tasks");
            tasks[0].append(formCreateTask)
        }
    }
}
const showTitle=(list)=>{
    const listTitle=document.createElement("div");
    listTitle.classList.add("title");
    
    const dummy=document.createElement("div");
    dummy.id="dummy";
    const text=document.createElement("p");
    const bin=document.createElement("div");
    bin.id="bin";
    bin.onclick=()=>{
        if(confirm("are you sure you want to delete the list '"+list.title+"'?")){
            lists.splice(lists.indexOf(list));
            localStorage.setItem("lists",JSON.stringify(lists));
            createLists();
            overlay.classList.remove("active");
        };
        
        
    }
    text.textContent=list.title
    listTitle.append(dummy,text,bin);
    return listTitle;
}
const createTasksDom=(list)=>{
    const thisVeryList=list;
    const tasks=[];
    for(const task of list.tasks){
        let t=document.createElement("p");
        let checkbox=document.createElement("input");
        t.onclick=()=>{
            //console.log(thisVeryList.tasks);
        }
        checkbox.type="checkbox";
        checkbox.onclick=()=>{
            const index=list.tasks.indexOf(task);
            list.tasks.splice(index,1);
            //getCurrentListFromDom().splice(index,1);
            t.remove();
            console.log(getCurrentListFromDom().tasks);
            localStorage.setItem("lists",JSON.stringify(lists));
        }
        t.append(checkbox,task.description);
        tasks.push(t);
    }
    return tasks;
}

const getCurrentListFromDom=()=>{
    const domListTitle=document.querySelector(".currentList .title");
    const currentTitle=domListTitle.textContent;
    const currentList=lists.filter(list=>list.title==currentTitle);
    return currentList[0];
}
const getTasksDom=()=>{
    const domTasks=document.querySelector(".currentList .tasks");
    return domTasks;
}
createLists();
localStorage.setItem("lists",JSON.stringify(lists));