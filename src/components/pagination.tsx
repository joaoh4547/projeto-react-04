import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

import { Button } from "./ui/button";

interface PaginationProps {
    pageIndex: number;
    pageCount: number;
    perPage: number;
}

export function Pagination({ pageCount, pageIndex, perPage }: PaginationProps) {
    const pages = Math.ceil(pageCount / perPage) || 1;
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
                Total de {pageCount} item(s)
            </span>
            <div className="flex items-center gap-6 lg:gap-8">
                <div className="text-sm font-medium">
                    Página {pageIndex + 1} de {pages}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-8 w-8 p-0">
                        <ChevronsLeft className="h-4 w-4" />
                        <span className="sr-only">Primeira Página</span>
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Página Anterior</span>
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0">
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Proxima Página</span>
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0">
                        <ChevronsRight className="h-4 w-4" />
                        <span className="sr-only">Última Página</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
