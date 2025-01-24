import { AnimeNode } from "@/app/lib/definitions";
import { FaCertificate, FaStar, FaUserFriends } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";

export default function Details({anime} : {anime: AnimeNode}) {
    return (
        <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between max-w-xl gap-2 mb-6">
            <div className="max-w-40 w-full text-center flex justify-center items-center flex-col">
                <div className="text-xl font-bold flex justify-start items-center">
                    {anime.mean ? anime.mean : "N/A"} <FaStar className="ml-2" />
                </div>
                Score
                <div className="text-sm mt-2">
                    {anime.num_scoring_users ? anime.num_scoring_users.toLocaleString() : "-"} users
                </div>
            </div>
            <div className="max-w-40 w-full text-center flex justify-start items-center flex-col">
                <div className="text-xl font-bold flex justify-center items-center">
                    {anime.rank ? anime.rank.toLocaleString() : "N/A"} <FaRankingStar className="ml-2" />
                </div>
                Ranked
            </div>
            <div className="max-w-40 w-full text-center flex justify-start items-center flex-col">
                <div className="text-xl font-bold flex justify-center items-center">
                    {anime.popularity? anime.popularity.toLocaleString() : "N/A"} <FaCertificate className="ml-2" />
                </div>
                Popularity
            </div>
            <div className="max-w-40 w-full text-center flex justify-start items-center flex-col">
                <div className="text-xl font-bold flex justify-center items-center">
                    {anime.num_list_users? anime.num_list_users?.toLocaleString() : "N/A"} <FaUserFriends className="ml-2" />
                </div>
                Members
            </div>
        </div>
    );
}