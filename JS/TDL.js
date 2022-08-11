const addButton = document.querySelector('.addTDButton')
const ToDoNameInput = document.querySelector('.ToDoNameInput')
const HIDDEN_CLASSNAME = 'hidden'

const appendToDo = (tdl,toDoName,time,state)=>{
    tdl.ToDoList.push(new ThingToDo(toDoName,time,state))
    localStorage.setItem('recentTDL',JSON.stringify(tdl))
}
const deleteToDo = (targetId)=>{
    systemHandler.recentTDL.ToDoList = systemHandler.recentTDL.ToDoList.filter((toDo)=>{
        return toDo.id !== targetId
    })
    localStorage.setItem('recentTDL',JSON.stringify(systemHandler.recentTDL))
}
const addToDo = (event)=>{
    const toggleHidden = ()=>{
        addButton.classList.toggle(HIDDEN_CLASSNAME)
        ToDoNameInput.classList.toggle(HIDDEN_CLASSNAME)
    }
    const detectClickOutside = (event)=>{
        if(!ToDoNameInput.contains(event.target)&&!addButton.contains(event.target)){
            toggleHidden()
            ToDoNameInput.value = ''
            document.removeEventListener('click',detectClickOutside)
            ToDoNameInput.removeEventListener('keypress',enterPress)
        }
    }
    const enterPress = (event)=>{
        if(event.key === 'Enter'){
            event.preventDefault()
            toggleHidden()
            const recentTDL = systemHandler.recentTDL
            appendToDo(recentTDL,ToDoNameInput.value,0)
            paintTD(recentTDL.ToDoList[recentTDL.ToDoList.length - 1])
            ToDoNameInput.value = ''
            updateCircleGraph()
            document.removeEventListener('click',detectClickOutside)
            ToDoNameInput.removeEventListener('keypress',enterPress)
        }
    }
    document.addEventListener('click',detectClickOutside)
    toggleHidden()
    ToDoNameInput.focus()
    ToDoNameInput.addEventListener('keypress',enterPress)
}
addButton.addEventListener('click',addToDo)
const completeTD = (event)=>{
    if('SPAN' === event.target.tagName){
        event.target.parentElement.classList.toggle('complete')
        if(event.target.parentElement.classList.contains('on')){
            event.target.parentElement.classList.remove('on')
            systemHandler.recentTDL.onId = ''
        }
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
        if(event.target.classList.contains('on')){
            event.target.classList.remove('on')
            systemHandler.recentTDL.onId = ''
        }
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
    makeCalendar(new Date())
    updateCircleGraph()
    localStorage.setItem('recentTDL',JSON.stringify(systemHandler.recentTDL))
}
const deleteTD = (event)=>{
    deleteToDo(event.target.parentElement.id)
    event.target.parentElement.remove()
    updateCircleGraph()
}
const onTD = (event)=>{
    const ToDoList = document.querySelectorAll('.ToDoList>ul>li')
    if('SPAN' === event.target.tagName){
        if(!event.target.parentElement.classList.contains('complete')){
            if(systemHandler.recentTDL.onId){
                if(systemHandler.recentTDL.onId === event.target.parentElement.id){
                    systemHandler.recentTDL.onId = ''
                    // off 
                }
                else{
                    ToDoList.forEach((element)=>{
                        if(element.id === systemHandler.recentTDL.onId){
                            element.classList.remove('on')
                        }
                    })
                    systemHandler.recentTDL.onId = event.target.parentElement.id
                    // on
                }
            } else{
                systemHandler.recentTDL.onId = event.target.parentElement.id
                // on
            }
            event.target.parentElement.classList.toggle('on')
        }
    } else{
        if(!event.target.classList.contains('complete')){
            if(systemHandler.recentTDL.onId){
                if(systemHandler.recentTDL.onId == event.target.id){
                    systemHandler.recentTDL.onId = ''    
                }
                else{
                    ToDoList.forEach((element)=>{
                        if(element.id === systemHandler.recentTDL.onId){
                            element.classList.remove('on')
                        }
                    })
                    systemHandler.recentTDL.onId = event.target.id
                }
            } else{
                systemHandler.recentTDL.onId = event.target.id
            }
            event.target.classList.toggle('on')
        }
    }
}

const paintTD = (ToDo)=>{
    // paint ToDoThing just one line
    const list = document.createElement('li')
    list.id = ToDo.id
    list.classList.add('TD')
    list.classList.add('blockShadow')
    if(ToDo.state){
        list.classList.add('complete')
    }
    if(ToDo.id === systemHandler.recentTDL.onId){
        list.classList.add('on')
    }
    list.addEventListener('click',onTD)
    list.addEventListener('dblclick',completeTD)    
    const button = document.createElement('span')
    button.innerHTML = 'close'
    button.classList.add('material-symbols-outlined')
    button.addEventListener('click',deleteTD)
    const toDoName = document.createElement('span')
    toDoName.innerText = ToDo.toDoName
    toDoName.classList.add('name')
    const toDoTime = document.createElement('span')
    toDoTime.classList.add('time')
    const secondsToHms = (seconds) => {
        seconds = Number(seconds);
        const hour = Math.floor(seconds / 3600);
        const min = Math.floor(seconds % 3600 / 60);
        const sec = Math.floor(seconds % 3600 % 60);
        return `${hour < 10 ?'0' + hour: hour}:${min<10 ? '0' + min: min}:${sec < 10 ? '0' + sec : sec}`; 
    }
    toDoTime.innerText = secondsToHms(ToDo.time)
    list.appendChild(toDoName)
    list.appendChild(toDoTime)
    list.appendChild(button)
    const ToDoList = document.querySelector('.ToDoList>ul')
    ToDoList.appendChild(list)
}

const systemStart = ()=>{
    systemHandler.recentTDL.ToDoList.forEach( element =>{
        paintTD(element)
    })
    updateCircleGraph()
}
systemStart()