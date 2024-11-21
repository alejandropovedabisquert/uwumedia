export async function fetchSeasonalAnime() {
    
    try {
        console.log("Llamando a seasonal anime");
        
        await new Promise(resolve => setTimeout(resolve, 3000)); // Retraso de 2 segundos

        console.log("Ha cargado seasonal anime en 3 segundos");
        
        const response = await fetch("https://api.myanimelist.net/v2/anime/season/2024/fall?limit=500&nsfw=true&fields=id,title,main_picture,start_date,mean,nsfw,media_type,genres,num_episodes,average_episode_duration", {
            method: 'GET', // Method is optional because GET is the default
            headers: {
                'X-MAL-CLIENT-ID': process.env.X_MAL_CLIENT_ID!,
                'X-Accel-Buffering': 'no',
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
        const response = await fetch(`https://api.myanimelist.net/v2/anime/${id}`, {
            method: 'GET', // Method is optional because GET is the default
            headers: {
                'X-MAL-CLIENT-ID': process.env.X_MAL_CLIENT_ID!
            }
        });
        const data = await response.json()
        
        return data;
    } catch (error) {
        throw new Error('Failed to fetch seasonal anime data.' + error);
    }
}