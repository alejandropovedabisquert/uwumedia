import { AnimeData } from "@/app/lib/definitions";
import CardList from "./CardList";

export function CardsWrapper({ media_type, data } : {media_type: string, data: AnimeData[]}) {
    const filteredData = data.filter(list => list.node.media_type === media_type);
    return <CardList media_type={media_type} data={filteredData} />;
}

