// 定义一个提供state和dispatch的集合
function createStore(state, stateChanger) {
    // 添加订阅
    const listeners = []
    const subscribe = listener => listener.push(listener)
    const getState = () => state
    const dispatch = action => {
        stateChanger(state, action)
        // 每次改变，都触发一下listener
        listeners.forEach(listener => listener())
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}

function renderApp (appState) {
    renderTitle(appState.title)
    renderContent(appState.content)
}

function renderTitle (title) {
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent (content) {
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}


// 定义state
let appState = {
    title: {
        text: 'React.js 小书',
        color: 'red',
    },
    content: {
        text: 'React.js 小书内容',
        color: 'blue'
    }
}

// 定义stateChanger
function stateChanger(state, action) {
    switch(action.type) {
        case 'UPDATE_TITLE_TEXT':
            state.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            state.title.color = action.color
            break
        default:
            break
    }
}

// 使用
const store = createStore(appState, stateChanger)
// 添加订阅
store.subscribe(() => renderApp(store.getState()))

// 首次执行一下
renderApp(store.getState())

store.dispatch({
    type: 'UPDATE_TITLE_TEXT',
    text: '修改text'
})
store.dispatch({
    type: 'UPDATE_TITLE_COLOR',
    color: '修改color'
})
