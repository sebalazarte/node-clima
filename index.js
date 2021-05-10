require('dotenv').config();

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
                const lugarSel = lugares.find(l => l.id === id);
                console.log(lugarSel);

                //mostrar resultados
                console.log('\nInformacion de la ciudad:\n'.green);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('Latitud: ', lugarSel.lat);
                console.log('Longitud: ', lugarSel.lng);
                console.log('Temperatura: ');
                console.log('Minima: ');
                console.log('Maxima: ');
                break;
            case 2:
                break;


            default:
                break;
        }

        if (opt !== 0) await pause();
    } while (opt !== 0);

}

main();