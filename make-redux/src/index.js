const appState = {
    title: {
        text: 'React.js',
        color: 'red'
    },
    content: {
        text: '内容',
        color: 'blue'
    }
}
// 定义一个dispatch方法，来负责数据的修改
// 所有对数据的操作必须通过dispatch函数。它接收一个参数action, 这个action是一个普通的javascript对象，里面一个type字段标明你想干什么,dispatch 在 swtich 里面会识别这个 type 字段，能够识别出来的操作才会执行对 appState 的修改
function dispatch(action) {
    switch(action.type) {
        case 'UPDATE_TITLE_TEXT':
            appState.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            appState.title.color = action.color
    }
}

// other operation
function renderApp(appState) {
    renderTitle(appState.title)
    renderContent(appState.content)
}

function renderTitle(title) {
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent(content) {
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML =  content.text
    contentDOM.style.color = content.color
}

renderApp(appState)

