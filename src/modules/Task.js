class Task{

    constructor(description){
        this.description=description;
        this.isDone=false;
    }
    toString=()=>{
        return  this.description;
    }
};


export { Task };