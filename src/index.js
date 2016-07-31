'use strict'

require('nomoreunhandledrejections')()

const express = require('express')
const cons = require('consolidate')
const path = require('path')
const morgan = require('morgan')
const scssMiddleware = require('./middleware/scss')
const staticMiddleware = require('./middleware/static')

const workdir = process.cwd()
const httpPort = process.env.HTTP_PORT || 3000
const app = express()

const baseViewModel = {
  title: `King's Reach – LiF:YO game server`
}

//
// Setup
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
useSimpleRoute('/events', 'pages/events', baseViewModel)
useSimpleRoute('/money', 'pages/money', baseViewModel)
useSimpleRoute('/screenshots', 'pages/screenshots', baseViewModel)
useSimpleRoute('/contact', 'pages/contact', baseViewModel)

app.get('/map', async (req, res) => {
  const viewModel = Object.assign({}, baseViewModel, { fixed: true })
  res.render('pages/map', viewModel)
})

//
// Run
//
app.listen(httpPort, () => console.log(`Listening on port ${httpPort}`))
