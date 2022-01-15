const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

//Importamos variables dotenv
require('dotenv').config();

router.get('/', (req, res) => {
    res.send("We are on user section");
});

router.post('/login', (req, res) => {
    if (req.body.usuario == "admin" && req.body.password == "123456") {
        const payload = { //data to return in json format
            check : true        
        };

        //Se firma la petición y se genera el token
        const token = jwt.sign(payload, process.env.API_KEY, {
            expiresIn : '7d' //Tiempo de expiración
        });

        //const token = "ochodedos";

        res.json({
            message : 'Autenticación Exitosa',
            token : token
        });
    } else {
        res.json({
            error : 'Usuario Incorrecto',
        });
    }
});


const verificacion = express.Router();

verificacion.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        res.status(401).send({
            error : 'Es necesario un token de autenticacion'
        })
        return
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        console.log(token);
    }
    
    if (token) {
        jwt.verify(token, process.env.API_KEY, (error, decoded) => {
            if (error) {
                return res.json({
                    message : 'El token no es válido'
                });
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }
    
});

router.get('/info', verificacion,(req, res) => {
    res.json('VERIFICACION DE CLAVE PRIVADA APROBADA...')
});

module.exports = router;
