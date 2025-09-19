"use server";

import { ConvexHttpClient } from "convex/browser";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocument(ids: Id<"documents">[]) {
    return await convex.query(api.documents.getByIds, { ids });
}

export  async function getUsers() {

    const { sessionClaims } = await auth();
    const clerk = await clerkClient();

    const response = await clerk.users.getUserList({
        organizationId: [sessionClaims?.id as string],
    });

    const users = response.data.map((user) => {
        return {
            id: user.id,
            name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
            avatar: user.imageUrl,
        };
    })
    return users;

}