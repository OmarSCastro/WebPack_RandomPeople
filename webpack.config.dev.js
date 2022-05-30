// Aqui vamos a especificar las caracteristicas que tomen nuestro diferentes modos 
// Aqui se configurará el modo de desarrollo

// Este archivo va a ser nuestro recurso, principal, en el vamos a trabajar todas las configuraciones que se van 
// añadir a nuestro proyecyo como los loaders y plugins, etc

// // La constante path va a utilizar un require que nos va a ayudar a traer este elemento 'path'
const path = require('path');

// //La constante HtmlWebpackPlugin va a requerir el plugin del webpack para html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// //La constante HtmlWebpackPlugin va a requerir el plugin del webpack para html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// //La constante va a requerir el plugin para copiar nuestros recursos al dist
const CopyPlugin = require('copy-webpack-plugin');



const Dotenv = require('dotenv-webpack')



// // Vamos a crear un modulo que vamos a exportar con un objeto con la configuracion 
module.exports = {

//   // entry nos va a permitir cual es el punto de entrada que va a utilizar nuestra aplicacion
  entry: './src/index.js',

// output es hacia donde vamos a enviar lo que va a preparar webpack, usaremos un objeto vamos 
// añadir los elementos internos para trabajar
  output: {

//     // este path nos permite saber en donde se encuentra nuestro directorio y poderlo usar
    path: path.resolve(__dirname, 'dist'),

//     // ahora le pondremos un nombre al archivo resultante tipo javascript donde se va a unificar
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },

//   Especificamos el modo que se va a generar
  mode: 'development',

  //Este webpack watch sirve para que este atento a cualquier cambio que se haga
  // en el proyecto y lo compile automaticamente uan vez que se guarde, otra manera
  //De activarlo es desde el script del packaga-json
  watch: true,    
  


//   // Ahora pasamos con que extensiones vamos a trabajar en este proyecto
  resolve: {

//     // Definimos que extensiones va a tener que usar nuestro proyecto por ejemplo, en este solo usaremos
//     // .js pero si fuera el caso de react o svelte tendriamos que especificar sus extensiones
    extensions: ['.js'],

    // En este alias vamos a poner un alias a rutas de navegacion para que las importaciones sean mas faciles de leer 
    // y practicas, el alias sera un objeto donde vamos a estableces cada configuracion
    alias: {
      //El arroba antes es para identificarlo como un alias
      '@utils':     path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles':    path.resolve(__dirname, 'src/styles/'),
      '@images':    path.resolve(__dirname, 'src/assets/images/'),
    }


  },

//   // module va a tener una serie de elementos particulares
  module: {


//     // Las rules son las reglas que vamos a establecer para saber como 
//     // vamos a trabajar con archivos o elementos de nuestro proyecto
    rules: [


       // Este objeto va a ser para trabajar con babel-loader, conecta el webpack con babel
      {

        //El test nos permite especificar con que extensiones vamos a trabajar
        test: /\.m?js$/,   //Expresion regular para definir que trabaje con archivos mjs o js

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

//         // Especificamos que vamos a utilizar el loader de babel
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },

      //Creamos la regla para poder optimizar nuestras imagenes y llevar a cabo una mejor estructura de 
      // programacion
      {

        // Mediante una expresión regular definir la extensión de archivos que vamos a utilizar, en este caso
        // png, pero si son imagenes puede ser png, jpg, jpeg entre otros
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          }
        }
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
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({

      // Aqui vamos a hacer la configuracion de los recursos que queremos copiar a nuestra carpeta dist

      patterns: [
        {
          // En este objeto vamos a establecer desde donde vamos a copiar y a donde vamos a pegar
          from: path.resolve(__dirname, "src", "assets/images"),

          to: "assets/images"

        }
      ]

    }),
    new Dotenv(),
  ],
  
}


