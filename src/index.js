import { Task } from "./modules/Task";
import { List } from "./modules/List";
import { createPopper } from "@popperjs/core";

const formCreateTask=document.getElementById("formCreateTask");
const listsDisplay=document.getElementById("lists");
const overlay=document.getElementById("overlay");
const formCreateList=document.getElementById("formCreateList");
const buttonCreateNewList=document.getElementById("buttonCreateNewList");
const buttonAddTask=document.getElementById("buttonAddTask");
const inputTask=document.getElementById("inputTask")
buttonCreateNewList.onclick=()=>{
    formCreateList.classList.add("active");
    overlay.classList.add("active");
}
buttonAddTask.onclick=()=>{
    let form=document.getElementById("description");
    let taskToAdd=form.value
    if(taskToAdd!=""){
        const currentList=getCurrentList();
        currentList.add(new Task(taskToAdd));
        getCurrentTasksDom().innerHTML="";
        getTasksDom(currentList).forEach(element => {
            getCurrentTasksDom().append(element);
        });
        form.value="";
        return;
    }
    alert("the task field is empty")

}
overlay.onclick=()=>{
    formCreateList.classList.remove("active");
    overlay.classList.remove("active");
    const currentList=document.getElementsByClassName("currentList");
    currentList[0].classList.remove("currentList");
    formCreateTask.remove();
}


const lists=[];
const listOne=new List("list one");
const listTwo=new List("list two");

const taskOne=new Task("nothing to do yet")
const taskTwo=new Task("same")
listOne.add(taskOne);
listOne.add(taskTwo);
lists.push(listOne);
lists.push(listTwo);


const createLists=()=>{
    listsDisplay.innerHTML="";
    for(const l of lists){
        let divList=document.createElement("div");
        divList.classList.add("list");
        makeSelectable(divList);
        const tasks=document.createElement("div");
        tasks.classList.add("tasks");
        getTasksDom(l).forEach(element => {
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
        if(document.querySelector(".currentList #formCreateTask")==null){
            const tasks=list.getElementsByClassName("tasks");
            tasks[0].append(formCreateTask)
        }
    }
}
const showTitle=(list)=>{
    const listTitle=document.createElement("div");
    listTitle.classList.add("title");
    listTitle.textContent=list.title
    return listTitle;
}
const getTasksDom=(list)=>{
    const tasks=[];
    let i=1;
    for(const task of list.tasks){
        let t=document.createElement("p");
        let checkbox=document.createElement("input");
        
        checkbox.type="checkbox";

        checkbox.onclick=()=>{
            list.remove(task);
            t.remove();
        }
        t.append(checkbox,task.description);
        tasks.push(t);
    }
    return tasks;
}

const getCurrentList=()=>{
    const domListTitle=document.querySelector(".currentList .title");
    const currentTitle=domListTitle.textContent;
    const currentList=lists.filter(list=>list.title==currentTitle);
    return currentList[0];
}
const getCurrentTasksDom=()=>{
    const domTasks=document.querySelector(".currentList .tasks");
    return domTasks;
}

createLists();