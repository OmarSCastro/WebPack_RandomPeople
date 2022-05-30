//Recordando  que utilizamos los @ para hacer mension a los alias que configuramos en nuestro
// archivo de configuración de webpack

import Template from '@templates/Template.js';
import '@styles/main.css';
import '@styles/vars.styl';


(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
