"use client";

import {  ReactNode, useEffect, useMemo, useState } from "react";
import { getUsers,getDocument } from "./action";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";

type User = {
  id: string;
  name: string;
  avatar: string;
}

export function Room({ children }: { children: ReactNode }) {

    const param = useParams();
    const [users, setUsers] = useState<User[]>([]);
    
    const fetchUsers = useMemo(() => async () => {
      try{
        const list = await getUsers();
        setUsers(list);
      }catch{
        toast.error("Failed to fetch users");
      }
    }, []);

    useEffect(() => {
      fetchUsers();
    }, [fetchUsers]);


  return (
    <LiveblocksProvider 
    throttle={16}
    authEndpoint={async () => {
      const endpoint = "/api/liveblock-auth";
      const room = param.documentId as string;

      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ room }),
      });

      return await response.json();
    }}
    resolveUsers={({ userIds }) => {
      return userIds.map((userIds) => users.find((user) => user.id === userIds) ?? undefined);
    }}
    resolveMentionSuggestions={ ({ text }) => {
      let filteredUsers = users;

      if (text) {
        filteredUsers = filteredUsers.filter((user) =>
          user.name.toLowerCase().includes(text.toLowerCase())
        );
      }
      return filteredUsers.map((user) => user.id); 
    }

    }
    resolveRoomsInfo={async ({ roomIds }) =>{
      const documents = await getDocument(roomIds as Id<"documents">[]);
      return documents.map((document) => ({ id: document.id, name: document.name }));
    }}
    >
      <RoomProvider id={param.documentId as string}>
        <ClientSideSuspense fallback={<FullscreenLoader label="Loading Room..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}