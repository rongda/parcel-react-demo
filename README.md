# system

system is a framework for React & React-redux & React-router with parcel bundle.

## Table of contents

* [How to user](#how-to-user)
* [What's included](#what-is-included)
* [Notice](#notice)
* [Other](#other)

### How to user
* install node environment.
* yarn install.
* yarn start.
* yarn production.
* yarn stage.
* or use npm.

### What's included

Within the download you'll find the following directories and files.
You'll see something like this:

```
/
├── build/                                                 // build script
│   ├── dev-server.js                                     
│   ├── prod-server.js
├── config/                                                // build config
│   ├── index.js                                     
├── src/
│   ├── assets/                                            // 静态资源、可自行规划目录
│   │   ├── .gitkeep
│   │   ├── favicon.ico
│   ├── script/                                            // 脚本目录、可自行规划目录(component等)
│   │   ├── api/                                           // 接口文件目录
│   │   │   ├── instance.js                                // base instance
│   │   │   ├── ...                                        // 可自行规划目录
│   │   │   ├── ...                                        
│   │   ├── component/                                     // 组件component文件、可自行规划目录
│   │   │   ├── ...                                        // 可自行规划目录
│   │   │   ├── ...                                        
│   │   ├── config/                                        // 脚本配置文件
│   │   │   ├── index.js                                   // 入口
│   │   │   ├── ...  
│   │   ├── container/                                     // 容器 、页面目录
│   │   │   ├── todo/                                      // 包含index.js入口
│   │   │   ├── ... 
│   │   ├── router/                                        // 路由配置文件
│   │   │   ├── config.js                                  // 配置
│   │   │   ├── index.js                                   // 入口
│   │   ├── static/                                        // 静态脚本数据
│   │   │   ├── ...                                       
│   │   │   ├── ...    
│   │   ├── store/                                         // Redux store  目前store目录还是简约版
│   │   │   ├── actions.js                                 // action 
│   │   │   ├── reducer/                                   // reducer
│   │   │   │   ├── index.js
│   │   │   │   ├── reducer1/                              // 包含index.js入口
│   │   │   │   ├── ... 
│   │   │   │   ├── ... 
│   │   │   ├── type.js                                    // type
│   │   ├── utils/                                         // 工具集
│   │   │   ├── ...                                       
│   │   │   ├── ...  
│   │   ├── index.js                                       // 脚本总入口文件
│   ├── style/                                             // 样式目录、可自行规划目录(lib、page等)
│   │   ├── base/                                          // base资源
│   │   ├── lib/                                           // lib资源
│   │   ├── page/                                          // 页面样式
│   │   ├── index.less                                     // 样式入口文件
│   ├── index.html                                         // 项目html入口文件      
├── .babelrc                                               // babel配置
├── .eslintrc.js                                           // eslint配置
├── .lessrc.js                                             // less配置
├── cssnano.config.js                                      // cssnano配置
├── .npmrc                                                 // npm registry
├── .gitignore                                             // gitignore 
├── package.json                                           // 依赖文件
├── yarn.lock                                              // yarn lock 文件
└── README.md                                              // 你懂的

```

## Notice

*  Build之前请删除[dist]&[.cache]目录，当然你可以参考[Parcel-Bundler](https://parceljs.org/)禁止[cache]. 
*  你可以参考 [Parcel-Bundler](https://parceljs.org/) 或 [Github](https://github.com/parcel-bundler/parcel) .
*  请尽量严格按照上面的目录文件.

## Other
Thank you for your support and guidance.
