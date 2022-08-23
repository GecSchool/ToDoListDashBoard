/*
    @copyright Dchool
    Source Description 
    If you input date(dataType===Date) paint calendar
*/
const makeCalendar = (date) => {
    const today = new Date()
    const curYear = new Date(date).getFullYear()
    const curMonth = new Date(date).getMonth()
    const preLastDay = new Date(curYear, curMonth, 1).getDay()
    const curLastDay = new Date(curYear,curMonth + 1,0).getDate()
    
    document.querySelector('.calendarTitle').innerHTML = `${curYear}.  ${curMonth+1}`
    document.querySelector('.dateBoard').innerHTML = ''
    for(let i = 0;i < preLastDay;i++){
        // append previous month day(must be empty) 
        const tmpHtml = document.createElement('div')
        tmpHtml.classList.add('noColor')
        document.querySelector('.dateBoard').appendChild(tmpHtml)
    }
    const paintADay = (theDay, date)=>{
        const div = document.createElement('div')
        if(typeof theDay !== 'undefined'){
            const tmpSpan = document.createElement('span')
            tmpSpan.innerHTML = date
            div.appendChild(tmpSpan)
            for(let i = 0;i < theDay.ToDoList.length;i++){
                const span = document.createElement('p')
                if(theDay.ToDoList[i].state){
                    span.classList.add('complete')
                }
                if(i>3){
                    span.classList.add('hidden')
                }
                span.innerText = theDay.ToDoList[i].toDoName
                div.appendChild(span)
            }
        } else{
            const span = document.createElement('span')
            span.innerText = date
            div.appendChild(span)
        }
        document.querySelector('.dateBoard').appendChild(div)
    }
    for(let i = 1; i < today.getDate();i++){
        const key = `${curYear}${curMonth}${i}`
        paintADay(systemHandler.collectionOfData[key],i)
    }
    if(curMonth === today.getMonth()&&curYear === today.getFullYear()){
        // recentTDL
        const div= document.createElement('div')
        div.classList.add('Today')
        const tmpSpan = document.createElement('span')
        tmpSpan.innerText = today.getDate()
        div.appendChild(tmpSpan)
        for(let i = 0;i < systemHandler.recentTDL.ToDoList.length;i++){
            const span = document.createElement('p')
            if(systemHandler.recentTDL.ToDoList[i].state){
                span.classList.add('complete')
            }
            if(i>3){
                span.classList.add('hidden')
            }
            span.innerHTML = systemHandler.recentTDL.ToDoList[i].toDoName
            div.appendChild(span)
        }
        document.querySelector('.dateBoard').appendChild(div)
    } else{
        const key = `${curYear}${curMonth}${today.getDate()}`
        paintADay(systemHandler.collectionOfData[key],today.getDate())
        
    }
    for(let i = today.getDate() + 1;i <= curLastDay;i++){
        const key = `${curYear}${curMonth}${i}`
        paintADay(systemHandler.collectionOfData[key],i)
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
    document.querySelector(`.preMonth`).onclick = () => {
        console.log(1)
      makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
    }
    
    // 다음달 이동
    document.querySelector(`.nextMonth`).onclick = () => {
      makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
    }
};