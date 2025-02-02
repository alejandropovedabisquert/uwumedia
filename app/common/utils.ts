// Esta funcion corta el texto, debes pasrle como parametros el texto y el numero de caracteres que quieres que tenga
export const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// Esta funcion formatea la fecha que le pases
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export const secondsToMinutes = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}`;
};

export const createSlug = (text: string): string => {
    return text
      .toString() // Asegurarse de que el texto es una cadena
      .normalize('NFD') // Descomponer los caracteres acentuados en sus componentes
      .replace(/[\u0300-\u036f]/g, '') // Eliminar los acentos
      .toLowerCase()
      .trim() // Eliminar espacios al inicio y al final
      .replace(/\s+/g, '_') // Reemplazar espacios con guiones
      .replace(/[^\w\-]+/g, '') // Eliminar todos los caracteres que no sean palabras o guiones
      .replace(/\-\-+/g, ''); // Reemplazar múltiples guiones con uno solo
}

// Esta funcion reemplaza textos con saltos de linea por <br>
export const replaceLineBreak = (text: string): string =>{
    return text.replace(/\n/g, '<br />');
}


export const getCurrentSeason = () =>{
    const now = new Date();
    const actualYear = now.getFullYear();
    const month = now.getMonth(); // Los meses van de 0 a 11

    let actualSeason;
    if (month >= 0 && month <= 2) {
        actualSeason = 'winter'; // Enero, Febrero, Marzo
    } else if (month >= 3 && month <= 5) {
        actualSeason = 'spring'; // Abril, Mayo, Junio
    } else if (month >= 6 && month <= 8) {
        actualSeason = 'summer'; // Julio, Agosto, Septiembre
    } else {
        actualSeason = 'fall'; // Octubre, Noviembre, Diciembre
    }

    return { actualYear, actualSeason };
}