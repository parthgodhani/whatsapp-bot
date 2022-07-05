const express = require('express');
var cors = require('cors');
var http = require('http');
var aedes = require('aedes')();
const ws = require('websocket-stream')
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const app = express()
app.use(cors())
const port = 3001
// ["919913638432@c.us", "916356545262@c.us", "919016913165@c.us", "919601291097@c.us", "916351684120@c.us"]
// "918160044816@c.us" => dhami
// "916351684120@c.us" => hardik 
app.get('/', async (req, res) => {
    // dhrumesh
    new Worker("./threads/whatsapp_client.js", {
        workerData: {
            target: ["919913638432@c.us", "916356545262@c.us", "919016913165@c.us", "919601291097@c.us", "919428745658@c.us"],
            session: {
                WABrowserId: '"3C1mLtj2xQp/ExvsrkHUKQ=="',
                WASecretBundle: '{"key":"V8ZEaS6oEGhicHhup/Xugl+BHDrA4szC898SKFKGIBk=","encKey":"Dy5zUwpGObO3HMtegI0zuE/pKKvsDukku9ZrnJBACyU=","macKey":"V8ZEaS6oEGhicHhup/Xugl+BHDrA4szC898SKFKGIBk="}',
                WAToken1: '"JpU7GvmKyNOxNQqpSX1Soz/jJF+/XtTSTzXMTGu2rUY="',
                WAToken2: '"1@o4tO7GJWltkhKVbFh9j+Z6RszchcJzVlXq/nLDWzlRtQDYC1o9sX55mFNN7ptEeAfFn8QZCV7VrBfw=="'
            }
        }
    })



    // chandresh kathirya
    new Worker("./threads/whatsapp_client.js", {
        workerData: {
            target: ["919913638432@c.us", "916356545262@c.us", "919016913165@c.us", "919601291097@c.us"],
            session: {
                WABrowserId: '"GYpIi8RGn8dIRNxFsEbulA=="',
                WASecretBundle: '{"key":"31Lk7o7WJ5jHiZpuyCV6FCitQcVpLwRm7aa9nKMg4cQ=","encKey":"wXBvStHx6CzlMKnAwrE6yKUMQK2eBuOCAJZy3StFZv4=","macKey":"31Lk7o7WJ5jHiZpuyCV6FCitQcVpLwRm7aa9nKMg4cQ="}',
                WAToken1: '"XM6LSyBjxlXzwwBuBQOJDIWyNDFRpkE4Ubt3yJwOeyk="',
                WAToken2: '"1@8KjPRkijtoT4lxdbrS4QYXH49zJchZUU6jq/8T/H5V3byIDhB99tPuZRYY51zArBHrPDUKxksgDrPA=="'
            }
        }
    })


    new Worker("./threads/whatsapp_client.js", {
        workerData: {
            target: ["919913638432@c.us", "916356545262@c.us", "919016913165@c.us", "919601291097@c.us"],
            session: {
              WABrowserId: '"+DO74/wRe9dN7ZYcZEIgsw=="',
              WASecretBundle: '{"key":"3gdPRTjNPmqZsEQqkm6DfNoSqCtDbQAEgJOk14reTcE=","encKey":"ZnmFBHw3qFUE6w+e3yCWfJNMfg1FigKobJcMqINHlT0=","macKey":"3gdPRTjNPmqZsEQqkm6DfNoSqCtDbQAEgJOk14reTcE="}',
              WAToken1: '"KazsYxUsqiK1sWjBMIvlh80NwuvMzaHJ7I+TYOUh6HGg2Y3oB3n8+J0kXRQV3T5fiI00QBFPORekT31tdKxI3A=="',
              WAToken2: '"1@YKNr4g+PeqZ7LyDSPmb49dibHKJ4vgNnuE6Jvx7qE4CuiW0EpvvA7M3OalufMT0NsVqlYB9HRmS0hw=="'
            }
        }
    })


    // new Worker("./threads/whatsapp_client.js", { workerData: [] })
    res.json({ msg: "mqtt enable" });
})

app.set('port', port);
var server = http.createServer(app);

ws.createServer({ server: server }, aedes.handle)
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



