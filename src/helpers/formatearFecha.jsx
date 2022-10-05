export const formatearFecha = fecha => { //459
    const nuevaFecha = new Date(fecha.split('T')[0].split('-')); //460

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return nuevaFecha.toLocaleDateString('en-EN', opciones)
}