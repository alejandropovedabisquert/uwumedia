import { RelatedAnimeData } from "@/app/lib/definitions";
import Image from "next/image";

export default function Related({anime}:{anime: RelatedAnimeData}) {
    // console.log(anime.node   );
    
    return(
        <>
            <Image src={anime.node.main_picture.medium} alt={anime.node.title} width={100} height={300}/>
        </>
    )
}