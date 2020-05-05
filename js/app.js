const ui = new UI();

document.addEventListener('DOMContentLoaded', () =>{
    ui.mostrarEstablecimientos();
})

//mobilizzar busqueda de establecimientos
 
const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
    if (buscador.value.length > 5){
        ui.obtenerSugerencia(buscador.value);
    } else {
        ui.mostrarEstablecimientos();
    }
})