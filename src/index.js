import { Task } from "./modules/Task";
import { List } from "./modules/List";


console.log("sup dude?")
document.querySelector("div").textContent="????";

const lists=[];
const overlay=document.getElementById("overlay");
overlay.onclick=()=>{
    currentList.classList.remove("active");
    overlay.classList.remove("active");

}
const currentList=document.getElementById("currentList");
const buttonAddTask=document.getElementById("buttonAddTask");
buttonAddTask.onclick=()=>{

}
const dummyList=new List("list two");
lists.push(dummyList);


const createDomTask=(e)=>{
    let frameTask=document.createElement("div");
        frameTask.classList.add("task")


        let listElementName=document.createElement("p");
        listElementName.textContent=e.description;

        let listElementDate=document.createElement("p");
        listElementDate.textContent=e.date;

        
        frameTask.append(listElementName,listElementDate);

        return frameTask;
    }

const createDOMCurrentList=(list)=>{
    const currentTasks=document.getElementById("currentTasks");
    currentTasks.innerHTML="";
    for(const t of list.tasks){
        let elementToAppend=createDomTask(t);
        currentTasks.append(elementToAppend);
    }
    currentList.classList.add("active");
    overlay.classList.add("active");
}
const createDomSingleList=(list)=>{
    const frameList=document.createElement("div");
    frameList.textContent=list.name;
    frameList.classList.add("list");

    

    frameList.onclick=()=>createDOMCurrentList(list);

    return frameList;
}
const createDomMultipleLists=(lists)=>{
    const domAllLists=document.createElement("div");
    for(const list in lists){
        let domSingleList=createDomSingleList(List);
        domAllLists.append(domSingleList);
    }
    return domAllLists;

}

const dummyTask=new Task("it's blank","I have yet to choose the date");
dummyList.add(dummyTask);

const toDisplay=createDomMultipleLists(lists);

document.getElementById("lists").append(toDisplay);