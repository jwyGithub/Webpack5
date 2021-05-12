## Webpack@5

##### 目录结构
    |-- .gitignore 								#git忽略文件
    |-- jsconfig.json							#js配置文件
    |-- package.json
    |-- postcss.config.js						#样式兼容文件
    |-- build									#webpack构建目录
    |   |-- webpack.config.base.js				#webpack基础配置
    |   |-- webpack.config.dev.js				#webpack开发配置
    |   |-- webpack.config.prod.js				#webpack生产配置
    |   |-- webpack.config.test.js				#webpack测试配置
    |-- config									#其它配置项
    |   |-- gitInfo.js							#git提交信息
    |-- public
    |   |-- index.html
    |   |-- json
    |       |-- index.json
    |-- src
        |-- index.js
        |-- assets
        |   |-- css
        |   |   |-- reset.less
        |   |-- imgs
        |   |   |-- timg.jpg
        |   |-- js
        |-- views
            |-- config
                |-- axios.js

### 开启服务

```
npm start
```

### 打包测试环境

```
npm run build:test
```

### 打包生产环境

```
npm run build:pro
```
