import { RelatedAnimeData } from "@/app/lib/definitions";
import Related from "./Related";

export default function RelatedAnime({anime, relation_type} : {anime: RelatedAnimeData[], relation_type:string}) {
    // console.log(anime.node);
    const filteredData = anime.filter(list => list.relation_type === relation_type);
    // console.log(filteredData);
    
    
    return(
        <>
            <h4 className="text-center text-lg">{relation_type}</h4>
            <div className="flex flex-wrap">
                {
                    filteredData.map((item, index) => <Related key={index} anime={item}/>)
                }
            </div>
        </>
    )
}