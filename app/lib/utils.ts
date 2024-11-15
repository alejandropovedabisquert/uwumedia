
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