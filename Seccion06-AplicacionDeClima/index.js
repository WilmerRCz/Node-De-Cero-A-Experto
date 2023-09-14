const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer")
const Busquedas = require("./models/busquedas")

const main = async () => {

  const busquedas = new Busquedas()
  let opt

  do {
    opt = await inquirerMenu()
    
    switch (opt) {
      case 1:

        const termino = await leerInput('Ciudad: ')
        const lugares = await busquedas.ciudad( termino )
        const idLugar = await listarLugares(lugares)
        if(idLugar === '0') continue;

        const lugarSelec = lugares.find(l => l.id === idLugar)
        busquedas.agregarHistorial(lugarSelec.nombre)
        
        const clima = await busquedas.climaLugar(lugarSelec.lat, lugarSelec.lng)

        console.clear()
        console.log('\nInformación de la ciudad\n'.green)
        console.log('Ciudad: ', lugarSelec.nombre.green)
        console.log('Latitud: ', lugarSelec.lat)
        console.log('Longitud: ', lugarSelec.lng)
        console.log('Temperatura: ', clima.temp)
        console.log('Mínima: ' , clima.min)
        console.log('Máxima: ', clima.max)
        console.log('Como está el clima: ', clima.desc.green)
        
        break;
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green
          console.log(`${idx} ${lugar} `)
        })
        break;
      case 3:
        
        break;    
    }


    if( opt !== 0 ) await pausa()

  } while (opt !== 0) 
}

main()