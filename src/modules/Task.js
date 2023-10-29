class Task{

    constructor(description){
        this.description=description;
        this.isDone=false;
    }
    
    getDescription=()=>{
        return  this.description;
    }
};


export { Task };