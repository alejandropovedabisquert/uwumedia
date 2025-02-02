import TopAnimeApiResponse from "@/interfaces/top/interfacesTopAnime";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button";

export default function TopAnimePagination({ setCurrentPage, topAnimesData }: { setCurrentPage: (page: number) => void, topAnimesData: TopAnimeApiResponse }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { current_page, last_visible_page, has_next_page } = topAnimesData.pagination;
    // console.log("current_page", current_page);
    // console.log("last_visible_page", last_visible_page);
    // console.log("has_next_page", has_next_page);
    const type = searchParams.get("type") || undefined;
    const filter = searchParams.get("filter") || undefined;

    // Función para cargar la siguiente página
    const loadNextPage = (page: number) => {
        setCurrentPage(page);
        let url = `/anime/top?page=${page}`;

        if (type) {
            url += `&type=${type}`;
        }

        if (filter) {
            url += `&filter=${filter}`;
        }

        router.push(url);
    };

    const handleActivePagination = (queryValue: string) => {
        if (queryValue == searchParams.get('page') || queryValue == "1" && searchParams.size == 0) {
            return true
        }
    }

    const pages = Array.from(new Set(
        Array.from({ length: 5 }, (_, i) => {
            const pageNumber = Number(current_page);
            const calculatedPage = i - (pageNumber === 1 ? 0 : 2) + pageNumber;
            return Math.min(calculatedPage, last_visible_page);// Limita el valor máximo
        }).filter(page => page >= 1) // Filtra para eliminar páginas menores a 1 (por si acaso)
    ));

    const formSchema = z.object({
        page: z.coerce.number().min(1).max(last_visible_page),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            page: current_page || undefined,
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        loadNextPage(values.page);
    }

    return (
        <>
            <Pagination>
                <PaginationContent>
                    {current_page > 1 && (
                        <PaginationItem>
                            <PaginationPrevious className="cursor-pointer" onClick={() => loadNextPage(current_page - 1)} />
                        </PaginationItem>
                    )}
                    {
                        pages.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink isActive={handleActivePagination(page.toString())} className="cursor-pointer" onClick={() => loadNextPage(page)}>{page}</PaginationLink>
                            </PaginationItem>
                        ))
                    }
                    <Popover>
                        <PopoverTrigger>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex">
                                    <FormField
                                        control={form.control}
                                        name="page"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Go to page:</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Select page" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">GO</Button>
                                </form>
                            </Form>
                        </PopoverContent>
                    </Popover>
                    {has_next_page && (
                        <PaginationItem>
                            <PaginationNext className="cursor-pointer" onClick={() => loadNextPage(current_page + 1)} />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </>
    );
}