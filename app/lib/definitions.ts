// Define el tipo para la imagen principal del anime
export type AnimePicture = {
    large: string;
    medium: string;
  };
  
  // Define el tipo para cada nodo de anime en la lista
  export type AnimeNode = {
    media_type: string;
    main_picture: AnimePicture;
    title: string;
  };
  
  // Define el tipo para los datos de anime, que incluyen el nodo de anime
  export type AnimeData = {
    node: AnimeNode;
  };