const memoHandler = ()=>{
    const memoInput = document.querySelector('.Memo')
    const todayMemo = document.querySelector('.todayMemo>span')
    const memoBox = document.querySelector('.todayMemo')
    const memoToggleHidden = ()=>{
        memoInput.classList.toggle('hidden')
        todayMemo.classList.toggle('hidden')
    }
    memoInput.value = systemHandler.recentTDL.memo
    todayMemo.innerHTML = systemHandler.recentTDL.memo
    const memoEventHandler = ()=>{
        memoToggleHidden()
        memoInput.focus()
        const enterPress = (evnet)=>{
            if(evnet.key === 'Enter'){
                evnet.preventDefault()
                memoToggleHidden()
                memoInput.removeEventListener('keypress',enterPress)
                // end input
            }
            todayMemo.innerHTML = memoInput.value
            systemHandler.recentTDL.memo = todayMemo.innerHTML
        }
        memoInput.addEventListener('keypress',enterPress)
    }
    memoBox.addEventListener('click',memoEventHandler)
}

memoHandler()