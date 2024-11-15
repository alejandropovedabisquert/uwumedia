import { fetchSeasonalAnime } from "@/app/lib/data";
import styles from "./seasonal-sections.module.scss"
import { AnimeData, AnimeGenre } from "@/app/lib/definitions";
import { formatDate, secondsToMinutes } from "@/app/lib/utils";
import { FaStar } from "react-icons/fa6";

export default async function SeasonalSections() {
    const seasonalList = await fetchSeasonalAnime();
    console.log(seasonalList.data);
    return (
        <>
                <CardsWrapper media_type="tv" data={seasonalList.data}/>
                <CardsWrapper media_type="ona" data={seasonalList.data}/>
                <CardsWrapper media_type="ova" data={seasonalList.data}/>
                <CardsWrapper media_type="movie" data={seasonalList.data}/>
                <CardsWrapper media_type="special" data={seasonalList.data}/>
                <CardsWrapper media_type="tv_special" data={seasonalList.data}/>
                <CardsWrapper media_type="pv" data={seasonalList.data}/>
                <CardsWrapper media_type="music" data={seasonalList.data}/>
        </>
    );
}

export function CardsWrapper({media_type, data = []}:{media_type: string, data: AnimeData[]}) {  
    return(
        <div>
            <h1 className="uppercase text-2xl font-semibold md:text-3xl tracking-widest grid grid-cols-title grid-rows-title gap-6 before:content-[''] after:content-[''] before:block after:block before:border-b-2 after:border-b-2 before:border-secondary-color after:border-secondary-color w-full md:w-7/12 mx-auto mb-4">{media_type}</h1>
            <div className={`${styles.cards}`}>
                {data.map((list) =>{
                    return list.node.media_type == media_type? (
                        <Card key={list.node.id} data={list}/>
                    ): null
                })}
            </div>
        </div>
    )
}

export function Card({data}:{data: AnimeData }) {
    const image = data.node.main_picture.large;
    const start_date = data.node.start_date;
    const num_episodes = data.node.num_episodes
    const average_episode_duration = data.node.average_episode_duration;
    const title = data.node.title;
    const genres = data.node.genres;
    const mean = data.node.mean;
    return(
        <article className="relative w-full max-w-[45%] md:max-w-md mb-4 md:mb-12 mx-0">
            {
                data.node.nsfw == "gray" && data.node.rating == "rx" ? 
                    <div className="z-10 absolute w-fit -top-1 sm:-top-2 md:-top-4 -left-3 sm:-left-4 md:-left-8 bg-red-500 text-xs md:text-base text-white rounded-[100%] p-2 md:p-4 -rotate-45">NSFW</div>
                : null
            }  
            <div className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl h-60 md:h-96 px-4 md:px-8 pb-4 md:pb-8 pt-40">
                <img src={image} className="absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-125"/>
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
                <div className="flex-wrap gap-x-2 hidden md:flex">

            </div>
            <div className="flex flex-wrap">
                <Genres genres={genres}/> 
                <div className="z-10 w-fit overflow-hidden text-sm leading-6 text-gray-300 ml-2 flex items-center">
                    <FaStar className="mr-1" />
                    {mean == null ? "N/A" : mean}
                </div>
            </div>
            </div>       
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