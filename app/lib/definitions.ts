// Define el tipo para la imagen principal del anime
export type AnimePicture = {
    large: string;
    medium: string;
};

//Define el tipo para los generos
export type AnimeGenre = {
    id: number;
    name: string;
}
  
// Define el tipo para cada nodo de anime en la lista
export type AnimeNode = {
    id: number;
    media_type: string;
    main_picture: AnimePicture;
    title: string;
    synopsis: string;
    genres: AnimeGenre[];
    start_date: string;
    num_episodes: number;
    average_episode_duration: number;
    mean: number;
    nsfw: string;
    rating: string;
    background:string;
};

// Define el tipo para los datos de anime, que incluyen el nodo de anime
export type AnimeData = {
    node: AnimeNode;
};


export type RelatedAnimeData = {
    node: Related[];
    relation_type_formatted: string;
    relation_type: string;
};

export type Related = {
    id: number;
    title: string;
    main_picture: AnimePicture;
};