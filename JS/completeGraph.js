
const updateCircleGraph = ()=>{
    const circleGraph = document.querySelector('.circle')
    const percentageText = document.querySelector('.percentage')
    // let percentage = 0
    let countTD = 0
    systemHandler.recentTDL.ToDoList.forEach(element => {
        if(element.state){
            countTD++
        }
    })
    try {
        const percentage = Math.round(countTD / systemHandler.recentTDL.ToDoList.length * 100)
        if(!systemHandler.recentTDL.ToDoList.length){
            throw error
        }
        percentageText.innerHTML = `${percentage}%`
        circleGraph.setAttribute('stroke-dasharray',`${percentage}, 100`)
    } catch (error) {
        percentageText.innerHTML = '0%'
        circleGraph.setAttribute('stroke-dasharray',`0, 100`)
    }
}