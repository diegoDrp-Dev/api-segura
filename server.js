require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const app = express()
app.use(express.json())

const PORT = 3000
const SECRET = process.env.JWT_SECRET

const usersFile = './users.json'
const logsFile = './logs.txt'

function getUsers() {
  if (!fs.existsSync(usersFile)) return []
  return JSON.parse(fs.readFileSync(usersFile))
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

function logEvent(event) {
  fs.appendFileSync(logsFile, event + '\n')
}

// REGISTER
app.post('/register', async (req, res) => {
  const { username, password } = req.body

  const users = getUsers()
  const hashedPassword = await bcrypt.hash(password, 10)

  users.push({ username, password: hashedPassword })
  saveUsers(users)

  res.json({ message: 'Usuário criado com segurança' })
})

// LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const users = getUsers()

  const user = users.find(u => u.username === username)

  if (!user) {
    logEvent(`Login falhou: ${username}`)
    return res.status(400).json({ error: 'Usuário não encontrado' })
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    logEvent(`Senha incorreta: ${username}`)
    return res.status(400).json({ error: 'Senha inválida' })
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' })

  logEvent(`Login sucesso: ${username}`)
  res.json({ token })
})

// AUTH
function auth(req, res, next) {
  const token = req.headers.authorization

  if (!token) return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch {
    res.sendStatus(403)
  }
}

// ROTA PROTEGIDA
app.get('/dashboard', auth, (req, res) => {
  res.json({ message: `Bem-vindo ${req.user.username}` })
})

// SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})