const timeHandler = ()=>{
    if(systemHandler.recentTDL.onId){
        const index = systemHandler.recentTDL.ToDoList.findIndex((element)=>{
            return element.id === systemHandler.recentTDL.onId
        })
        systemHandler.recentTDL.ToDoList[index].time++
        systemHandler.recentTDL.minutesEachHour[new Date().getHours()]++
        const timeSpan = document.querySelector('.on .time')
        const secondsToHms = (seconds) => {
            seconds = Number(seconds);
            const hour = Math.floor(seconds / 3600);
            const min = Math.floor(seconds % 3600 / 60);
            const sec = Math.floor(seconds % 3600 % 60);
            return `${hour < 10 ?'0' + hour: hour}:${min<10 ? '0' + min: min}:${sec < 10 ? '0' + sec : sec}`; 
        }
        timeSpan.innerHTML = secondsToHms(systemHandler.recentTDL.ToDoList[index].time)
        localStorage.setItem('recentTDL',JSON.stringify(systemHandler.recentTDL))
    }
    updateMinutesGraph(myChart)
}
timeHandler()
setInterval(timeHandler,1000)