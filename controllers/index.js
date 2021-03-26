const { User, Item, Transaction } = require("../models/index");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

class Controller {
  static home(req, res) {
    Item.findAll()
      .then((data) => {
        res.render("home", { data });
      })
      .catch((err) => res.send(err));
  }
  static login(req, res) {
    let errorMessage = "";
    if (req.query.error) errorMessage = req.query.error;

    res.render("login", { errorMessage });
  }

  static loginPOST(req, res) {
    const { username, password } = req.body;

    User.findOne({ where: { username } })
      .then((user) => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password);
          // console.log(isValidPassword)

          if (isValidPassword) {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.userEmail = user.email;

            res.redirect("/");
          } else {
            res.redirect(
              "/register?error=username dan password invalid, please register"
            );
          }
        } else {
          res.redirect(
            "/register?error=username dan password invalid, please register"
          );
        }
      })
      .catch((err) => res.send(err));
  }

  static logout(req, res) {
    req.session.destroy();

    res.redirect("login?error=You are logged out.");
  }

  static register(req, res) {
    let errorMessage = "";
    if (req.query.error) errorMessage = req.query.error;

    res.render("register", { errorMessage });
  }

  static registerPost(req, res) {
    const { username, email, password } = req.body;
    const newData = { username, email, password };

    User.create(newData)
      .then((data) => res.redirect("/login"))
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          const errors = err.errors.map((e) => e.message);
          res.send(errors);
        } else {
          res.send(err);
        }
      });
  }

  static showTransaction(req, res) {
    Transaction.findAll({
      include: [User, Item],
    })
      .then((data) => {
        res.render("", { data });
      })
      .catch((err) => res.send(err));
  }
  static deleteTransaction(req, res) {
    let id = +req.params.id;
    Movie.destroy({ where: { id } })
      .then(() => res.redirect("/"))
      .catch((err) => res.send(err));
  }

  static buyItem(req, res) {
    const id = req.params.id_product;
    const order = {
      ItemId: +id,
      UserId: req.session.userId,
      quantity: +req.body.quantity,
      paid_status: false,
      TransactionId: +id,
      totalPrice: req.body.totalPrice,
    };

    Transaction.create(order)

      .then(() => res.redirect("/"))
      .catch((err) => res.send(err));
  }

  static productDetail(req, res) {
    const id = parseInt(req.params.id_product);

    Item.findByPk(id)
      .then((data) => {
        res.render("product-buy", { data });
      })
      .catch((err) => res.send(err));
  }

  static cartUser(req, res) {
    let userId = req.session.userId;

    User.findOne({
      where: { id: userId },
      include: Item,
    })
      .then((data) => {
        // res.send(data)
        res.render("cart", { data });
      })
      .catch((err) => res.send(err));
  }

  static pay(req, res) {
    let userId = req.session.userId;
    let productId = +req.params.id_product;
    Transaction.findOne({
      where: { UserId: userId, ItemId: productId },
      order: [["id", "ASC"]],
    })
      .then((data) => {
        nodemailer.createTestAccount((err, account) => {
          if (err) {
            console.log("failed to create testing account" + err.message);
            return process.exit(1);
          }

          console.log("sending message");

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "pairprojectGadgetShop",
              pass: "h8PairProject",
            },
          });

          let message = {
            from: "pairprojectGadgetShop",
            to: req.session.userEmail,
            subject: "Thank you for Shopping",
            html: "<b><h3>Enjoy it with new Phone</h3></b>",
          };

          transporter.sendMail(message, (err, info) => {
            if (err) {
              console.log("error : " + err.message);
              return process.exit(1);
            }

            console.log("Message sent: $s" + info.messageId);
          });
        });

        data.paid_status = true;
        data.save();
        res.redirect("/cart");
      })
      .catch((err) => res.send(err));
  }

  static cancel(req, res) {
    let TransactionId = +req.params.id_product;
    Transaction.destroy({ where: { TransactionId } })
      .then(() => res.redirect("/cart"))
      .catch((err) => res.send(err));
  }
  static edit(req, res) {
    let TransactionId = +req.params.id_product;
    let transaction;
    Transaction.findOne({ where: { TransactionId } })
      .then((data) => {
        transaction = data;
        return Item.findByPk(data.ItemId);
      })
      .then((data) => {
        let item = data;
        res.render("edit", { item, transaction });
      })
      .catch((err) => res.send(err));
  }

  static editPost(req, res) {
    let TransactionId = +req.params.id_product;
    Transaction.findOne({ where: { TransactionId } })
      .then((data) => {
        let value = {
          ItemId: data.ItemId,
          quantity: +req.body.quantity,
        };
        Transaction.update(value, {
          where: { TransactionId },
          individualHooks: true,
        });
      })
      .then(() => res.redirect("/cart"))
      .catch((err) => res.send(err));
  }
}

module.exports = Controller;
