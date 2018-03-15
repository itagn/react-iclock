import React, { Component } from 'react';
import './styles/Iclock.css';
import Glasses from './components/Glasses';
import Timer from './components/Time';
import png from './source/time.png'

class Iclock extends Component {
    constructor(props){
        super(props);
        let {
            type = 'clock',
            language = 'en',
            emoji = 'smile',
            glasses = false,
            hoverAnimation = false,
            scale = 1,
            info = 'o w o',
            fontSize = '1.5rem',
            fontColor = 'orange',
            fontStyle = "Helvetica,'Microsoft YaHei'",
            dateColor = '#999',
            className = ''
        } = props.display;

        this.state = {
            week: '',
            date: '',
            show: '',
            interval: null,
            hf: 'num num0',
            hs: 'num num0',
            mf: 'num num0',
            ms: 'num num0',
            sf: 'num num0',
            ss: 'num num0',
            type,
            language,
            emoji,
            className,
            glasses,
            hoverAnimation,
            scale,
            info,
            fontSize,
            fontColor,
            fontStyle,
            dateColor
        }
    }
    componentWillMount(){
        this.setStateAsync({
            show: this.getTime()
        });
        this.initDate();
    }
    componentDidMount(){
        const clock = document.querySelector(`${this.state.className} .iclock`);
        if(clock){
            let tf = this.checkError();
            if(tf){
                this.initStyle();
                this.checkType();
                this.checkEmoji();
            }
        } else {
            this.errTip('Error: props[display].className of dom does not exist!')
        }
    }
    setStateAsync(state){
        return new Promise((resolve, reject) => {
            this.setState(state, resolve);
        })
    }
    render(){
        return (
            <div>
                <div className="iclock">
                    {(this.state.type === 'clock' || this.state.type === 'scroll') && (
                        <Timer week={this.state.week} date={this.state.date}/> )
                    }
                    <div className="iclock-show">
                        <div className="iclock-info" >
                            { this.state.show }
                        </div>
                        {
                            (this.state.type==='scroll') && (
                                <div className="iclock-scroll">
                                    <img src={png} alt="hours-first" className={this.state.hf} />
                                    <img src={png} alt="hours-second" className={this.state.hs} />
                                    <span> : </span>
                                    <img src={png} alt="minutes-first" className={this.state.mf} />
                                    <img src={png} alt="minutes-second" className={this.state.ms} />
                                    <span> : </span>
                                    <img src={png} alt="seconds-first" className={this.state.sf} />
                                    <img src={png} alt="seconds-second" className={this.state.ss} />
                                </div>
                            )
                        }
                    </div>
                    <div className="iclock-body">
                        { this.state.glasses && <Glasses /> }
                        <div className="iclock-left-eyes"></div>
                        <div className="iclock-right-eyes"></div>
                        <div className="iclock-right-box"></div>
                        <div className="iclock-cup"></div>
                        <div className="iclock-mouse"></div>
                    </div>
                </div>
            </div>
        )
    }
    initDate(){
        let date = this.getDate().date, week = this.getDate().week;
        this.setStateAsync({
            date: date,
            week: week
        });
    }
    checkError(){
        let tf = true;
        if(this.state.type !== 'clock' && this.state.type !== 'text' && this.state.type !=='scroll'){
            this.errTip('Error: props[display].type should be "clock", "text" or "scroll".');
            tf = false;
        }
        if(this.state.emoji !== 'smile' && this.state.emoji !== 'angry' && this.state.emoji !== 'jiong'){
            this.errTip('Error: props[display].emoji should be "smile", "angry" or "jiong".');
            tf = false;
        }
        return tf;
    }
    initStyle(){
      const clockDom = document.querySelector(`${this.state.className} .iclock`);
      clockDom.style.transform = `scale(${this.state.scale})`;
      clockDom.style.webkitTransform = `scale(${this.state.scale})`;
      clockDom.style.fontFamily = this.state.fontStyle;
      const showDom = document.querySelector(`${this.state.className} .iclock .iclock-show`);
      showDom.style.color = this.state.fontColor;
      showDom.style.fontSize = this.state.fontSize;
      this.checkAnimation();
    }
    checkAnimation(){
      if(this.state.hoverAnimation){
        const bodyDom = document.querySelector(`${this.state.className} .iclock .iclock-body`);
        const mouseDom = document.querySelector(`${this.state.className} .iclock .iclock-mouse`);
        let animationName = 'ppp', animationTime = '0.75s';
        this.domHover(bodyDom, function () {
          mouseDom.style.animation = `${animationName} ${animationTime} infinite`;
          mouseDom.style.webkitAnimation = `${animationName} ${animationTime} infinite`;
        }, function () {
          mouseDom.style.animation = ``;
          mouseDom.style.webkitAnimation = ``;
        })
      }
    }
    checkType(){
      if(this.state.type === 'clock' || this.state.type === 'scroll'){
        const date = document.querySelector(`${this.state.className} .iclock .iclock-date`);
        const week = document.querySelector(`${this.state.className} .iclock .iclock-week`);
        date.style.color = this.state.dateColor;
        week.style.color = this.state.dateColor;
        this.loop();
      } else if(this.state.type === 'text'){
          let info = this.state.info;
        this.setState({
            show: info
        });
      }
    }
    checkEmoji(){
        const mouse = document.querySelector(`${this.state.className} .iclock .iclock-body .iclock-mouse`);
        if(this.state.emoji === 'smile'){
            this.smile(mouse);
        } else if (this.state.emoji === 'angry'){
            this.angry(mouse);
        } else if (this.state.emoji === 'jiong'){
            this.jiong(mouse);
        }
    }
    errTip(str){
        if(this.state.interval){
            clearInterval(this.state.interval);
        }
        const infoDom = document.querySelector(".iclock .iclock-info");
        infoDom.style.color = '#c23531';
        infoDom.style.fontSize = this.state.fontSize;
        infoDom.style.fontFamily = this.state.fontStyle
        if(this.state.type === 'scroll'){
            infoDom.style.display = 'block';
            const scroll = document.querySelector(".iclock .iclock-scroll");
            scroll.style.display = 'none';
        }
        this.setStateAsync({
            show: "Error~"
        });
        console.error(str);
    }
    getTime(){
        const dates = new Date();
        let h = dates.getHours()+'';
        h = h.length === 2 ? h : `0${h}`;
        let m = dates.getMinutes()+'';
        m = m.length === 2 ? m : `0${m}`;
        let s = dates.getSeconds()+'';
        s = s.length === 2 ? s : `0${s}`;

        if(this.state.type === 'clock'){
            return `${h}:${m}:${s}`;
        } else if(this.state.type === 'scroll') {
            this.setStateAsync({
                hf: `num num${h[0]}`,
                hs: `num num${h[1]}`,
                mf: `num num${m[0]}`,
                ms: `num num${m[1]}`,
                sf: `num num${s[0]}`,
                ss: `num num${s[1]}`
            });
        }
    }
    getDate(){
        const dates = new Date();
        let y = dates.getFullYear(), m = dates.getMonth() + 1, d = dates.getDate();
        let date, week = dates.getDay();
        if(this.state.language === 'zh') {
            let zh = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            week = zh[week % 7];
            date =`${y}/${m}/${d}`;
        } else {
            let en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            week = en[week%7];
            date = `${m}/${d}/${y}`;
        }
        return { date, week };
    }
    domHover(dom, fnOver, fnOut ) {
      dom.onmouseenter = fnOver;
      dom.onmouseleave = fnOut;
    }
    loop(){
        const that = this;
        if (this.state.type === 'scroll'){
            const dom = document.querySelector(".iclock .iclock-info");
            dom.style.display = 'none';
            this.setStateAsync({
                interval: setInterval(() => {
                    this.initDate();
                    this.getTime();
                }, 1000)
            })
        } else if (this.state.type === 'clock'){
            this.setStateAsync({
                interval: setInterval(() => {
                    that.initDate();
                    that.setStateAsync({
                        show: that.getTime()
                    });
                }, 1000)
            })
        }
    }
    smile(mouseDom){
      mouseDom.style.borderTop = '80px solid #ccc';
      mouseDom.style.borderLeft = '80px solid transparent';
      mouseDom.style.borderRight = '80px solid transparent';
    }
    angry(mouseDom){
      mouseDom.style.border = '40px solid #d53a35';
      mouseDom.style.borderRadius = '10%';
    }
    jiong(mouseDom){
        let deg = 10;
        const leftDom = document.querySelector(`${this.state.className} .iclock .iclock-body .iclock-left-eyes`);
        leftDom.style.transform = `rotate(${-deg}deg)`;
        leftDom.style.webkitTransform = `rotate(${-deg}deg)`;
        const rightDom = document.querySelector(`${this.state.className} .iclock .iclock-body .iclock-right-eyes`);
        rightDom.style.transform = `rotate(${deg}deg)`;
        rightDom.style.webkitTransform = `rotate(${deg}deg)`;
        mouseDom.style.border = '40px solid #e98f6f';
        mouseDom.style.borderRadius = '10%';
        mouseDom.style.left = '56px';
        mouseDom.style.width = '10px';
    }
}

// Iclock.propTypes = {
//   display: React.PropTypes.object.isRequired
// }

export default Iclock;