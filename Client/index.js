const { join } = require('path')
const chalk = require('chalk')
const config = require(join(__dirname, '../config.json'))
const net = require('net')

const PORT = config.port
const HOST = config.host

const client = new net.Socket()

// Подключаемся к серверу
client.connect(PORT, HOST, () => {
  // Обрабатываем событе на получение данных с сервера
  client.on('data', (data) => {
    console.log(chalk.blue(`Пришли данные с сервера: ${data}`))
  })

  // Отправляем серверу сообщение
  client.write(`Привет от клиента ${client.address().address}!!!\n`)

  console.log(chalk.blue('Client - active'))
})
