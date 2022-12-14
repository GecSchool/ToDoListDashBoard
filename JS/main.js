class MainHander{
    constructor(){
        const date = new Date()
        const LOCAL_COLLECTION_KEY = 'collectionOfData'
        const LOCAL_RECENT_KEY = 'recentTDL'
        const DIC_KEY = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
        this.collectionOfData = JSON.parse(localStorage.getItem(LOCAL_COLLECTION_KEY)) 
        this.recentTDL = JSON.parse(localStorage.getItem(LOCAL_RECENT_KEY))
        if(!this.recentTDL){
            this.collectionOfData = {}
            this.recentTDL = new ToDoList()
            localStorage.setItem(LOCAL_COLLECTION_KEY,'{}')
            localStorage.setItem(LOCAL_RECENT_KEY,JSON.stringify(this.recentTDL))
        }
        if(this.recentTDL.id !== DIC_KEY){
            this.collectionOfData[this.recentTDL.id] = this.recentTDL
            this.recentTDL = new ToDoList()
            localStorage.setItem(LOCAL_COLLECTION_KEY,JSON.stringify(this.collectionOfData))
            localStorage.setItem(LOCAL_RECENT_KEY,JSON.stringify(this.recentTDL))
        }
    }
}
class ToDoList{
    constructor(){
        const date = new Date()
        this.ToDoList = []
        // this.totalTime = 0 //sec
        this.minutesEachHour = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        this.id = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
        this.onId = ''
        this.memo = ''
    }
}
class ThingToDo{
    constructor(toDoName,time,state = false){
        this.toDoName = toDoName
        this.time = time
        this.state = state
        this.id = String(Date.now())
    }
}

const systemHandler = new MainHander()
