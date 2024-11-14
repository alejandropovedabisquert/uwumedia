import { fetchSeasonalAnime } from "@/app/lib/data";
import styles from "./seasonal-sections.module.scss"
import { AnimeData } from "@/app/lib/definitions";

export default async function SeasonalSections() {
    const seasonalList = await fetchSeasonalAnime();
    console.log(seasonalList.data[0]);
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

export function CardsWrapper({media_type, data}:{media_type: string, data: AnimeData[]}) {  
    return(
        <div>
            <h1 className="text-xl text-center uppercase">{media_type}</h1>
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

    return(
        <div className="max-w-sm w-full lg:max-w-md lg:flex">
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                <img className="h-full object-cover" src={data.node.main_picture.large} alt="" />
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
                <div className="text-gray-900 font-bold text-lg mb-2">{data.node.title}</div>
                <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
            </div>
            <div className="flex items-center">
                {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"> */}
                <div className="text-sm">
                    <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                    <p className="text-gray-600">Aug 18</p>
                </div>
            </div>
            </div>
        </div>
    )
}