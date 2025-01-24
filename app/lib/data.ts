export async function fetchSeasonalAnime(year: number, season: string) {
    // const { year, season } = getCurrentSeason();
    try {
        const response = await fetch(`https://api.myanimelist.net/v2/anime/season/${year}/${season}?limit=500&nsfw=true&fields=id,title,main_picture,start_date,mean,nsfw,media_type,genres,num_episodes,average_episode_duration,rating,synopsis,media_type,start_date`, {
            method: 'GET', // Method is optional because GET is the default
            cache: 'force-cache',
            headers: {
                'X-MAL-CLIENT-ID': process.env.X_MAL_CLIENT_ID!,
            }
        });
        const data = await response.json()
        
        return data;
    } catch (error) {
        throw new Error('Failed to fetch seasonal anime data.' + error);
    }
}

export async function fetchAnimeById(id: number) {
    try {
        const response = await fetch(`https://api.myanimelist.net/v2/anime/${id}?fields=fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics`, {
            method: 'GET', // Method is optional because GET is the default
            cache: 'force-cache',
            headers: {
                'X-MAL-CLIENT-ID': process.env.X_MAL_CLIENT_ID!
            }
        });
        const data = await response.json()
        
        return data;
    } catch (error) {
        throw new Error('Failed to fetch anime data.' + error);
    }
}

export async function fetchAnimeCharactersById(id: number) {
    try {
        const response = await fetch(`https://api.myanimelist.net/v2/anime/${id}/characters?fields=id,role,first_name,last_name,alternative_name,main_picture,biography,num_favorites`, {
            method: 'GET', // Method is optional because GET is the default
            cache: 'force-cache',
            headers: {
                'X-MAL-CLIENT-ID': process.env.X_MAL_CLIENT_ID!
            }
        });
        const data = await response.json()
        
        return data;
    } catch (error) {
        throw new Error('Failed to fetch anime characters data.' + error);
    }
}