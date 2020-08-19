import React, {Component} from 'react';
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import './comment.css'

class CommentApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }
    componentWillMount() {
        this._loadComments()
    }

    _loadComments () {
        let comments = window.localStorage.getItem('comments')
        if(comments) {
            comments = JSON.parse(comments)
            this.setState({comments})
        }
    }
    _saveComments (comments) {
        window.localStorage.setItem('comments', JSON.stringify(comments))
    }
    handleSubmitComment = ({username, content, createdTime}) => {
        if(!username) return alert('请输入用户名')
        if(!content) return alert('请输入评论内容')
        console.log(createdTime)
        this.setState({
            comments: [{username, content, createdTime}, ...this.state.comments]
        })
        // this.setState(prevState => {
        //     return {
        //         comments: [{username, content}, ...prevState.comments]
        //     }
        // })
        this._saveComments([{username, content, createdTime}, ...this.state.comments])
    }

    render() {
        return (
            <div className="wrapper">
                <CommentInput
                    onSubmit={this.handleSubmitComment}
                >
                </CommentInput>
                <CommentList comments={this.state.comments}></CommentList>
            </div>
        )
    }
}

export default CommentApp
