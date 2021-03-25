const router = require('express').Router()
const Controller = require('../controllers')

const isLoggin = (req, res, next) => {
    if (req.session.userId) {
        console.log(req.session.username + 'login')
        next()
    } else {
        res.redirect('/login?error=Please login first')
    }
}

// const isAlready = (req, res, next) => {
//     if (req.session.userId) {
//         res.redirect('/')
//     }
// }

router.get('/', Controller.home)
router.get('/login', Controller.login)
router.post('/login', Controller.loginPOST)
router.get('/logout', Controller.logout)
router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)
router.get('/buy/:id_product', Controller.productDetail)
router.post('/buy/:id_product', isLoggin, Controller.buyItem)
router.get('/cart', isLoggin, Controller.cartUser)
router.get('/cancel/:id_product', isLoggin, Controller.cancel)
router.get('/pay/:id_product', isLoggin, Controller.pay)
router.get('/cart/edit/:id_product', isLoggin, Controller.edit)
router.post('/cart/edit/:id_product', isLoggin, Controller.editPost)

module.exports = router