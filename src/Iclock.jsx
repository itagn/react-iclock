import React, { Component } from 'react';
import './styles/Iclock.css';
import Glasses from './components/Glasses';
import Time from './components/Time';

class Iclock extends Component {
    constructor(props){
        super(props);
        this.state = {
            week: '',
            date: '',
            show: '',
            language: props.display.language || 'en',
            emoji: props.display.emoji || 'smile',
            className: props.display.className || '',
            glasses: props.display.glasses || false,
            scale: props.display.scale || 1,
            type: props.display.type || 'clock',
            info: props.display.info || 'o w o',
            fontSize: props.display.fontSize || '1.5rem',
            fontColor: props.display.fontColor || 'orange',
            fontStyle: props.display.fontStyle || "Helvetica,'Microsoft YaHei'",
            dateColor: props.display.dateColor || '#999'
        }
    }
    componentWillMount(){
        this.initData();
    }
    componentDidMount(){
        var clock = document.querySelector(this.state.className + " .iclock");
        if(clock){
            this.initStyle();
            this.checkType();
            this.checkEmoji();
        } else {
            this.errTip('Error: props[display].className of dom does not exist!')
        }
    }
    render(){
        return (
            <div>
                <div className="iclock">
                    { (this.state.type === 'clock') && <Time week={this.state.week} date={this.state.date} /> }
                    <div className="iclock-show">
                        { this.state.show }
                    </div>
                    <div className="iclock-body">
                        {
                        this.state.glasses && <Glasses />
                        }
                        <div className="iclock-left-eyes"></div>
                        <div className="iclock-right-eyes"></div>
                        <div className="iclock-right-box">
                        <div className="iclock-cup"></div>
                        </div>
                        <div className="iclock-mouse"></div>
                    </div>
                </div>
            </div>
        )
    }
    initData(){
        var time = this.getDate().time, date = this.getDate().date, week = this.getDate().week;
        this.setState({
            show: time,
            date: date,
            week: week
        })
    }
    initStyle(){
      var clock = document.querySelector(this.state.className + " .iclock");
      clock.style.transform = "scale("+this.state.scale+")";
      clock.style.webkitTransform = "scale("+this.state.scale+")";
      clock.style.fontFamily = this.state.fontStyle;
      var dom = document.querySelector(this.state.className + " .iclock .iclock-show");
      dom.style.color = this.state.fontColor;
      dom.style.fontSize = this.state.fontSize;
    }
    checkType(){
      if(this.state.type === 'clock'){
        var date = document.querySelector(this.state.className + " .iclock .iclock-date");
        var week = document.querySelector(this.state.className + " .iclock .iclock-week");
        date.style.color = this.state.dateColor;
        week.style.color = this.state.dateColor;
        this.loop();
      } else if(this.state.type === 'text'){
        this.setState({
            show: this.state.info
        });
      } else {
        this.errTip('Error: props[display].type should be "clock" or "text".');
      }
    }
    checkEmoji(){
      var mouse = document.querySelector(this.state.className + " .iclock .iclock-body .iclock-mouse");
      if(this.state.emoji === 'smile'){
        this.smile(mouse);
      } else if (this.state.emoji === 'angry'){
        this.angry(mouse);
      } else if (this.state.emoji === 'jiong'){
        this.jiong(mouse);
      } else {
        this.errTip('Error: props[display].emoji should be "smile", "angry" or "jiong".');
      }
    }
    errTip(str){
        this.setState({
            show: "Error~"
        });
        var dom = document.querySelector(".iclock .iclock-show");
        dom.style.color = '#c23531';
        dom.style.fontSize = this.state.fontSize;
        dom.style.fontFamily = this.state.fontStyle;
        console.error(str);
    }
    getDate(){
      var dates = new Date();
      var h = dates.getHours()+'';
      h = h.length === 2 ? h : '0'+h;
      var m = dates.getMinutes()+'';
      m = m.length === 2 ? m : '0'+m;
      var s = dates.getSeconds()+'';
      s = s.length === 2 ? s : '0'+s;
      var time = h+':'+m+':'+s;
      var y = dates.getFullYear();
      var mn = dates.getMonth() + 1;
      var d = dates.getDate();
      var date;
      var week = dates.getDay();
      if(this.state.language === 'zh') {
        var zh = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        week = zh[week % 7];
        date = y+'/'+mn+'/'+d;
      } else {
        var en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        week = en[week%7];
        date = mn+'/'+d+'/'+y;
      }
      return { date, time, week };
    }
    loop(){
        var _this = this;
        setInterval(function () {
            _this.setState({
                show: _this.getDate().time
            })
        }, 1000)
    }
    smile(mouse){
        mouse.style.borderTop = '80px solid #ccc';
        mouse.style.borderLeft = '80px solid transparent';
        mouse.style.borderRight = '80px solid transparent';
    }
    angry(mouse){
        mouse.style.border = '40px solid #d53a35';
        mouse.style.borderRadius = '10%';
    }
    jiong(mouse){
        var leftEye = document.querySelector(this.state.className + " .iclock .iclock-body .iclock-left-eyes");
        var rightEye = document.querySelector(this.state.className + " .iclock .iclock-body .iclock-right-eyes");
        leftEye.style.transform = 'rotate(-10deg)';
        leftEye.style.webkitTransform = 'rotate(-10deg)';
        rightEye.style.transform = 'rotate(10deg)';
        rightEye.style.webkitTransform = 'rotate(10deg)';
        mouse.style.border = '40px solid #e98f6f';
        mouse.style.borderRadius = '10%';
        mouse.style.left = '56px';
        mouse.style.width = '10px';
    }
}

// Iclock.propTypes = {
//   display: React.PropTypes.object.isRequired
// }

export default Iclock;