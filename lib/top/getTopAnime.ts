import TopAnimeApiResponse from "@/interfaces/top/interfacesTopAnime";

export async function getTopAnime(page: number = 1, type?: string, filter?: string, rating?: string, sfw?: boolean): Promise<TopAnimeApiResponse> {
    let url = `https://api.jikan.moe/v4/top/anime?page=${page}`;

    if (type) {
        url += `&type=${type}`;
    }

    if (filter) {
        url += `&filter=${filter}`;
    }

    if (rating) {
        url += `&rating=${rating}`;
    }

    if (sfw) {
        url += `&sfw=${sfw}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Error al obtener los datos');
    }
    const data = await res.json();
    return data;
}