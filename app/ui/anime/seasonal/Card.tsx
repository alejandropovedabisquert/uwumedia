import { AnimeData, AnimeGenre } from "@/app/lib/definitions";
import { createSlug, formatDate, secondsToMinutes } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

export function Card({data}:{data: AnimeData }) {
    const {
        id,
        main_picture: { 
            large: image_large, 
            // medium: image_medium 
        },
        start_date,
        num_episodes,
        average_episode_duration,
        title,
        genres,
        mean,
        nsfw,
        rating
    } = data.node;
    return(
        <article className="relative w-full max-w-[45%] md:max-w-md mb-4 md:mb-12 mx-0">
            {
                nsfw == "gray" && rating == "rx" ? 
                    <div className="z-10 absolute w-fit -top-1 sm:-top-2 md:-top-4 -left-3 sm:-left-4 md:-left-8 bg-red-500 text-xs md:text-base text-white rounded-[100%] p-2 md:p-4 -rotate-45">NSFW</div>
                : null
            }  
            <Link href={`/anime/${id}/${createSlug(title)}`}>
                <div className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl h-60 md:h-96 px-4 md:px-8 pb-4 md:pb-8 pt-40">
                    <Image src={image_large} alt={title} className="absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-125" fill/>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                    <div className="z-10 top-0 right-0 absolute bg-primary-color flex flex-wrap py-2 px-4 rounded-bl-2xl">
                        <div className="text-sm text-white flex">
                            <div className="hidden md:inline">{formatDate(start_date)}</div>
                            <div className="hidden md:inline px-2">|</div>
                            <div>{num_episodes == 0 ? "?" : num_episodes} eps</div>
                            <div className="hidden md:inline">, {secondsToMinutes(average_episode_duration)} mins</div>
                        </div>
                    </div>
                    <h3 className="z-10 mt-3 text-sm md:text-lg font-bold text-white">{title}</h3>
                    <div className="flex flex-wrap">
                        <Genres genres={genres}/> 
                        <div className="z-10 w-fit overflow-hidden text-sm leading-6 text-gray-300 ml-2 flex items-center">
                            <FaStar className="mr-1" />
                            {mean == null ? "N/A" : mean}
                        </div>
                    </div>
                </div> 
            </Link>      
        </article>
    )
}
export function Genres({genres} : {genres: AnimeGenre[]} ){    
    return(
        <>
        {genres.slice(0,3).map((genre) =>(
            <span key={genre.id} className="z-10 w-fit gap-y-1 pr-2 overflow-hidden text-sm leading-6 text-gray-300">{genre.name}</span>
        ))}
        </>
    )
}