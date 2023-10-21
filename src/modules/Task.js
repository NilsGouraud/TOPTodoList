class Task{
    constructor(description,date){
        this.description=description;
        this.date=date;
    }

    toString=()=>{
        return  this.description+" "+this.date;
    }
};


export { Task };