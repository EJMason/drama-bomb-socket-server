const SocketCluster = require('socketcluster').SocketCluster

const environment = process.env.ENV || 'dev'

const options = {
  workers: Number(process.env.SOCKETCLUSTER_WORKERS) || 1,
  brokers: Number(process.env.SOCKETCLUSTER_BROKERS) || 1,
  port: Number(process.env.SOCKETCLUSTER_PORT) || 8000,

  environment,

  wsEngine: 'uws',

  authPublicKey: process.env.TOKEN_SECRET || null,
  authAlgorithm: 'HS256',

  // Reboot workers when they crash - This is a necessity
  // in production but can be turned off for debugging
  rebootWorkerOnCrash: true,

  workerController: __dirname + '/worker.js',
  brokerController: __dirname + '/broker.js',
  socketChannelLimit: 1000,

  protocol: process.env.PROTOCOL || 'http',

  // 1 - Errors  |  2 - Notices  |  3 - Everything
  logLevel: 2,

  socketUpgradeTimeout: 1000,

  origins: '*:*',

  pingInterval: 25000,

  // How many milliseconds to wait without receiving a ping
  // before closing the socket
  pingTimeout: 60000,

  // Lets you specify a host name to bind to - Defaults to
  // 127.0.0.1 (localhost)
  // host: null,

  // The path to a file used to bootstrap either worker or broker process.
  // initController: null,

  // By default, SC will reboot all workers when it receives a 'SIGUSR2' signal -
  // This can be used for updating workers with fresh source code in production
  rebootOnSignal: true,

  // The URL path reserved by SocketCluster clients to interact with the server
  // path: '/socketcluster',

  // The root directory in which to store your socket files in Linux.
  // socketRoot: null,

  // Whether or not clients are allowed to publish messages to channels
  allowClientPublish: true,

  // By default, when you send a 'kill -SIGUSR2' signal to the master process,
  // it will reboot all workers, you can turn this behavior off by setting this
  // option to false
  rebootOnSignal: true,

  // This option is passed to the Node.js HTTP server if provided
  tcpSynBacklog: null,

  // SC keeps track of request per minutes internally - This allows you to change
  // how often this gets updated
  workerStatusInterval: 10000,

  // The default clustering/brokering engine (Node.js module name) which provides the
  // SCWorker.exchange object and manages brokers behind the scenes.
  // You shouldn't need to change this unless you want to build your own
  // process clustering engine (which is difficult to do).
  brokerEngine: 'sc-broker-cluster'
}


const start = function () {
  const socketCluster = new SocketCluster(options)
}

start()
