# react-iclock
<p>
  <a href="https://www.npmjs.com/package/react-iclock.svg"><img src="https://img.shields.io/npm/dm/react-iclock.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/react-iclock.svg"><img src="https://img.shields.io/npm/v/react-iclock.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/react-iclock.svg"><img src="https://img.shields.io/npm/l/react-iclock.svg" alt="License"></a>
</p>

## Introduction
:rocket: a cute clock components with ReactJS
## screenshot
Try to move the mouse to the face.  

    if you set display.type = 'clock' && set display.language = 'zh' or 'en'

![clock-zh.png](https://github.com/itagn/react-iclock/raw/master/img/clock-zh.png) ![clock-en.png](https://github.com/itagn/react-iclock/raw/master/img/clock-en.png)

    if you set display.type = 'text' && set display.info = 'Itagn' 

![text.png](https://github.com/itagn/react-iclock/raw/master/img/text.png)

    if you want to change the expression, and set display.emoji = 'angry' or 'jiong'

![angry.png](https://github.com/itagn/react-iclock/raw/master/img/angry.png) ![jiong.png](https://github.com/itagn/react-iclock/raw/master/img/jiong.png)

    let the cute clock wears glasses, and set display.glasses = true

![glasses.png](https://github.com/itagn/react-iclock/raw/master/img/glasses.png)

    if you set display is invalid

![error.png](https://github.com/itagn/react-iclock/raw/master/img/error.png)

## Install
```text
//  by npm
$ npm install react-iclock --save
//  by cnpm
$ cnpm install react-iclock --save
//  by yarn
$ yarn add react-iclock --save
```
## Usage
```javascript
import React, { Component } from 'react';
import './App.css';
import { Iclock } from 'react-iclock';
var dis = {
    type: 'clock',
    className: '.clock',
    emoji: 'smile',
    glasses: false
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Iclock className="clock" display={dis}/>
      </div>
    );
  }
}

export default App;
```
## Api
- `display`  

In order to judge display clock or text by setting display  

    Type: Object
    Default: {
        type: 'clock',  //  value: 'clock' || 'text'
        info: 'o w o',  //  if this.type is 'text', and show this.info
        className: '',  //  set className when more than one iclock component on the page
        scale: 1,  //  Magnification
        emoji: 'smile',  //  value: 'smile' || 'angry' || 'jiong'
        glasses: false,  //  Choose whether to wear glasses
        language: 'en',  //  language
        dateColor: '#999',  //  set date-color
        fontColor: 'orange',  //  set font-color
        fontSize: '1.5rem',  //  set font-size
        fontStyle: 'Helvetica,"Microsoft YaHei"' // set font-family
    }

## Contributing

1. Fork it!
1. Create your feature branch: git checkout -b my-new-feature
1. Commit your changes: git commit -am 'Add some feature'
1. Push to the branch: git push origin my-new-feature
1. Submit a pull request :D

## License
MIT © [itagn][1]  
作者：微博 [@itagn][2] - Github [@itagn][3] 

[1]: https://www.npmjs.com/~itagn
[2]: https://weibo.com/p/1005053782707172
[3]: https://github.com/itagn