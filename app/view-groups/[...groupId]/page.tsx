import SubscriptionCard from "@/components/SubscriptionCard";
import VideoList from "@/components/VideoList";
import { playlistItem, video } from "@/types/youtube-utils-types";
import { subscriptionGroup } from "@/utils/database/database-utils";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
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
    let videoLists: ReactElement[] = [];
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
            videoLists = selectedGroup.subscriptions.map((sub) => {
                return (
                    <div
                        className="flex flex-col items-center w-3/4 border"
                        key={sub.snippet.resourceId.channelId}
                    >
                        <div className="border m-2">
                            <SubscriptionCard {...sub} />
                        </div>
                        <VideoList
                            channelId={sub.snippet.resourceId.channelId}
                        />
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
                    <div className="flex flex-col items-center p-2">
                        <h1 className="text-2xl">
                            {" "}
                            Viewing Group: {selectedGroup.groupName}
                        </h1>
                        {videoLists}
                    </div>
                ) : (
                    "Sorry, no group found with that id for the current user"
                )}
            </div>
        </>
    );
}
