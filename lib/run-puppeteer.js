/// use puppeteer check

const puppeteer = require('puppeteer')
const TIMEOUT = 10000 // 10 seconds

module.exports = function createPuppeteer(url) {
    return new Promise(async (resolve, reject) => {
        let browser = await puppeteer.launch({headless: true})
        let page = await browser.newPage()

        page.on('pageerror', err => {
            reject(`pageerror: ${err}`)
        })
        page.on('error', err => {
            reject(`nodejs error: ${err}`)
        })
        await page.goto(url)
        let res = await page.waitForFunction("document.readyState === 'complete'", {
            polling: 'raf', // requestAnimationFrame
            timeout: TIMEOUT
        })
        if (!res) {
            reject(`page load timeout: page load timeout within ${TIMEOUT}`)
        }
        await browser.close()
        resolve()
    })
}
