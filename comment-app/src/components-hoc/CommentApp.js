import React, {Component} from 'react';
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import Hoc from './hoc'
import './comment.css'

class CommentApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: props.data !== 'null' ? props.data : []
        }
    }

    handleSubmitComment = ({username, content, createdTime}) => {
        if(!username) return alert('请输入用户名')
        if(!content) return alert('请输入评论内容')
        this.setState({
            comments: [{username, content, createdTime}, ...this.state.comments]
        })
        // this.setState(prevState => {
        //     return {
        //         comments: [{username, content}, ...prevState.comments]
        //     }
        // })
        this.props.saveData([{username, content, createdTime}, ...this.state.comments])
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

export default Hoc(CommentApp, 'comments')
