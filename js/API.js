class API {
    async obtenerDatos(){

        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico`);

        const datosJSON = await datos.json();
        return {
            datosJSON
        }
    } 
}
