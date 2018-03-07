import React, { Component } from 'react';

class Time extends Component {
    constructor(props){
        super(props)
        this.state = {
            week: '',
            date: ''
        }
    }
    componentWillMount(){
        this.setState({
            week: this.props.week,
            date: this.props.date
        })
    }
    render(){
        return (
            <div className="iclock-time">
                <span className="iclock-week">
                    { this.state.week }
                </span>
                <span className="iclock-date">
                    { this.state.date }
                </span>
            </div>
        )
    }
}

export default Time;