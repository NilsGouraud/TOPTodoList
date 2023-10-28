class List{
    constructor(name){
        this.name=name;
        this.tasks=new Array;
    }
    add=(t)=>{
        this.tasks.push(t);
    }
}

export{ List };