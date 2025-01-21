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

export type AnimeStartSeason = {
    year: number;
    season: string;
}
export type AnimeBroadcast = {
    day_of_the_week: string;
    start_time: string;
}

export type AnimealternativeTitles= {
    synonyms: string[];
    en: string;
    ja: string;
}

export type AnimeStatistics = {
    status: AnimeStatisticsStatus;
    num_list_users: string;
}

export type AnimeStatisticsStatus = {
    watching: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_watch: number;
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
    end_date: string;
    status: string;
    start_season: AnimeStartSeason; 
    alternative_titles: AnimealternativeTitles;
    broadcast: AnimeBroadcast;
    statistics: AnimeStatistics;
    source: string;
    num_episodes: number;
    average_episode_duration: number;
    mean: number;
    nsfw: string;
    rating: string;
    background:string;
    rank: number;
    popularity: number;
    num_list_users: number;
};

// Define el tipo para los datos de anime, que incluyen el nodo de anime
export type AnimeData = {
    node: AnimeNode;
};


export type RelatedAnimeData = {
    node: Related;
    relation_type_formatted: string;
    relation_type: string;
};

export type Related = {
    id: number;
    title: string;
    main_picture: AnimePicture;
};