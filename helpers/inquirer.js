const inquirer = require('inquirer');
const colors = require('colors');

const inquirerMenu = async() => {

    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: 'Que desea hacer?',
            choices: [
                {
                    value: 1,
                    name: `${'1'.green}. Buscar ciudad`
                },
                {
                    value: 2,
                    name: `${'2'.green}. Historial`
                },
                {
                    value: 0,
                    name: `${'0'.green}. Salir`
                },
            ]
        }
    ];

    console.clear();
    console.log('========================================'.green);
    console.log('Selecciona una opcion'.white );
    console.log('========================================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pause = async() => {
    let preguntas = [
        {
            type: 'input',
            name: 'tecla',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const leerInput = async (message) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async(lugares = []) => {
    const choices = lugares.map((lugar, indice) => {
        return{
            value: lugar.id,
            name: `${colors.green(indice + 1)}. ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione de la lista: ',
            choices
        }];
    
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) =>{
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, indice) => {
        return {
            value: tarea.id,
            name: `${colors.green(indice + 1)}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}


module.exports = {
    inquirerMenu, 
    pause,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}