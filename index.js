require('dotenv').config();
const colors = require('colors');

const { inquirerMenu, leerInput, pause, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {

    const busquedas = new Busquedas();
    
    let opt = '';
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 0:
                break;
            case 1:
                //mostrar mensaje
                const inputBusqueda = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(inputBusqueda);

                // console.log(lugares);

                const id = await listarLugares(lugares);
                if (id === '0') {
                    continue;
                }

                const lugarSel = lugares.find(l => l.id === id);
                busquedas.agregarHistorial(lugarSel.nombre);
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                
                //mostrar resultados
                console.log('\nInformacion de la ciudad:\n'.green);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('Latitud: ', lugarSel.lat);
                console.log('Longitud: ', lugarSel.lng);
                console.log('Temperatura: ', clima.temp);
                console.log('Minima: ', clima.min);
                console.log('Maxima: ', clima.max);
                console.log('Descripcion: ', clima.desc);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, indice) => {
                   console.log(`${colors.green(indice + 1)}. ${lugar}`);
                });
                break;


            default:
                break;
        }

        if (opt !== 0) await pause();
    } while (opt !== 0);

}

main();