const qrcode = require('qrcode-terminal')
const Posts = require('./src/posts')
const status = require('./src/status')

const posts = new Posts

const { Client, LocalAuth } = require('whatsapp-web.js')
const client = new Client({
    authStrategy: new LocalAuth()
    // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
});

// let onOff = []

client.on('qr', qr => {
    qrcode.generate(qr, { small: true })
});

client.on('ready', () => {
    console.log('Client is ready!')
});

client.initialize();

client.on('message', message => {
    // if (message.body.startsWith('/on')) {
    //     onOff = []
    //     onOff.push(true)
    // }
    // if (message.body.startsWith('/off')) {
    //     onOff = []
    //     onOff.push(false)
    // }
    // console.log(message)
    posts.baixar(message)
    status(message)
})