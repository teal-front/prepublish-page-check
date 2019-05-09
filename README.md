### Intro
适用于对`vue`项目构建产物的错误检测。

内部使用`puppeteer`进行站点首页(`/index.html`)的错误检测，超时时间为`10s`。

若页面JS错误，中断执行，则`yarn run build`进程结果抛出`1`

`index.html`内文件找不到，也会中断进程，抛出`1`

### Usage
```json5
/// package.json

// prepublish-page-check的第二个参数，为构建后的目标文件夹
{
    "scripts": {
        "build": "node build/index.js && prepublish-page-check ./dist"
    }
}
```
