const memoHandler = ()=>{
    const memoInput = document.querySelector('.Memo')
    const todayMemo = document.querySelector('.todayMemo>span')
    const memoBox = document.querySelector('.todayMemo')
    const memoToggleHidden = ()=>{
        memoInput.classList.toggle('hidden')
        todayMemo.classList.toggle('hidden')
    }
    const memoEventHandler = ()=>{
        memoToggleHidden()
        memoInput.focus()
        memoInput.addEventListener('keypress',(evnet)=>{
            if(evnet.key === 'Enter'){
                console.log(todayMemo.innerHTML)
                evnet.preventDefault()
                memoToggleHidden()
                // end input
            }
            todayMemo.innerHTML = memoInput.value
        })
    }
    // memoInput.value = systemHandler.recentTDL.memo
    memoBox.addEventListener('click',memoEventHandler)
}

memoHandler()