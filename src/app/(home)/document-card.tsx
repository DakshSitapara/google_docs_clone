"use client";

import { Doc } from "../../../convex/_generated/dataModel";
import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon } from "lucide-react";
import { format } from "date-fns";
import { DocumentMenu } from "./document-menu";
import { useRouter } from "next/navigation";
import { DocumentPreviewCard } from "./document-preview-card";
import { useEffect, useRef, useState } from "react";
import { DocumentPreviewSkeleton } from "./document-preview-skeleton";

interface DocumentCardProps {
  document: Doc<"documents">;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            setIsVisible(true);
            observer.disconnect();
          }, 100);
        } else {
          clearTimeout(timer);
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="group cursor-pointer"
      onClick={() => router.push(`/documents/${document._id}`)}
    >
      <div className="flex flex-col rounded-[4px] overflow-hidden border group-hover:border-blue-500">
        <div
          className="relative bg-white overflow-hidden"
          style={{ height: 256 }}
        >
          <div className="absolute inset-0">
            {isVisible ? (
              <DocumentPreviewCard
                content={
                  document?.latestContent ?? document?.initialContent ?? ""
                }
              />
            ) : (
              <DocumentPreviewSkeleton />
            )}
          </div>

          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
        </div>

        <div className="h-px bg-[#e0e0e0] transition-colors duration-200" />

        <div className="flex items-center gap-2 bg-[#f8f9fa] px-3 py-2.5 min-w-0">
          <SiGoogledocs className="size-5 fill-[#4285f4] flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-[#202124] truncate leading-tight">
              {document.title}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              {document.organizationId ? (
                <Building2Icon className="size-3 text-[#5f6368] flex-shrink-0" />
              ) : (
                <CircleUserIcon className="size-3 text-[#5f6368] flex-shrink-0" />
              )}
              <p className="text-[11px] text-[#5f6368] truncate">
                {format(new Date(document._creationTime), "MMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <DocumentMenu
              documentId={document._id}
              documentTitle={document.title}
              onNewTab={() =>
                window.open(`/documents/${document._id}`, "_blank")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
