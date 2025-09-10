
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ExternalLinkIcon, MoreVertical } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";

interface DocumentMenuProps {
    documentId: Id<"documents">;
    documentTitle: string;
    onNewTab: (id: Id<"documents">) => void;
}

export const DocumentMenu = ({ documentId, documentTitle, onNewTab }: DocumentMenuProps) => {
    return (
        <div>
            <Button variant="ghost" size="icon" className="rounded-full">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreVertical className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => onNewTab(documentId)}>
                            <ExternalLinkIcon className="size-4 mr-2" />
                            Open in new tab
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Button>
        </div>
    );
};
