import { playlistItem } from "@/types/youtube-utils-types";
import { subscriptionGroup } from "@/utils/database/database-utils";
import { headers } from "next/headers";
import Image from "next/image";
import { ReactElement } from "react";

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
    let uploadsComponents: ReactElement[] = [];
    if (userGroupsResponse) {
        const groupsData: subscriptionGroup[] = await userGroupsResponse.json();
        console.log(groupsData);
        selectedGroup = groupsData.find(
            (group) => group.id!.toString() == params.groupId
        );
        if (selectedGroup) {
            const channelIds = selectedGroup.subscriptions.map((sub) => {
                return sub.snippet.resourceId.channelId;
            });
            let channelUploads = [];
            for (const id of channelIds) {
                const uploadsData = await fetch(
                    process.env.URL + `/api/uploads/${id}`,
                    {
                        headers: headers(),
                    }
                );
                const uploads: playlistItem[] = await uploadsData.json();
                channelUploads.push(uploads);
            }
            uploadsComponents = channelUploads.map((playlist) => {
                const videos = playlist.map((v) => {
                    return (
                        <div key={v.id}>
                            {v.snippet.title}
                            <Image
                                width={88}
                                height={88}
                                src={v.snippet.thumbnails["default"].url}
                                alt={`thumbnail for ${v.snippet.title}`}
                            ></Image>
                        </div>
                    );
                });
                return <div key={playlist[0].id}>{videos}</div>;
            });

            subscriptionComponents = selectedGroup.subscriptions.map(
                (sub, idx) => {
                    //console.log("logging thumbnails: ");
                    //console.log(sub.snippet.thumbnails);
                    /*
                const playlistInformation = await fetch(
                    `api/uploads/${sub.snippet.resourceId.channelId}`,
                    {
                        headers: headers(),
                    }
                );
                 */

                    return (
                        <div key={sub.id}>
                            <div>{sub.snippet.title}</div>
                            <div>
                                <Image
                                    width={88}
                                    height={88}
                                    src={sub.snippet.thumbnails["default"].url}
                                    alt="channel thumbnail"
                                />
                            </div>
                            <div>{sub.snippet.description}</div>
                            <div>{sub.snippet.resourceId.channelId}</div>
                            <div> {uploadsComponents[idx]}</div>
                        </div>
                    );
                }
            );
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
