//  Vamos a trabajar con un modulo de Node entonces requerimos file system
// Este modulo nos permite trabajar con el sistema operativo y nos permite guardar,
// enviar datos

const fs = require('fs');


// Este método nos permite crear el archivo 
// ('Primero se define donde y como se llamará', 'Y aqui llenamos el archivo')
fs.writeFileSync('./.env', `API=${process.env.API}\n`)