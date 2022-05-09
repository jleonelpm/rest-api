const express = require('express');
//const bcrypt = require('bcrypt');
const crypto = require("crypto");

const router = express.Router();
const jwt = require("jsonwebtoken");

//Importamos variables dotenv
require('dotenv').config();



router.post('/login', (req, res) => {
    //console.log(req.body.usuario);
    //console.log(req.body.password);
    //hash = '$2b$16$kX63qQhUX/0E5g3yUCDXeeiWkXdqy79R.PkL26i3E13LDcEI725mK';
    
    //console.log(req.body.password);

    var name = '123';
    var hash = crypto.createHash('sha256').update(name).digest('hex');
    
    //if (req.body.usuario == "admin" && bcrypt.compare(req.body.password, hash)) {
    if (req.body.usuario == "admin" && req.body.password == hash) {
        const payload = { //data to return in json format
            check : true,
            usuario : req.body.usuario,
            password : req.body.password
        };
        
        //Se firma la petición y se genera el token
        const token = jwt.sign(payload, process.env.API_KEY, {
            algorithm: 'HS256',            
            expiresIn : '5m' //Tiempo de expiración
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


/////OJO OJO OJO OJO 
//eL COMPARE DEBE ESTAR EN EL ESTE METODO NO EN EL LOGIN
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
        //console.log(token);
    }
    
    if (token) {

        //var decoded = jwt.decode(token, process.env.API_KEY);
        //console.log(decoded.usuario);
        //console.log(decoded.payload);

        jwt.verify(token, process.env.API_KEY, (error, decoded) => {      

            var decoded = jwt.decode(token, process.env.API_KEY);
            //var decoded = jwt.decode(token, {complete: true});
            //console.log(decoded.header);
            //console.log(decoded.payload); 
            //console.log(decoded.usuario);   
            
            if (error) {
                return res.json({
                    message : 'El token no es válido',
                    error :  error
                });
            }else{                
                req.decoded = decoded;
                next();
            }
        });


        
    }    
});

router.get('/', verificacion, (req, res) => {
    res.send("We are on user section");
});

router.get('/info', verificacion,(req, res) => {
    res.json(req.decoded)
    console.log("Certificado Válido")
});

module.exports = router;
