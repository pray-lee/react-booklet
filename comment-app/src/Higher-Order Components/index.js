import React, {Component} from "react";
// 基本结构
// export default WrappedComponent => {
//     return class NewComponent extends Component {
//         // 这里可以加一些逻辑
//         render() {
//             return <WrappedComponent />
//         }
//     }
// }

// demo
export const higherOrderComponent =  (WrappedComponent, name) => {
    return class NewComponent extends Component {
        constructor(props) {
            super(props)
            this.state = {
                data: null
            }
        }

        componentWillMount() {
            let Data = localStorage.getItem(name)
            this.setData({data})
        }

        render() {
            return <WrappedComponent data={this.state.data}/>
        }
    }
}

// 使用
class InputWithUserName extends Component {
    render() {
        return <input value={this.props.data}/>
    }
}

InputWithUserName = higherOrderComponent(InputWithUserName, 'username')
export default InputWithUserName

// ajax demo
export const ajaxHigherOrderComponent = (WrappedComponent, name) => {
    class NewComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null
            }
        }
        componentWillMount() {
            ajax.get('/data/' + name, data => {
                this.setState({
                    data
                })
            })
        }
        render() {
            return <WrappedComponent data={this.state.data}/>
        }
    }
    return NewComponent
}

class InputWithAjax extends Component {
    render() {
        return <input value={this.props.data}/>
    }
}
InputWithAjax = ajaxHigherOrderComponent(InputWithAjax, 'username')
export default InputWithAjax
