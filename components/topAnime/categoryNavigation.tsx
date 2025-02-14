import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
    { query: "", queryValue: "", label: "All Anime" },
    { query: "filter", queryValue: "airing", label: "Top Airing" },
    { query: "filter", queryValue: "upcoming", label: "Top Upcoming" },
    { query: "type", queryValue: "tv", label: "Top TV Series" },
    { query: "type", queryValue: "movie", label: "Top Movies" },
    { query: "type", queryValue: "ova", label: "Top OVAs" },
    { query: "type", queryValue: "ona", label: "Top ONAs" },
    // { query: "type", queryValue: "special", label: "Top Specials" },
    // { query: "type", queryValue: "music", label: "Top Music" },
    // { query: "type", queryValue: "cm", label: "Top CM" },
    // { query: "type", queryValue: "pv", label: "Top PV" },
    { query: "type", queryValue: "tv_special", label: "Top TV Special" },
    { query: "filter", queryValue: "bypopularity", label: "Most Popular" },
    { query: "filter", queryValue: "favorite", label: "Most Favorited" },
];

export default function CategoryNavigation({ setCurrentPage }: { setCurrentPage: (page: number) => void; }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const handleActiveNavigation = (queryValue: string) => {     
        if (queryValue == searchParams.get('type') || queryValue == searchParams.get('filter') || queryValue == "" && searchParams.has("page") && !searchParams.has("filter") && !searchParams.has("type") || queryValue == "" && searchParams.toString() == "") {
            return true
        } else {
            return false
        }
    }

    const loadTypeFilter = (query: string, value: string) => {
        let url = "";
        if (query == "" || value == "") {
            url = "/anime/top";
        } else {
            url = `/anime/top?${query}=${value}`;
        }
        setCurrentPage(1);
        router.push(url);
    }

    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        {categories.map((category, index) => (
                            <NavigationMenuLink
                                key={index}
                                onClick={() => loadTypeFilter(category.query, category.queryValue)}
                                className={`${navigationMenuTriggerStyle()} cursor-pointer`}
                                active={handleActiveNavigation(category.queryValue)}
                            >
                                {category.label}
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}