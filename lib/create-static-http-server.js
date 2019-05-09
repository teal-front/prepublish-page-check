/// create simple http server
/// 文件不存在会退出进程, exitCode为`1`

const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

// maps file extention to MIME types
const MIME_TYPE = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
}

module.exports = function createStaticHTTPServer(folder) {
    return http.createServer((req, res) => {
        let {pathname} = url.parse(req.url);
        pathname = path.join(folder, pathname);

        let exist = fs.existsSync(pathname)
        if (!exist) {
            console.log(`${pathname} not exist`)
            process.exit(1)
        }
        if (fs.statSync(pathname).isDirectory()) {
            pathname += '/index.html';
            if (!fs.existsSync(pathname)) {
                console.log(`${folder} no index.html`)
                process.exit(1)
            }
        }

        const ext = path.parse(pathname).ext;
        res.setHeader('Content-type', MIME_TYPE[ext] || 'text/plain');
        res.end(fs.readFileSync(pathname))
    }).listen(0);
}
