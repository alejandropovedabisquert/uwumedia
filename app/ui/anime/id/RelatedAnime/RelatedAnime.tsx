import { RelatedAnimeData } from "@/app/lib/definitions";
import Link from "next/link";

export default function RelatedAnime({anime, relation_type} : {anime: RelatedAnimeData[], relation_type:string}) {
    // console.log(anime.node);
    const filteredData = anime.filter(list => list.relation_type === relation_type);
    // console.log(filteredData);
    return(
        <>
            {
                filteredData.length != 0 
                ? (
                    <>
                        <h4 className="text-center text-lg">{relation_type}</h4>
                        <div className="flex flex-col">
                            {
                                filteredData.map((item, index) => (
                                    <Link href={`/anime/${item.node.id}/${item.node.title}`} key={index}>{item.node.title}</Link>
                                ))
                            }
                        </div>
                    </>
                )
                : null
            }
        </>
    )
}