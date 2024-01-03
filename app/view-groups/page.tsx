import { subscriptionGroup } from "@/utils/database/database-utils";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

export default async function ViewGroups() {
    const groupsResponse = await fetch(
        process.env.URL + "/api/user/groups",

        {
            headers: headers(),
        }
    );
    const subscriptionGroups: subscriptionGroup[] = await groupsResponse.json();
    const groupComponents = subscriptionGroups.map((group) => (
        <div key={group.groupName}>{group.groupName}</div>
    ));
    return (
        <>
            <div>View your groups here</div>
            {groupComponents}
        </>
    );
}
