import React, { Component } from "react";
import Comment from "./Comment";

class ComponentList extends Component {
    static defaultProps = {
        comments: []
    }
    render() {
        return (
            <div>
                {
                    this.props.comments.map(({username, content, createdTime}, index) => {
                        return <Comment username={username} content={content} createdTime={createdTime} key={index} />
                    })
                }
            </div>
        )
    }
}
export default ComponentList
