import { AnimeGenre, AnimeNode, AnimeStudios } from "@/app/lib/definitions";
import { formatDate, secondsToMinutes } from "@/app/lib/utils";
import { Titulo } from "@/app/ui/common/Titulo";

export default function Information({anime} : {anime: AnimeNode}) {
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
        rating,
        genres,
        studios
    } = anime;
    return (
        <div className="mt-4">
            <Titulo as="h2" position="left" className="text-xl font-bold">Information</Titulo>
            <div>
                <span className="font-bold">Type:</span> {media_type}
            </div>
            <div>
                <span className="font-bold">Episodes:</span> {num_episodes == 0 ? "Unknown" : num_episodes}
            </div>
            <div>
                <span className="font-bold">Status:</span> {status}
            </div>
            <div>
                <span className="font-bold">Aired:</span> {formatDate(start_date)} to {end_date ? formatDate(end_date) : "?"}
            </div>
            <div>
                <span className="font-bold">Premiered:</span> {start_season.season} {start_season.year}
            </div>
            {
                broadcast ? (
                    <div>
                        <span className="font-bold">Premiered:</span> {broadcast.day_of_the_week} at {broadcast.start_time} (JST)
                    </div>
                ) : null
            }
            <div>
                <span className="font-bold">Source:</span> {source}
            </div>
            <div>
                <span className="font-bold">Duration:</span> {secondsToMinutes(average_episode_duration)} min. per ep.
            </div>
            <div>
                <span className="font-bold">Rating:</span> {rating}
            </div>
            <div>
                <span className="font-bold">Studios:</span> <Studios studios={studios}/>
            </div>
            <div>
                <span className="font-bold">Genres:</span> <Genres genres={genres}/>
            </div>
        </div>
    );
}

export function Genres({genres} : {genres: AnimeGenre[]} ){    
    return(
        <>
        {genres.map((genre, index) =>(
            <span key={genre.id}>{genre.name} {index !== genres.length - 1 && ', '} </span>
        ))}
        </>
    )
}

export function Studios({studios} : {studios: AnimeStudios[]} ){    
    return(
        <>
        {
            studios.length != 0 ? (
                studios.map((studio, index) =>(
                    <span key={studio.id}>{studio.name} {index !== studios.length - 1 && ', '} </span>
                ))
            ) : "None found"
        }

        </>
    )
}