

import { Doc } from "../../../convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Ghost, LoaderIcon, MoreHorizontal } from "lucide-react";
import { DocumentRow } from "./document-row";
import { Button } from "@/components/ui/button";
import { ImPacman } from "react-icons/im";
import { FaRegSadTear } from "react-icons/fa";


interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus;
}

export const DocumentsTable = (
    {documents, loadMore, status}: DocumentsTableProps
) => {
    return (
       <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
        { documents === undefined ? (
            <div className="flex items-center justify-center h-24">
                <LoaderIcon className="animate-spin text-muted-foreground size-5" />
            </div>
        ): (
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead>Name</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead className="hidden md:table-cell">Shared</TableHead>
                        <TableHead className="hidden md:table-cell">Created at</TableHead>
                    </TableRow>
                </TableHeader>
                {documents.length === 0 ? (
                    <TableBody>
                    <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                            No documents found.
                        </TableCell>
                    </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                    {documents.map((document) => (
                        <DocumentRow key={document._id.toString()} document={document} />
                    ))}
                    </TableBody>
                )

                }
          </Table>
        )}
        <div className="flex justify-center">
            <Button variant='ghost' 
            size={"sm"}
             disabled={status !== "CanLoadMore"}
              onClick={() => loadMore(5)}
              >
              {status === "LoadingMore" ? (
                <div className="flex items-center gap-1">
                  <span>Loading...</span>
                      <ImPacman className="animate-pulse size-5 fill-yellow-500" />
                  <span className="text-muted-foreground justify-center"><MoreHorizontal className="h-4 w-4" /></span>
                </div>
              ) : status === "CanLoadMore" ? (
                <div className="flex items-center gap-1">
                  <span>Load More</span>
                  <Ghost size={16} />                      
                </div>
              ) : (
                <div className="flex items-center gap-1">
                <span className="text-muted-foreground">End of documents</span>
                <FaRegSadTear className="size-4 text-muted-foreground" />
                </div>
              )}
            </Button>
        </div>
       </div>
    );
}