## 总结

### 如何用javascript描述一个dom元素结构

```
<div class='box' id='content'>
  <div class='title'>Hello</div>
  <button>Click</button>
</div>
```

```
{
  tag: 'div',
  attrs: { className: 'box', id: 'content'},
  children: [
    {
      tag: 'div',
      arrts: { className: 'title' },
      children: ['Hello']
    },
    {
      tag: 'button',
      attrs: null,
      children: ['Click']
    }
  ]
}
```
你会发现，HTML的信息和JavaScript包含的结构和信息是一样的，但是用javascript写起来太长了，结构又不清晰，用html的方式写起来就方便多了，所以React就把javascript的语法进行了拓展，产生了**JSX**

### 编译前：
```
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Header extends Component {
  render () {
    return (
      <div>
        <h1 className='title'>React 小书</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <Header />,
  document.getElementById('root')
)
```
### 编译后
```
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Header extends Component {
  render () {
    return (
     React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          { className: 'title' },
          "React 小书"
        )
      )
    )
  }
}

ReactDOM.render(
  React.createElement(Header, null), 
  document.getElementById('root')
);
```

### ReactDOM.render

- 他的功能就是把组件渲染并且构造dom树，然后插入到页面的某个位置

### JSX到页面经历了怎么样的过程
- JSX -> babel编译+react构造 -> javascript对象结构 -> DOM元素 -> 插入页面

### 为什么不直接从JSX直接渲染成DOM结构，而要经过中间的生成javascript对象的这个过程？

- 当我们拿到一个表示 UI 的结构和信息的对象以后，不一定会把元素渲染到浏览器的普通页面上，我们有可能把这个结构渲染到 canvas 上，或者是手机 App 上。所以这也是为什么会要把 react-dom 单独抽离出来的原因，可以想象有一个叫 react-canvas 可以帮我们把 UI 渲染到 canvas 上，或者是有一个叫 react-app 可以帮我们把它转换成原生的 App（实际上这玩意叫 ReactNative）

- 有了这样一个对象，当数据变化，需要更新组件的时候，就可以用比较快的算法操作这个 JavaScript 对象，而不用直接操作页面上的 DOM，这样可以尽量少的减少浏览器重排，极大地优化性能


## state vs props

- state 的主要作用是用于组件保存、控制、修改自己的可变状态。state 在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改。你可以认为 state 是一个局部的、只能被组件自身控制的数据源。state 中状态可以通过 this.setState 方法进行更新，setState 会导致组件的重新渲染。

- props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 props，否则组件的 props 永远保持不变。

- state 和 props 有着千丝万缕的关系。它们都可以决定组件的行为和显示形态。一个组件的 state 中的数据可以通过 props 传给子组件，一个组件可以使用外部传入的 props 来初始化自己的 state。但是它们的职责其实非常明晰分明：state 是让组件控制自己的状态，props 是让外部对组件自己进行配置。


### *尽量少用state, 多用props*


### key! key! key!
 react是非常高效的，它高效依赖于Virtual-DOM策略, 简单来说，能复用就会尽量复用，没必要的话绝不碰dom,对于列表元素也是这样，但是处理列表元素的复用性会有一个问题：元素可能会在列表中改变位置
```
<div>a</div>
<div>b</div>
<div>c</div>
```

```
<div>a</div>
<div>c</div>
<div>b</div>
```
c和b的位置互换了，其实ReactJS只需要交换一下dom位置就行了，但是他并不知道我们只是改变了元素的位置，所以会重新渲染下面的两个元素，然后再执行Virtual-dom策略，这样会大大增加dom操作。但是如果给每个元素加上唯一的标识，就可以知道这两个元素只是交换了位置:
```
<div key='a'>a</div>
<div key='b'>b</div>
<div key='c'>c</div>
```
这样 React.js 就简单的通过 key 来判断出来，这两个列表元素只是交换了位置，可以尽量复用元素内部的结构。

### 当某个状态被多个组件依赖或者影响的时候，就应该把状态提升到这些组件的最近公共组件中去管理，用props传递数据或者函数来管理这种依赖或者影响的行为


### ReactDom.render干了什么？？？
```jsx
ReactDOM.render(
 <Header />, 
  document.getElementById('root')
)
```
其实我们把`header`组件传给了`React.createElement`函数，又把函数返回结果传给了`ReactDOM.render`
```ecmascript 6
// React.createElement 中实例化一个 Header
const header = new Header(props, children)
// React.createElement 中调用 header.render 方法渲染组件的内容
const headerJsxObject = header.render()

// ReactDOM 用渲染后的 JavaScript 对象来来构建真正的 DOM 元素
const headerDOM = createDOMFromObject(headerJsxObject)
// ReactDOM 把 DOM 元素塞到页面上
document.getElementById('root').appendChild(headerDOM)
```

### [深入剖析：如何实现一个Virtual-dom算法](https://github.com/livoras/blog/issues/13) 

