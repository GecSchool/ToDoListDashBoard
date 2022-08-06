const addButton = document.querySelector('.addTDButton')
const ToDoNameInput = document.querySelector('.ToDoNameInput')
const HIDDEN_CLASSNAME = 'hidden'

const appendToDo = (tdl,toDoName,time,state)=>{
    tdl.ToDoList.push(new ThingToDo(toDoName,time,state))
}
const deleteToDo = (targetId)=>{
    systemHandler.recentTDL.ToDoList = systemHandler.recentTDL.ToDoList.filter((toDo)=>{
        console.log(toDo.id !== parseInt(targetId))
        return toDo.id !== parseInt(targetId)
    })
    console.log(systemHandler.recentTDL.ToDoList)
}
const addToDo = (event)=>{
    const toggleHidden = ()=>{
        console.log(1)
        addButton.classList.toggle(HIDDEN_CLASSNAME)
        ToDoNameInput.classList.toggle(HIDDEN_CLASSNAME)
    }
    const detectClickOutside = (event)=>{
        if(!ToDoNameInput.contains(event.target)&&!addButton.contains(event.target)){
            toggleHidden()
            document.removeEventListener('click',detectClickOutside)
        }
    }
    const enterPress = (event)=>{
        if(event.key === 'Enter'){
            event.preventDefault()
            // TD name is submited
            toggleHidden()
            const recentTDL = systemHandler.recentTDL
            appendToDo(recentTDL,ToDoNameInput.value,0)
            paintTD(recentTDL.ToDoList[recentTDL.ToDoList.length - 1])
            ToDoNameInput.value = ''
            document.removeEventListener('click',detectClickOutside)
            ToDoNameInput.removeEventListener('keypress',enterPress)
        }
    }
    document.addEventListener('click',detectClickOutside)
    toggleHidden()
    ToDoNameInput.addEventListener('keypress',enterPress)
    
}
addButton.addEventListener('click',addToDo)

// const startTD = ()=>{

// }
const completeTD = (event)=>{
    if('SPAN' === event.target.tagName){
        event.target.parentElement.classList.toggle('complete')
        systemHandler.recentTDL.ToDoList.forEach(element => {
            if(element.id==event.target.parentElement.id){
                if(element.state){
                    element.state = false
                } else{
                    element.state = true
                }
            }
        });
    } else{
        event.target.classList.toggle('complete')
        systemHandler.recentTDL.ToDoList.forEach(element => {
            if(element.id==event.target.id){
                if(element.state){
                    element.state = false
                } else{
                    element.state = true
                }
            }
        });
    }
}
const deleteTD = (event)=>{
    console.log(event.target.parentElement.id)
    deleteToDo(event.target.parentElement.id)
    event.target.parentElement.remove()
}

const paintTD = (ToDo)=>{
    // paint ToDoThing just one line
    const list = document.createElement('li')
    list.id = ToDo.id
    if(ToDo.state){
        list.classList.add('complete')
    }
    // list.addEventListener('click',startTD)
    list.addEventListener('dblclick',completeTD)    
    const button = document.createElement('button')
    button.addEventListener('click',deleteTD)
    const toDoName = document.createElement('span')
    toDoName.innerText = ToDo.toDoName
    const toDoTime = document.createElement('span')
    toDoTime.innerText = ToDo.time
    list.appendChild(toDoName)
    list.appendChild(toDoTime)
    list.appendChild(button)
    const ToDoList = document.querySelector('.ToDoList>ul')
    ToDoList.appendChild(list)
    // append child in html
}