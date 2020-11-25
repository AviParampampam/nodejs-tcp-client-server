const { join } = require('path')
const chalk = require('chalk')
const config = require(join(__dirname, '../config.json'))
const net = require('net')

const PORT = config.port
const HOST = config.host

const server = net.createServer()
let sockets = []

// Прослушиваем событие на подключение
server.on('connection', (sock) => {
  console.log(chalk.yellow(`Подключение: ${sock.remoteAddress}:${sock.remotePort}`))
  sockets.push(sock)

  // Прослушиваем событие на получение данных от клиента
  sock.on('data', (data) => {
    console.log(chalk.yellow(`Пришли данные с ${sock.remoteAddress}: ${data}`))
    // Отправляем данные обратно клиенту с сервера
    sockets.forEach((sock) => {
      sock.write(`${sock.remoteAddress}:${sock.remotePort} сказал ${data} \n`)
    })
  })

  // Прослушиваем событие на закрытие соединения
  sock.on('close', (data) => {
    const index = sockets.indexOf(sock)
    sockets.splice(index, 1)
  })
})

server.listen(PORT, HOST, () => {
  console.log(chalk.yellow('Server - active'))
})
