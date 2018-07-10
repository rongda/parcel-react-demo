# React-Pracel

react-pracel-demo is a framework for React & React-redux & React-router with parcel bundle.

## Table of contents

* [How to user](#how-to-user)
* [What's included](#what-is-included)
* [Notice](#notice)
* [Other](#other)

### How to user
* install node environment.
* install MongoDB environment.
* yarn install.
* yarn run dev.
* yarn run build.
* or use npm.

### What's included

Within the download you'll find the following directories and files.
You'll see something like this:

```
/
├── api/
│   ├── index.js                                           // 接口入口文件(MongoDB, Mock)
├── build/
│   ├── dev-server.js                                      // 开发环境
│   ├── prod-server.js                                     // 产品环境
├── config/
│   ├── index.js                                           // 配置文件
├── src/
│   ├── assets/                                            // 静态资源位置、可自行规划目录
│   │   ├── .gitkeep
│   ├── script/                                            // 脚本目录、可自行规划目录(component等)
│   │   ├── component/                                     // 组件component文件、可自行规划目录
│   │   │   ├── App.js                                     // React 组件入口文件
│   │   ├── router/                                        // 路由配置文件
│   │   │   ├── index.js
│   │   ├── store/                                         // Redux状态
│   │   │   ├── actions.js                                 // action
│   │   │   ├── reducer.js                                 // reducer
│   │   │   ├── type.js                                    // type
│   │   ├── index.js                                       // 脚本入口文件
│   ├── style/                                             // 样式目录、可自行规划目录(lib、page等)
│   │   ├── index.css[styl][scss]                          // 样式入口文件
│   ├── index.html                                         // 项目入口文件      
├── .babelrc                                               // babel配置
├── cssnano.config.js                                      // cssnano配置
├── .gitignore                                             // gitignore 
├── package.json                                           // 依赖文件
└── README.md                                              // 你懂的

```

## Notice

*  Parcel支持[Sass][Less][Stylus]等css预编译语言，构建时会自动添加到devDependencies. 
*  Parcel HMR 适用于[JavaScript][CSS]，样式请在脚本入口文件引入.
*  Build之前请删除[dist]&[.cache]目录，当然你可以参考[Parcel-Bundler](https://parceljs.org/)禁止[cache]. 
*  你可以参考 [Parcel-Bundler](https://parceljs.org/) 或 [Github](https://github.com/parcel-bundler/parcel) .

## Other
Thank you for your support and guidance.
