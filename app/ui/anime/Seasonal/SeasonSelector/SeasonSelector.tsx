"use client";
import { getCurrentSeason } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Errors {
    year?: string;
    season?: string;
}

export function SeasonSelector() {
    const seasons = ["winter", "spring", "summer", "fall"];
    const router = useRouter();
    const [errors, setErrors] = useState<Errors>({});
    const pathname = usePathname();
    
    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        setErrors({});

        const year = formData.get("year")?.toString().trim();
        const season = formData.get("season");

        const newErrors: Errors = {};

        if (!year || year.length < 4 || year.length > 4 || isNaN(Number(year))) {
            newErrors.year = "Please enter a valid year (e.g., 2023).";
        }

        if (!season || !seasons.includes(season.toString())) {
            newErrors.season = "Please select a valid season.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTimeout(() => {
                setErrors({})
            }, 3000)
            return;
        }

        router.push(`/anime/seasonal/${year}/${season}`);
    };

    const { season, year } = getCurrentSeason();
    const currentSeasonIndex = seasons.indexOf(season);

    const buttonsData = [
        { season: seasons[(currentSeasonIndex - 1 + 4) % 4], year: currentSeasonIndex === 0 ? year - 1 : year },
        { season: season, year: year },
        { season: seasons[(currentSeasonIndex + 1) % 4], year: currentSeasonIndex === 3 ? year + 1 : year },
        { season: seasons[(currentSeasonIndex + 2) % 4], year: currentSeasonIndex >= 2 ? year + 1 : year }
    ];

    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-wrap">
                {buttonsData.map((data) => (
                    <Link
                        key={`${data.season}-${data.year}`}
                        href={`../${data.year}/${data.season}`}
                        className="capitalize mr-4 bg-primary-color p-2 text-white"
                    >
                        {`${data.season} ${data.year}`}
                    </Link>

                ))}
            </div>
            <div className="flex flex-wrap items-center">
                <span className="mr-2">
                    Jump to
                </span>
                <form onSubmit={submit}>
                    <input className="bg-gray-200 rounded-lg p-2" id="year" name="year" type="text" defaultValue={pathname.split("/")[3]} placeholder="Year" />
                    <select className="bg-gray-200 rounded-lg py-2 px-4" id="season" name="season" defaultValue={pathname.split("/")[4]}>
                        {seasons.map((season) => (
                            // pathname.split("/")[4] === season ? (
                            //     <option key={season} value={season} defaultValue={season} selected>
                            //         {season.charAt(0).toUpperCase() + season.slice(1)}
                            //     </option>
                            // ) : (
                            //     <option key={season} value={season} defaultValue={season}>
                            //         {season.charAt(0).toUpperCase() + season.slice(1)}
                            //     </option>
                            // )
                            <option key={season} value={season} defaultValue={season}>
                                {season.charAt(0).toUpperCase() + season.slice(1)}
                            </option>
                        ))}
                    </select>
                    <button className="bg-primary-color rounded-lg py-2 px-4 text-white" type="submit">Go</button>
                </form>
                {errors ? <p style={{ color: "red" }}>{errors.season} {errors.year}</p> : null}
            </div>
        </div>
    );
}
