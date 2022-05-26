// Este archivo va a ser nuestro recurso, principal, en el vamos a trabajar todas las configuraciones que se van 
// añadir a nuestro proyecyo como los loaders y plugins, etc

// La constante path va a utilizar un require que nos va a ayudar a traer este elemento 'path'
const path = require('path');

//La constante HtmlWebpackPlugin va a requerir el plugin del webpack para html
const HtmlWebpackPlugin = require('html-webpack-plugin');

//La constante HtmlWebpackPlugin va a requerir el plugin del webpack para html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// Vamos a crear un modulo que vamos a exportar con un objeto con la configuracion 
module.exports = {

  // entry nos va a permitir cual es el punto de entrada que va a utilizar nuestra aplicacion
  entry: './src/index.js',

  // output es hacia donde vamos a enviar lo que va a preparar webpack, usaremos un objeto vamos 
  // añadir los elementos internos para trabajar
  output: {

    // este path nos permite saber en donde se encuentra nuestro directorio y poderlo usar
    path: path.resolve(__dirname, 'dist'),

    // ahora le pondremos un nombre al archivo resultante tipo javascript donde se va a unificar
    filename: 'main.js',
  },

  // Ahora pasamos con que extensiones vamos a trabajar en este proyecto
  resolve: {

    // Definimos que extensiones va a tener que usar nuestro proyecto por ejemplo, en este solo usaremos
    // .js pero si fuera el caso de react o svelte tendriamos que especificar sus extensiones
    extensions: ['.js']
  },

  // module va a tener una serie de elementos particulares
  module: {

    // Las rules son las reglas que vamos a establecer para saber como 
    // vamos a trabajar con archivos o elementos de nuestro proyecto
    rules: [

       // Este objeto va a ser para trabajar con babel-loader, conecta el webpack con babel
      {

        //El test nos permite especificar con que extensiones vamos a trabajar
        test: /\.m?js$/,//Expresion regular para definir que trabaje con archivos mjs o js

        //Excluimos o especificamos que no utilice nada de node modules
        exclude: /node_modules/,

        // Especificamos que vamos a utilizar el loader de babel
        use: {
          loader: 'babel-loader'
        }
      },
      {
        //El test nos permite especificar con que extensiones vamos a trabajar
        test: /\.css|.styl$/i,//Expresion regular para definir que trabaje con archivos css

        // Especificamos que vamos a utilizar el loader de babel
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          
        ],
      }
    ]
  },

  // Agregamos los plugins que vamos a utilizar
  plugins: [

    // Instanciamos nuestro plugin que inicializamos arriba
    new HtmlWebpackPlugin({
      inject: true,

      // Le indicamos nuestro punto de entrada
      template: './public/index.html',

      // Indicamos como se llamará nuestro archivo destino
      filename: '/index.html'
    }),
    new MiniCssExtractPlugin(),
  ]
}

