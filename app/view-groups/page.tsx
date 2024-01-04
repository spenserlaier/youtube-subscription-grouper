import { subscriptionGroup } from "@/utils/database/database-utils";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ViewGroups() {
    const groupsResponse = await fetch(
        process.env.URL + "/api/user/groups",

        {
            headers: headers(),
        }
    );
    const subscriptionGroups: subscriptionGroup[] = await groupsResponse.json();
    const groupComponents = subscriptionGroups.map((group) => (
        <Link
            href={`/view-groups/${group.id!.toString()}`}
            key={group.groupName}
        >
            <div>{group.groupName}</div>
        </Link>
    ));
    return (
        <>
            <div>View your groups here</div>
            {groupComponents}
        </>
    );
}
