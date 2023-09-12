const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer")
const Busquedas = require("./models/busquedas")



const main = async () => {

  const busquedas = new Busquedas()
  let opt

  do {
    opt = await inquirerMenu()
    
    switch (opt) {
      case 1:

        const lugar = await leerInput('Ciudad: ')
        console.log(lugar)
      
      console.log('\nInformación de la ciudad\n'.green)
      console.log('Ciudad: '.green)
      console.log('Latitud: '.green)
      console.log('Longitud: '.green)
      console.log('Temperatura: '.green)
      console.log('Mínima: '.green)
      console.log('Máxima: '.green)
        
        break;
      case 2:
        
        break;
      case 3:
        
        break;    
    }


    if( opt !== 0 ) await pausa()

  } while (opt !== 0) 
}

main()