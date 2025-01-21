import { AnimeNode } from "@/app/lib/definitions";
import { formatDate, secondsToMinutes } from "@/app/lib/utils";
import { Titulo } from "@/app/ui/common/Titulo";

export default function Information({anime} : {anime: AnimeNode}) {
    console.log(anime);
    const {
        start_date,
        end_date,
        media_type,
        status,
        num_episodes,
        start_season,
        broadcast,
        source,
        average_episode_duration,
        rating
    } = anime;
    return (
        <div className="mt-4">
            <Titulo as="h2" position="left" className="text-xl font-bold">Information</Titulo>
            {/* DONDE HA SALIDO */}
            <div><span className="font-bold">Type:</span> {media_type}</div>
            {/* NUMERO DE EPISODIOS DEL ANIME */}
            <div><span className="font-bold">Episodes:</span> {num_episodes == 0 ? "Unknown" : num_episodes}</div>
            {/* EN QUE ESTADO ESTA EL ANIME */}
            <div><span className="font-bold">Status:</span> {status}</div>
            {/* FECHA DE SALLIDA */}
            <div><span className="font-bold">Aired:</span> {formatDate(start_date)} to {end_date ? formatDate(end_date) : "?"}</div>
            <div><span className="font-bold">Premiered:</span> {start_season.season} {start_season.year}</div>
            <div><span className="font-bold">Premiered:</span> {broadcast.day_of_the_week} at {broadcast.start_time} (JST)</div>
            <div><span className="font-bold">Source:</span>{source}</div>
            <div><span className="font-bold">Duration:</span> {secondsToMinutes(average_episode_duration)} min. per ep.</div>
            <div><span className="font-bold">Rating:</span> {rating}</div>
            {/* <div>{anime.studios}</div> NECESITA UN BUCLE*/}
            {/* <div>{anime.genres}</div> ESTO HAY QUE HACERLE UN BUCLE */}
        </div>
    );
}