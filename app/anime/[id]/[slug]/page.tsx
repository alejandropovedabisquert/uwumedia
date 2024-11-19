import { fetchAnimeById } from "@/app/lib/data";

export default async function AnimePage(props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    const id = params.id;
    const anime = await fetchAnimeById(id);
    console.log(anime);
    
    return (
        <div>{anime.title}</div>
    );
}