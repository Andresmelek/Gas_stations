class UI {
    constructor() {

        //instanciar la appi
        this.api = new API();

        //crear los layers
         this.markers = new L.LayerGroup();

         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }

    mostrarEstablecimientos(){
        this.api.obtenerDatos()
            .then(datos => {
                    const resultado = datos.datosJSON.results;
                    this.mostrarPines(resultado);
            })
    }

    mostrarPines(datos){
        //limpiar los markers
        this.markers.clearLayers();

        //recorrer establecimientos
       datos.forEach(dato => {
            const {latitude, longitude, calle, regular, premium} = dato;
            //crear un nuevo popup
            const opcionesPopup = L.popup().setContent(`
            <p>Calle: ${calle}</p>
            <p><b>Regular: </b> $ ${regular}</p>
            <p><b>Premium: </b> $ ${premium}</p>
            `);
            //agregar el pin
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopup);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    }

    // buscador
    obtenerSugerencia(busqueda){
            this.api.obtenerDatos()
            .then(datos => {
                const resultados = datos.datosJSON.results;

                // enviar JSON y la búsqueda para el filtrado
                this.filtrarSugerencias(resultados, busqueda)
            })
    }
    // filtra la busqueda
    filtrarSugerencias(resultado, busqueda){
        //filtrar con .filter
            const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
            console.log(filtro);
        //mostrar los pines
        this.mostrarPines
    }
}