import React, { Component } from "react";
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeString: ''
        }
    }
    componentWillMount() {
        this._updateTimeString()
        this._timer = setInterval(this._updateTimeString.bind(this), 5000)
    }
    componentWillUnmount() {
        clearInterval(this._timer)
    }

    _updateTimeString() {
        const { createdTime } = this.props
        console.log(createdTime)
        const duration = (+Date.now() - createdTime) / 1000
        this.setState({
            timeString: duration > 60
                ? `${Math.round(duration / 60)} 分钟前`
                : `${Math.round(Math.max(duration, 1))} 秒前`
        })
    }
    render () {
        return (
            <div className="comment">
                <div className="comment-user">
                    <span>{this.props.username}：</span>
                </div>
                <p>{this.props.content}</p>
                <span className="comment-createdtime">
                    {this.state.timeString}
                </span>
            </div>
        )
    }
}
export default Comment
