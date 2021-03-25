const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const session = require('express-session')

app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

const formatPrice = require('./helpers/changeNumber')
app.locals.formatPrice = formatPrice

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

const router = require('./routers')
app.use('', router)
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})