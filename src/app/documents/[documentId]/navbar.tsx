'use client'

import Image from "next/image";
import Link from "next/link";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { DocumentInput } from "./document-input";
import { RenameDialog } from "@/components/rename-dialog";
import { RemoveDialog } from "@/components/remove-dialog";
import { toast } from "sonner";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, TextIcon, TrashIcon, Undo2Icon, UnderlineIcon, StrikethroughIcon, RemoveFormattingIcon  } from "lucide-react";
import {BsFilePdf} from 'react-icons/bs';
import { useEditorStore } from "@/store/use-editor-store";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "./avatars";
import { Inbox } from "./inbox";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

interface NavbarProps {
   data : Doc<"documents">
}

export const Navbar = ({data} : NavbarProps) => {
    const { export: editor } = useEditorStore();
    const router = useRouter();
    const mutation = useMutation(api.documents.create);

    const onNewDocument = () => {
        mutation({
          title: 'Untitled Document',
          initialContent: ''
        })
        .catch(() => toast.error("Something went wrong"))
        .then((id) => {
          toast.success("Document created");
          router.push(`/documents/${id}`);
        });
    }

    const insertTable = ({rows , cols} : { rows:number, cols:number}) => {
       editor?.chain().focus().insertTable({rows, cols, withHeaderRow: false}).run();
    };

    const onDownlode = (blob : Blob, fileName : string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    }

    const onSaveJSON = () => {
        if(!editor) return;
        const contant = editor.getJSON();
        const blob = new Blob([JSON.stringify(contant)], { type: 'application/json' });
        onDownlode(blob, `${data.title}.json`); 
    }

    const onSaveHTML = () => {
        if(!editor) return;
        const contant = editor.getHTML();
        const blob = new Blob([contant], { type: 'text/html' });
        onDownlode(blob, `${data.title}.html`);
    }

    const onSaveText = () => {
        if(!editor) return;
        const contant = editor.getText();
        const blob = new Blob([contant], { type: 'text/plain' });
        onDownlode(blob, `${data.title}.txt`); 
    }


  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="mr-2 size-4" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJSON}>
                        <FileJsonIcon className="mr-2 size-4" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className="mr-2 size-4" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="mr-2 size-4" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="mr-2 size-4" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={onNewDocument}>
                    <FilePlusIcon className="mr-2 size-4" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id} initialTitle={data.title}>
                  <MenubarItem 
                    onSelect={(e) => e.preventDefault()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FilePenIcon className="mr-2 size-4" />
                    Rename
                  </MenubarItem>
                  </RenameDialog>
                  <RemoveDialog documentId={data._id} title={data.title}>
                  <MenubarItem 
                    onSelect={(e) => e.preventDefault()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TrashIcon className="mr-2 size-4" />
                    Remove
                  </MenubarItem>
                  </RemoveDialog>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="mr-2 size-4" />
                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                    <Undo2Icon className="mr-2 size-4" />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                    <Redo2Icon className="mr-2 size-4" />
                    Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            Table
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>1 x 1</MenubarItem>
                          <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>2 x 2</MenubarItem>
                          <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>3 x 3</MenubarItem>
                          <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>4 x 4</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            <TextIcon className="mr-2 size-4" />
                            Text
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                <BoldIcon className="mr-2 size-4" />
                                Bold <MenubarShortcut>⌘B</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                <ItalicIcon className="mr-2 size-4" />
                                Italic <MenubarShortcut>⌘I</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                <UnderlineIcon className="mr-2 size-4" />
                                Underline <MenubarShortcut>⌘U</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                                <StrikethroughIcon className="mr-2 size-4" />
                               <span>Strikethrough&nbsp;&nbsp;</span> <MenubarShortcut>⌘D</MenubarShortcut>
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                        <RemoveFormattingIcon className="mr-2 size-4" />
                        Clear formatting
                    </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
              <div className="flex items-center gap-3 pl-6">
                <Avatars />
                <Inbox />
              <OrganizationSwitcher
                afterCreateOrganizationUrl="/"
                afterSwitchOrganizationUrl="/"
                afterLeaveOrganizationUrl="/"
                afterSelectPersonalUrl="/"
              />
              <UserButton />
        </div>
    </nav>
  );
};