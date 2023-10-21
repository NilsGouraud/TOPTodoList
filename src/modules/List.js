class List{
    constructor(name){
        this.name=name;
        this.tasks=[];
    }
    add=(t)=>{
        this.tasks.push(t);
        return t;
    }
}

export{ List };