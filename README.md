#国拨-跨智能网络编排器-展示大屏

JIRA单号
```
feat-ONAP-4238
```

本项目为 ONAP-REACT 框架代码库。基于 create-react-app，技术栈为 React + React-router + Axios + Mobx + Antd + Typescript、Webpack4.0 配置及打包优化、Jest 测试框架、ESLint 等项目开发规范

### 目录结构

```
.
├── README.md                       // 项目说明
├── config                          // webpack配置
├── package-lock.json
├── package.json
├── public                          // 项目公开目录
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
├── src                             // src开发目录
│   ├── app.tsx                     // 项目入口文件
│   ├── app                        // 应用目录
│   │   ├── README.md                       // 项目说明
│   │   ├── .gitignore                      // gitignore 配置
│   │   ├── index.tsx                       // 入口文件（不要定义为 jsx）
│   │   ├── components                      // 公共组件
│   │   ├── services                        // 接口请求（含 mock 数据）
│   │   ├── utils                           // 业务模块公共方法
│   │   ├── consts                          // 常量
│   │   ├── types                           // typescript interface 等
│   │   ├── routers                         // 路由
│   │   ├── stores                          // store
│   │   ├── assets                          // 私有资源
│   │   └── modules                         // 子模块目录
│   │       ├── app-name-a
│   │       │   ├── components              // 私有组件
│   │       │   ├── stores？                // store
│   │       │   ├── routers？               // 路由
│   │       │   ├── index.less/app-name-a.less
│   │       │   ├── index.tsx/app-name-a.tsx
│   │       │   └── modules                 // 子模块目录（目录结构递归）
│   │       │       ├── app-name-list
│   │       │       │   ├── modules
│   │       │       │   ├── components
│   │       │       │   ├── stores？
│   │       │       │   ├── routers？
│   │       │       │   ├── index.less/app-name-list.less
│   │       │       │   └── index.tsx/app-name-list.tsx
│   │       │       └── app-name-detail...
│   │       ├── app-name-b...
│   │       └── app-name-c...
│   ├── common                      // 公共文件夹
│   │   ├── assets                  // 静态资源
│   │   │   ├── font
│   │   │   └── images
│   │   ├── components              // 公共组件
│   │   │   ├── capacity-card
│   │   │   ├── capacity-card-sm
│   │   │   ├── index.less
│   │   │   ├── index.tsx
│   │   │   ├── layouts
│   │   │   ├── loading.tsx
│   │   │   └── search-input
│   │   ├── services                // axios服务等相关
│   │   ├── stores                  // mobx store
│   │   ├── styles                  // 存放公共样式
│   │   └── utils                   // 工具库/通用函数
│   │       └── req.ts
│   ├── index.html                  // 入口html页面
│   └── setup-proxy.js              // 开发环境代理配置文件
├── tsconfig.json                   // ts配置
└── .env                            // 应用环境配置文件
```

### 变量风格

```
肉串（kebab-case）：
文件夹名、
文件名、
样式类名className、
url路由地址

大驼峰（UpperCamelCase）：
组件、
类

小驼峰（camelCase）：
方法
```

### 初始化项目

1. `git clone http://dev.cmri.cn/ai/gitlab/onap/fe/shan-o-fe`
2. `git submodule update --init --recursive`
3. 更改`@src/common/components/index.tsx`切换至当前子项目
4. 启动

### tips

-   import 尽量使用绝对路径，即
    ```
    import xxx from '@src/**/*.*'
    import '@src/**/*.less'
    ```
-   vscode 使用以下插件实现保存时格式化代码

    1. editorconfig
    2. prettier
    3. settings>`"editor.formatOnSave": true`

-   package.json 中新增包解释

    1. react-ace，ace-builds
       代码编辑器的两个库，可以通过 ace-builds 引入想要解析代码的类型和风格。通过 react-act 展示代码。

    2. js-base64
       编解码 base64 <=> utf-8 | bytes string

    3. js-yaml
       用于加载 yaml 文件，返回可展示的普通对象等

    4. computed-async-mobx
       异步调用 mobx 的 computed 方法

    5. mobx-utils
       mobx 工具库

    6. moment-mini (可以替换为 moment)
       格式化时间，相对时间，国际化时间等

    7. file-saver
       客户端下载文件，可以指定文件类型和名称

### 忽略 submodule gitlink

```
git config submodule.<submodule "name">.ignore all
// e.g.
git config submodule.common.ignore all
```

### 启动项目

开发模式下，执行`npm start`<br />
在浏览器中打开[http://localhost:3000](http://localhost:3000) 即可。

修改代码页面会自动刷新<br />
控制台将显示 lint 错误。

### 测试

执行`npm test`启动测试<br />
详见[running tests](https://facebook.github.io/create-react-app/docs/running-tests)

### 添加 submodule（忽略）

```
git submodule add --name common http://dev.cmri.cn/ai/gitlab/onap/fe/util-fe.git src/common
```
