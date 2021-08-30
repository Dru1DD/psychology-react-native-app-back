const User = require('../model/User')
const ListOfDiagrams = require('../model/ListOfDiagrams')
const bcrypt = require('bcryptjs');


// const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
// const {secret} = require("../config/config")

// const generateAccessToken = (id) => {
//     const payload = {
//         id
//     }
//     return jwt.sign(payload, secret, {expiresIn: "24h"} )
// }

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {email, username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({email, username, password: hashPassword})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!email) {
                return res.status(400).json({message: `Пользователь ${email} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            // const token = generateAccessToken(user._id, user.roles)
            return res.json(user)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async getUser(req, res) {
        try {
            const { email } = req.body
            const user = await User.findOne({email})
            return res.json(user)
        } catch(e) {
            console.log(e)
        }
    }

    async passwordChange (req, res) {
        try {
            const { email, password } = req.body

            const hashPassword = bcrypt.hashSync(password, 7)

            const user = await User.findOneAndUpdate({ email }, {
                password: hashPassword
            })
            await user.save()
            res.status(200).json({message: "SUCCESS"})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()
