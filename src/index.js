'use strict'

require('nomoreunhandledrejections')()

const express = require('express')
const cons = require('consolidate')
const path = require('path')
const morgan = require('morgan')
const database = require('./database')
const scssMiddleware = require('./middleware/scss')
const staticMiddleware = require('./middleware/static')
const events = require('../data/events.json')

//
// Initial setup
//
const app = express()
const workdir = process.cwd()
const httpPort = process.env.HTTP_PORT || 3000
const mysqlConfig = {
  host: process.env.MYSQL_HOST || '',
  port: process.env.MYSQL_PORT || '',
  user: process.env.MYSQL_USER || '',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || ''
}

const baseViewModel = {
  title: `King's Reach – LiF:YO game server`
}

//
// Data access
//
const DATA_REFRESH_INTERVAL = 3000*1000 //seconds*ms
const refreshKills = () => {
  console.log('refreshKills')
  database.getKills((err, data) => {
    if (!err) baseViewModel.kills = data
    setTimeout(refreshKills, DATA_REFRESH_INTERVAL)
  })
}
const refreshBannedCharacters = () => {
  console.log('refreshBannedCharacters')
  database.getBannedCharacters((err, data) => {
    if (!err) baseViewModel.bannedCharacters = data
    setTimeout(refreshBannedCharacters, DATA_REFRESH_INTERVAL)
  })
}

database.initialise(mysqlConfig, () => {
  refreshKills()
  refreshBannedCharacters()
})


//
// App setup
//
app.engine('dust', cons.dust)
cons.dust.helpers = require('dustjs-helpers')
app.set('view engine', 'dust')
app.set('views', path.join(workdir, 'views'))

app.use(morgan('combined'))
app.use(scssMiddleware)
app.use('/public', staticMiddleware)

//
// Routes
//
const useSimpleRoute = (path, page, viewModel) => {
  app.get(path, async (req, res) => {
    res.render(page, viewModel)
  })
}

useSimpleRoute('/', 'pages/index', baseViewModel)
useSimpleRoute('/index', 'pages/index', baseViewModel)
useSimpleRoute('/rules', 'pages/rules', baseViewModel)
useSimpleRoute('/money', 'pages/money', baseViewModel)
useSimpleRoute('/banned', 'pages/banned', baseViewModel)
useSimpleRoute('/stats', 'pages/stats', baseViewModel)
useSimpleRoute('/killboard', 'pages/killboard', baseViewModel)
useSimpleRoute('/screenshots', 'pages/screenshots', baseViewModel)
useSimpleRoute('/contact', 'pages/contact', baseViewModel)
useSimpleRoute('/basilmod', 'pages/basilmod', baseViewModel)

app.get('/events', async (req, res) => {
  const viewModel = Object.assign({}, baseViewModel, { events: events.reverse() })
  res.render('pages/events', viewModel)
})

app.get('/map', async (req, res) => {
  const viewModel = Object.assign({}, baseViewModel, { fixed: true })
  res.render('pages/map', viewModel)
})

//
// Run
//
app.listen(httpPort, () => console.log(`Listening on port ${httpPort}`))
