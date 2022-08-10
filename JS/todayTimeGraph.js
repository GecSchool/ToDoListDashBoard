let myChart = null
const todayTimeGraphHandler = ()=>{
    const hourGraph = document.querySelector('#hourGraph')
    const Data = []
    for(let i = 0;i < 24;i++){
        Data.push(Math.floor(systemHandler.recentTDL.minutesEachHour[i]/60))
    }
    const Label = []
    for(let i = 0;i < 24;i++){
        Label.push(`${i}`)
    }
    myChart = new Chart(hourGraph,{
        type: 'bar',
        data: {
            labels: Label,
            datasets: [{
                label: 'minutes',
                data: Data,
                backgroundColor: [
                    'rgba(80, 107, 191, 0.4)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            indexAxis: 'y'
        }
    })
}
const updateMinutesGraph = (chart)=>{
    chart.data.datasets[0].data[new Date().getHours()] = Math.floor(systemHandler.recentTDL.minutesEachHour[new Date().getHours()]/60)
    chart.update()
}

todayTimeGraphHandler()
