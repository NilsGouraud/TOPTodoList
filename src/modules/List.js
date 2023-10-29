class List{
    constructor(title){
        this.title=title;
        this.tasks=[];
    }
    add=(t)=>{
        this.tasks.push(t);
    }
    remove=(t)=>{
        this.tasks.pop(t);
    }
    toString=()=>{
        return this.tasks.toString();
    }
    getTitle=()=>{
        return this.title
    }
    getTasks=()=>{
        return this.tasks;
    }
    setTitle=(newTitle)=>{
        return this.title=newTitle;
    }
}

export{ List };