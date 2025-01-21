import { fetchAnimeById } from "@/app/lib/data";
import { replaceLineBreak } from "@/app/lib/utils";
import AlternativeTitles from "@/app/ui/anime/id/AlternativeTitles/AlternativeTitles";
import Information from "@/app/ui/anime/id/Information/Information";
import RelatedAnimeWrapper from "@/app/ui/anime/id/RelatedAnime/RelatedAnimeWrapper";
import Statistics from "@/app/ui/anime/id/Statistics/Statistics";
import { Titulo } from "@/app/ui/common/Titulo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaUserFriends } from "react-icons/fa";
import { FaCertificate, FaRankingStar, FaStar } from "react-icons/fa6";

export default async function AnimePage(props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    const id = params.id;
    const anime = await fetchAnimeById(id);
    if (anime.error == "not_found") {
        notFound();
        return null
    }
    return (
        <div>
            {/* TOP BAR */}
            <div className="py-6">
                <h1 className="text-3xl font-bold">{anime.title}</h1>
            </div>
            <div className="flex flex-wrap md:flex-nowrap justify-start">
                {/* LEFT BAR */}
                <div className="w-full max-w-md md:pr-10">
                    <Image src={anime.main_picture?.large} alt={anime.title} className="rounded-2xl" width={400} height={400}/>

                    {/* ALTERNATIVE NAMES */}
                    <AlternativeTitles anime={anime}/>
                    <Information anime={anime}/>
                    <Statistics anime={anime}/>
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
                                    {anime.num_scoring_users?.toLocaleString()} users
                                </div>
                        </div>
                        <div className="max-w-40 w-full text-center flex justify-start items-center flex-col">
                            <div className="text-xl font-bold flex justify-center items-center">
                                {anime.rank?.toLocaleString()} <FaRankingStar className="ml-2"/>
                            </div>
                            Ranked
                        </div>
                        <div className="max-w-40 w-full text-center flex justify-start items-center flex-col">
                            <div className="text-xl font-bold flex justify-center items-center">
                                {anime.popularity?.toLocaleString()} <FaCertificate className="ml-2"/>
                            </div>
                            Popularity
                        </div>
                        <div className="max-w-40 w-full text-center flex justify-start items-center flex-col">
                            <div className="text-xl font-bold flex justify-center items-center">
                                {anime.num_list_users?.toLocaleString()} <FaUserFriends className="ml-2"/>
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
                    {/* <div>{anime.related_manga}</div>  LA API TIENE UN BUG QUE HACE QUE NO APAREZCAN*/}
                </div>

            </div>


            {/* <div>{anime.pictures}</div> ESTO HAY QUE HACERLE UN BUCLE */}
            {/* <div>{anime.recommendations}</div> CREO QUE CON ESTO NECESITO EL AUTH */}
            
            <div>{anime.statistics.status.watching}</div>
            <div>{anime.statistics.status.completed}</div>
            <div>{anime.statistics.status.on_hold}</div>
            <div>{anime.statistics.status.dropped}</div>
            <div>{anime.statistics.status.plan_to_watch}</div>
            <div>{anime.statistics.num_list_users}</div>
        </div>
    );
}