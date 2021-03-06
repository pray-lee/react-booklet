import React, {Component} from "react";

class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            content: '',
        }
    }

    componentWillMount() {
        this._loadUsername()
    }

    componentDidMount() {
        this.textarea.focus()
    }

    _saveUsername (username) {
        window.localStorage.setItem('username', username)
    }

    _loadUsername () {
        const username = window.localStorage.getItem('username')
        if(username)
            this.setState({
                username
            })
    }

    handleUsernameBlur (event) {
       this._saveUsername(event.target.value)
    }

    handleUsernameChange (event) {
        this.setState({
            username: event.target.value
        })
    }

    handleContentChange (event) {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit = () => {
       if(this.props.onSubmit) {
           const {username, content} = this.state
           this.props.onSubmit({username, content, createdTime: +new Date()})
       }
       // 清空
       this.setState({
           content: ''
       })
    }

    render() {
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名：</span>
                    <div className="comment-field-input">
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={e => this.handleUsernameChange( e)}
                            onBlur={e => this.handleUsernameBlur(e)}
                        />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea
                            ref={el => this.textarea = el}
                            value={this.state.content}
                            onChange={e => this.handleContentChange(e)}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit}>发布</button>
                </div>
            </div>
        )
    }
}

export default CommentInput
