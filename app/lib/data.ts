export async function fetchSeasonalAnime() {
    console.log('Fetching seasonal anime data...')
    try {
        const response = await fetch("https://api.myanimelist.net/v2/anime/season/2024/fall?limit=500&nsfw=true&fields=id,title,main_picture,start_date,mean,nsfw,media_type,genres,num_episodes,average_episode_duration", {
            method: 'GET', // Method is optional because GET is the default
            headers: {
                'X-MAL-CLIENT-ID': process.env.X_MAL_CLIENT_ID!
            }
        });
        // Usa setTimeout para retrasar la lectura y conversión del JSON;
        const data = await new Promise((resolve, reject) => {
            setTimeout(() => {
                response.json().then(resolve).catch(reject);
            }, 3000); // Retrasa por 2000 ms = 2 segundos
        });
        console.log("Pasaron 3 segundos...");

        
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