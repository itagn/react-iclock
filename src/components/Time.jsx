import React, { Component } from 'react';

class Time extends Component {
    constructor(props){
        super(props);
        let { week = '', date = '' } = props;
        this.state = {
            week,
            date
        }
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