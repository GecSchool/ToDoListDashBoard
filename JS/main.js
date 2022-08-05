class MainSystem{
    constructor(){
        const date = new Date()
        const LOCAL_KEY = 'collectionOfData'
        const DIC_KEY = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
        this.collectionOfData = JSON.parse(localStorage.getItem(LOCAL_KEY)) 
        if(!this.collectionOfData){
            localStorage.setItem(LOCAL_KEY,'{}')
            this.collectionOfData = {}
        }
        if(!this.collectionOfData.hasOwnProperty(DIC_KEY)){
            this.collectionOfData[DIC_KEY] = new ToDoList()
        }
    }
}
class ToDoList{
    constructor(){
        this.ToDoList = []
        this.totalTime = 0
    }
    appendTDL(toDoName,time,state){
        this.ToDoList.push(new ThingToDo(toDoName,time,state))
    }
}
class ThingToDo{
    constructor(toDoName,time,state = 0){
        this.toDoName = toDoName
        this.time = time
        this.state = state
    }
}

