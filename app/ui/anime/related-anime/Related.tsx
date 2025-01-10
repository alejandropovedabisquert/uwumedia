import { RelatedAnimeData } from "@/app/lib/definitions";
import Image from "next/image";

export default function Related({anime}:{anime: RelatedAnimeData}) {
    // console.log(anime.node   );
    
    return(
        <>
            <Image src={anime.node.main_picture.large} alt={anime.node.title} className="w-full h-auto" width={300} height={0}/>
        </>
    )
}