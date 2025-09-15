"use client";

import { ReactNode} from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";


export function Room({ children }: { children: ReactNode }) {

    const param = useParams(); 
  return (
    <LiveblocksProvider 
    throttle={16}
    authEndpoint={"/api/liveblock-auth"}
    >
      <RoomProvider id={param.documentId as string}>
        <ClientSideSuspense fallback={<FullscreenLoader label="Loading Room..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}