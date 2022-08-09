const makeCalendar = (date) => {
    // const Date = new Date(date)
    const today = new Date()
    const curYear = new Date(date).getFullYear()
    const curMonth = new Date(date).getMonth()
    const preLastDay = new Date(curYear, curMonth, 1).getDay()
    const curLastDay = new Date(curYear,curMonth + 1,0).getDate()
    
    document.querySelector('.dateBoard').innerHTML = ''

    for(let i = 0;i < preLastDay;i++){
        const tmpHtml = document.createElement('div')
        tmpHtml.classList.add('noColor')
        document.querySelector('.dateBoard').appendChild(tmpHtml)
    }
    
    for(let i = 1; i < today.getDate();i++){
        const key = `${curYear}${curMonth}${i}`
        const div = document.createElement('div')
        console.log(key)
        if(typeof systemHandler.collectionOfData[key] !== 'undefined'){
            const tmpSpan = document.createElement('span')
            tmpSpan.innerHTML = i
            div.appendChild(tmpSpan)
            for(let j = 0;j < systemHandler.collectionOfData[key].ToDoList.length;j++){
                const span = document.createElement('span')
                if(systemHandler.collectionOfData[key].ToDoList[j].state){
                    span.classList.add('complete')
                }
                span.innerText = systemHandler.collectionOfData[key].ToDoList[j].toDoName
                div.appendChild(span)
            }
        } else{
            const span = document.createElement('span')
            span.innerText = i
            div.appendChild(span)
        }
        document.querySelector('.dateBoard').appendChild(div)
    }
    if(curMonth === today.getMonth()&&curYear === today.getFullYear()){
        // recentTDL
        const div= document.createElement('div')
        div.classList.add('Today')
        const tmpSpan = document.createElement('span')
        tmpSpan.innerText = today.getDate()
        div.appendChild(tmpSpan)
        for(let i = 0;i < systemHandler.recentTDL.ToDoList.length;i++){
            const span = document.createElement('span')
            span.innerHTML = systemHandler.recentTDL.ToDoList[i].toDoName
            div.appendChild(span)
        }
        document.querySelector('.dateBoard').appendChild(div)
    } else{
        const div = document.createElement('div')
        const key = `${curYear}${curMonth}${today.getDate()}`
        for(let i = 0;i < systemHandler.collectionOfData[key].ToDoList.length;i++){
            const span = document.createElement('span')
            if(systemHandler.collectionOfData[key].ToDoList[i].state){
                span.classList.add('complete')
            }
            span.innerHTML = systemHandler.collectionOfData[key].ToDoList[i].toDoName
            div.appendChild(span)
        }
        document.querySelector('.dateBoard').appendChild(div)
    }
    for(let i = today.getDate() + 1;i < curLastDay;i++){
        const key = `${curYear}${curMonth}${i}`
        const div = document.createElement('div')
        if(typeof systemHandler.collectionOfData[key] !== 'undefined'){
            const tmpSpan = document.createElement('span')
            tmpSpan.innerHTML = i
            div.appendChild(tmpSpan)
            for(let j = 0;j < systemHandler.collectionOfData[key].ToDoList.length;j++){
                const span = document.createElement('span')
                if(systemHandler.collectionOfData[key].ToDoList[j].state){
                    span.className.add('complete')
                }
                span.innerText = systemHandler.collectionOfData[key].ToDoList[j].toDoName
                div.appendChild(span)
            }
        } else{
            const span = document.createElement('span')
            span.innerHTML = i
            div.appendChild(span)            
        }
        document.querySelector('.dateBoard').appendChild(div)
    }
    
    let nextDay = (preLastDay + curLastDay) % 7
    nextDay = nextDay ? nextDay : 7

    for(let i = nextDay;i < 7;i++){
        const tmpHtml = document.createElement('div')
        tmpHtml.classList.add('noColor')
        document.querySelector('.dateBoard').appendChild(tmpHtml)
    }
}

window.onload = () => {
    const date = new Date()
   
    makeCalendar(date)
    
    // 이전달 이동
    // document.querySelector(`.prevDay`).onclick = () => {
    //   makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
    // }
    
    // // 다음달 이동
    // document.querySelector(`.nextDay`).onclick = () => {
    //   makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
    // }
};