"use server";

import { ConvexHttpClient } from "convex/browser";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocument(ids: Id<"documents">[]) {
    return await convex.query(api.documents.getByIds, { ids });
}

export async function getUsers() {
    const { sessionClaims, userId } = await auth();
    const clerk = await clerkClient();

    let organizationId: string | undefined = undefined;
    if (sessionClaims && typeof sessionClaims.o === "object" && sessionClaims.o !== null && "id" in sessionClaims.o) {
        organizationId = (sessionClaims.o as { id: string }).id;
    }

    if (organizationId) {
        const response = await clerk.users.getUserList({
            organizationId: [organizationId],
        });
        return response.data.map((user) => ({
            id: user.id,
            name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
            avatar: user.imageUrl,
            color: "",
        }));
    }

    if (!userId) return [];
    const user = await clerk.users.getUser(userId);
    return [{
        id: user.id,
        name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar: user.imageUrl,
        color: "",
    }];
}