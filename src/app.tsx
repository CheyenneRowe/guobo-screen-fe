import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { ConfigProvider } from 'antd'; // 引入ConfigProvider全局化配置
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import { createHashHistory } from 'history';
import './app.less';

const Main = React.lazy(() => import(`@src/app/index`));
const history = createHashHistory();
ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <React.Suspense fallback={<div />}>
            <Router history={history}>
                <Main />
            </Router>
        </React.Suspense>
    </ConfigProvider>,
    document.getElementById('root')
);

// 用rem实现不同分辨率下的字体自适应
(function(doc,win){
    let fn = () => {
        let docEl = doc.documentElement,
            clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 16 * (clientWidth / 1920) + 'px';
        console.log('fontSize: ', docEl.style.fontSize)
    }
    if (!doc.addEventListener) return;
    win.addEventListener('resize',fn);
    doc.addEventListener('DOMContentLoaded',fn);
})(document,window);
