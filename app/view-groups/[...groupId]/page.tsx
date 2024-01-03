import { subscriptionGroup } from "@/utils/database/database-utils";
import { headers } from "next/headers";
import Image from "next/image";

export default async function ViewGroupWithId({
    params,
}: {
    params: { groupId: string };
}) {
    const userGroupsResponse = await fetch(
        process.env.URL + "/api/user/groups",
        {
            headers: headers(),
        }
    );
    let selectedGroup: undefined | null | subscriptionGroup = null;
    let subscriptionComponents = null;
    if (userGroupsResponse) {
        const groupsData: subscriptionGroup[] = await userGroupsResponse.json();
        console.log(groupsData);
        selectedGroup = groupsData.find(
            (group) => group.id!.toString() == params.groupId
        );
        if (selectedGroup) {
            subscriptionComponents = selectedGroup.subscriptions.map((sub) => {
                console.log("logging thumbnails: ");
                console.log(sub.snippet.thumbnails);
                return (
                    <div key={sub.id}>
                        <div>{sub.snippet.title}</div>
                        <div>{sub.snippet.description}</div>
                        <div>{sub.snippet.resourceId.channelId}</div>
                        <div>
                            <Image
                                width={25}
                                height={25}
                                src={sub.snippet.thumbnails["default"].url}
                                alt="channel thumbnail"
                            />
                        </div>
                    </div>
                );
            });
        }
    }
    return (
        <>
            <div> this is where you&apos;ll view a specific list</div>
            <div> the id received for this page was {params.groupId}</div>
            <div>
                {" "}
                {selectedGroup ? (
                    <div>
                        {" "}
                        {selectedGroup.groupName}
                        {subscriptionComponents}
                    </div>
                ) : (
                    "Sorry, no group found with that id for the current user"
                )}
            </div>
        </>
    );
}
