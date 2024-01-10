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
            <div className="text-2xl p-3 m-2 border rounded-xl text-center">
                {group.groupName}
            </div>
        </Link>
    ));
    const listMessage = groupComponents
        ? "Your Groups: "
        : "Looks like you haven't created any groups yet.";
    return (
        <div className="flex flex-col justify-center items-center ">
            <h1 className="text-2xl  p-2 m-2">{listMessage}</h1>
            <div className="border m-2 min-w-64 rounded-xl">
                {groupComponents}
            </div>
        </div>
    );
}
