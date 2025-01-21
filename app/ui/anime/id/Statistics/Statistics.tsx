import { AnimeNode } from "@/app/lib/definitions";
import { Titulo } from "@/app/ui/common/Titulo";

export default function Statistics({anime} : {anime: AnimeNode}) {
    const {
        mean,
        rank,
        popularity,  
        num_list_users,
    } = anime;
    return (
        <div className="mt-4">
            <Titulo as="h2" position="left" className="text-xl font-bold">Statistics</Titulo>
            <div><span className="font-bold">Score:</span> {mean}</div>
            <div><span className="font-bold">Ranked:</span> #{rank.toLocaleString()}</div>
            <div><span className="font-bold">Popularity:</span> #{popularity.toLocaleString()}</div>
            <div><span className="font-bold">Members:</span> {num_list_users.toLocaleString()}</div>
        </div>
    );
}