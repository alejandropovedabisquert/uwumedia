import { fetchAnimeById } from "@/app/lib/data";
import { Related, RelatedAnimeData } from "@/app/lib/definitions";
import { replaceLineBreak } from "@/app/lib/utils";
import { Titulo } from "@/app/ui/Titulo";
import Image from "next/image";
import { FaUserFriends } from "react-icons/fa";
import { FaCertificate, FaRankingStar, FaStar } from "react-icons/fa6";

export default async function AnimePage(props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    const id = params.id;
    const anime = await fetchAnimeById(id);
    console.log(anime);

    return (
        <div>
            {/* TOP BAR */}
            <div className="py-6">
                <h1 className="text-3xl font-bold">{anime.title}</h1>
            </div>
            <div className="flex flex-wrap md:flex-nowrap justify-start">
                {/* LEFT BAR */}
                <div className="w-full max-w-md md:pr-10">
                    <Image src={anime.main_picture.large} alt={anime.title} className="rounded-2xl" width={400} height={400}/>

                    {/* ALTERNATIVE NAMES */}
                    <div>{anime.alternative_titles.en}</div>
                    <div>{anime.alternative_titles.ja}</div>
                    {/* <div>{anime.alternative_titles.synonyms}</div> Esto hay que hacerle un bucle */}

                    {/* FECHA DE SALLIDA */}
                    <div>{anime.start_date}</div>

                    {/* DONDE HA SALIDO */}
                    <div>{anime.media_type}</div>

                    {/* EN QUE ESTADO ESTA EL ANIME */}
                    <div>{anime.status}</div>

                </div>
                {/* RIGHT BAR */}
                <div className="w-full max-w-5xl">
                    {/* INFORMACION IMPORTANTE (SCORE, RANKED, POPULARITY, MEMBERS) */}
                    <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between max-w-xl gap-2 mb-6">
                        <div className="max-w-40 w-full text-center flex justify-center items-center flex-col">
                                <div className="text-xl font-bold flex justify-start items-center">
                                    {anime.mean} <FaStar className="ml-2"/>
                                </div>
                                Score
                                <div className="text-sm mt-2">
                                    {anime.num_scoring_users.toLocaleString()} users
                                </div>
                        </div>
                        <div className="max-w-40 w-full text-center flex justify-start items-center flex-col">
                            <div className="text-xl font-bold flex justify-center items-center">
                                {anime.rank.toLocaleString()} <FaRankingStar className="ml-2"/>
                            </div>
                            Ranked
                        </div>
                        <div className="max-w-40 w-full text-center flex justify-start items-center flex-col">
                            <div className="text-xl font-bold flex justify-center items-center">
                                {anime.popularity.toLocaleString()} <FaCertificate className="ml-2"/>
                            </div>
                            Popularity
                        </div>
                        <div className="max-w-40 w-full text-center flex justify-start items-center flex-col">
                            <div className="text-xl font-bold flex justify-center items-center">
                                {anime.num_list_users.toLocaleString()} <FaUserFriends className="ml-2"/>
                            </div>
                            Members
                        </div>
                    </div>

                    {/* SINOPSIS */}
                    <div className="mb-10">
                        <Titulo as="h3" position="left" className="text-xl font-bold">Synopsis</Titulo>
                        <p dangerouslySetInnerHTML={{ __html: replaceLineBreak(anime.synopsis) }}/>
                    </div>
                    {/* BACKGROUND */}
                    <div className="mb-10">
                        <Titulo as="h3" position="right" className="text-xl font-bold">Background</Titulo>
                        <p dangerouslySetInnerHTML={{ __html: replaceLineBreak(anime.background) }}/>
                    </div>

                    {/* SERIES RELACIONADAS (ANIME, MANGA, MUSICA, etc) */}
                    <div>
                        <Titulo as="h3" position="left" className="text-xl font-bold">Related entries</Titulo>
                        <RelatedAnimeWrapper data={anime.related_anime} />
                    </div>
                    {/* <div>{anime.related_anime}</div> ESTO HAY QUE HACERLE UN BUCLE */}
                    {/* <div>{anime.related_manga}</div>  CREO QUE CON ESTO NECESITO EL AUTH*/}
                </div>

            </div>



            {/* <div>{anime.genres}</div> ESTO HAY QUE HACERLE UN BUCLE */}
            <div>{anime.num_episodes}</div>
            <div>{anime.start_season.year}</div>
            <div>{anime.start_season.season}</div>
            <div>{anime.broadcast.day_of_the_week}</div>
            <div>{anime.broadcast.start_time}</div>
            <div>{anime.source}</div>
            <div>{anime.average_episode_duration}</div>
            <div>{anime.rating}</div>
            {/* <div>{anime.pictures}</div> ESTO HAY QUE HACERLE UN BUCLE */}
            <div>{anime.background}</div>
            {/* <div>{anime.recommendations}</div> CREO QUE CON ESTO NECESITO EL AUTH */}
            {/* <div>{anime.studios}</div> NECESITA UN BUCLE*/}
            <div>{anime.statistics.status.watching}</div>
            <div>{anime.statistics.status.completed}</div>
            <div>{anime.statistics.status.on_hold}</div>
            <div>{anime.statistics.status.dropped}</div>
            <div>{anime.statistics.status.plan_to_watch}</div>
            <div>{anime.statistics.num_list_users}</div>
        </div>
    );
}

export const RelatedAnimeWrapper = ({data} : {data: RelatedAnimeData[]}) => {
    console.log(data);

    return(
        <>
            <RelatedAnime anime={data} relation_type="side_story"/>
            <RelatedAnime anime={data} relation_type="summary"/>
            <RelatedAnime anime={data} relation_type="alternative_version"/>
            <RelatedAnime anime={data} relation_type="character"/>
            <RelatedAnime anime={data} relation_type="other"/>
        </>
    )
}

export const RelatedAnime = ({anime, relation_type} : {anime: RelatedAnimeData[], relation_type:string}) => {
    // console.log(anime.node);
    const filteredData = anime.filter(list => list.relation_type === relation_type);
    // console.log(filteredData);
    
    
    return(
        <>
            <h4 className="text-center text-lg">{relation_type}</h4>
            <div className="flex flex-wrap">
                {
                    filteredData.map((item, index) => <RelatedC key={index} anime={item}/>)
                }
            </div>
        </>
    )
}
export const RelatedC = ({anime}:{anime: RelatedAnimeData}) => {
    // console.log(anime.node   );
    
    return(
        <>
            <Image src={anime.node.main_picture.medium} alt={anime.node.title} width={100} height={300}/>
        </>
    )
}