#!/usr/bin/env node

/**
 * 以dist目录起http服务，用puppeteer进行运行错误检测
 *
 * 等待页面加载，10秒内页面加载完且没有报错，则正常退出；
 * 否则抛出错误，exitCode为`1`
 *
 *
 * ./index.js $dist_directory
 */

const PROJECT_DIR = process.argv[2]
const fs = require('fs')
const createStaticHTTPServer = require('./lib/create-static-http-server')
const runPuppeteer = require('./lib/run-puppeteer')

console.log('process start', new Date().toString())
process.on('exit', () => {
    console.log('process exit', new Date().toString())
})


if (!(fs.existsSync(PROJECT_DIR) && fs.statSync(PROJECT_DIR).isDirectory())) {
    console.log('参数错误，找不到目录或非目录文件')
    process.exit(1)
}

(async function run() {
    const srv = createStaticHTTPServer(PROJECT_DIR)
    const port = srv.address().port

    runPuppeteer(`http://127.0.0.1:${port}`).then(() => {
        srv.close()
        console.log('puppeteer test ok')
    }).catch((err) => {
        console.log(err)
        process.exit(1)
    })
})()
