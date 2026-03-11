"use client";

import { Doc } from "../../../convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";
import { Table, TableBody } from "@/components/ui/table";
import {
  Ghost,
  LoaderIcon,
  MoreHorizontal,
  LayoutGrid,
  List,
} from "lucide-react";
import { DocumentRow } from "./document-row";
import { DocumentCard } from "./document-card";
import { Button } from "@/components/ui/button";
import { ImPacman } from "react-icons/im";
import { FaRegSadTear } from "react-icons/fa";
import { useState } from "react";

type LayoutMode = "grid" | "list";

interface DocumentsViewProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsViewProps) => {
  const [layout, setLayout] = useState<LayoutMode>("grid");

  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-[#202124]">Recent documents</h2>

        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#f1f3f4]">
          <Button
            variant="ghost"
            size="icon"
            title="Grid view"
            onClick={() => setLayout("grid")}
            className={`h-7 w-7 rounded-md transition-all duration-150 ${
              layout === "grid"
                ? "bg-white shadow-sm text-[#1a73e8]"
                : "text-[#5f6368] hover:text-[#202124] hover:bg-white/60"
            }`}
          >
            <LayoutGrid className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="List view"
            onClick={() => setLayout("list")}
            className={`h-7 w-7 rounded-md transition-all duration-150 ${
              layout === "list"
                ? "bg-white shadow-sm text-[#1a73e8]"
                : "text-[#5f6368] hover:text-[#202124] hover:bg-white/60"
            }`}
          >
            <List className="size-3.5" />
          </Button>
        </div>
      </div>

      {documents === undefined ? (
        <div className="flex items-center justify-center h-40">
          <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        </div>
      ) : documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 gap-2 text-[#5f6368]">
          <Ghost size={32} className="text-[#bbb]" />
          <p className="text-sm">No documents found</p>
        </div>
      ) : layout === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {documents.map((doc) => (
            <DocumentCard key={doc._id.toString()} document={doc} />
          ))}
        </div>
      ) : (
        <Table>
          <TableBody>
            {documents.map((doc) => (
              <DocumentRow key={doc._id.toString()} document={doc} />
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-center mt-2">
        <Button
          variant="ghost"
          size="sm"
          disabled={status !== "CanLoadMore"}
          onClick={() => loadMore(5)}
        >
          {status === "LoadingMore" ? (
            <div className="flex items-center gap-1">
              <ImPacman className="animate-pulse size-5 fill-yellow-500" />
              <span className="text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </span>
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
};