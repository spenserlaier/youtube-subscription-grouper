"use client";
import { useDrag, useDrop } from "react-dnd";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import {
    subscription,
    subscriptionResponse,
} from "@/types/youtube-utils-types";
import SubscriptionList from "@/components/SubscriptionList";
import { subscriptionGroup } from "@/utils/database/database-utils";

type props = {
    //subscriptionName: string;
    initialSubscriptions: subscription[];
};

type collected = {
    isDragging: boolean;
};
const acceptedItems = "SubscriptionCard";
export default function SubscriptionListForm(props: props) {
    const [selectedSubscriptions, setSelectedSubscriptions] = useState<
        subscription[]
    >([]);
    const [allSubscriptions, setAllSubscriptions] = useState<subscription[]>(
        []
    );
    const [fetchNextPage, setFetchNextPage] = useState(true);
    const [subscriptionResponse, setSubscriptionResponse] =
        useState<subscriptionResponse | null>(null);
    const sourceListRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleScroll = () => {
            const listContainer = sourceListRef.current;
            if (listContainer) {
                const scrollPosition =
                    listContainer.scrollTop + listContainer.clientHeight;
                const totalHeight = listContainer.scrollHeight;

                // Check if the user has reached the bottom (or near the bottom with some threshold)
                if (scrollPosition >= totalHeight - 20) {
                    console.log("Reached the bottom!");
                    // Do something when the user reaches the bottom
                    setFetchNextPage(true);
                }
            }
        };
        const container = sourceListRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);

            return () => {
                // Clean up the event listener when the component unmounts
                container.removeEventListener("scroll", handleScroll);
            };
        }
    });

    useEffect(() => {
        let isMounted = true;
        const fetchSubscriptionData = async () => {
            if (fetchNextPage) {
                const pageToken = subscriptionResponse
                    ? subscriptionResponse.nextPageToken
                    : null;
                //TODO: try/catch
                const response = await fetch(
                    "/api/subscriptions?pageToken=" + pageToken,
                    {
                        headers: {
                            method: "GET",
                        },
                        cache: "no-store",
                    }
                );
                const data = await response.json();
                //console.log("logging data from subscription api call...", data);
                if (isMounted && data && data.items) {
                    console.log("we are mounted");
                    setSubscriptionResponse(data);
                    console.log("loggind retrieved data...", data);
                    setAllSubscriptions((subs) => {
                        return [...subs, ...data.items];
                    });
                    setFetchNextPage(false);
                }
            }
        };
        fetchSubscriptionData();
        return () => {
            isMounted = false;
        };
    });
    //}, [fetchNextPage, subscriptionResponse]);

    const [groupTitle, setGroupTitle] = useState<string>("");

    const allSubscriptionsList = (
        <div className="overflow-auto max-h-64" ref={sourceListRef}>
            <SubscriptionList
                currentSubscriptions={
                    //subscriptionResponse ? subscriptionResponse.items : []
                    allSubscriptions
                }
                canModify={false}
                callback={setSelectedSubscriptions}
            />
        </div>
    );
    const selectedSubscriptionsList = (
        <SubscriptionList
            currentSubscriptions={selectedSubscriptions}
            canModify={true}
            callback={setSelectedSubscriptions}
        />
    );
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGroupTitle(event.target.value);
    };
    const handleSubmit = async (
        //event: React.MouseEventHandler<HTMLButtonElement>
        event: React.MouseEventHandler<HTMLButtonElement>
    ) => {
        //event.preventDefault();
        const subscriptionGroup: subscriptionGroup = {
            groupName: groupTitle,
            subscriptions: selectedSubscriptions,
        };
        const response = await fetch("/api/subscriptions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            //headers(),
            body: JSON.stringify(subscriptionGroup),
        });
        console.log("tried submitting...", response.status);
        return null;
    };
    return (
        <div>
            <div className="m-3">
                <h1 className="flex flex-row justify-center text-2xl">
                    Group Title:
                    <input
                        className="bg-gray-400 rounded-xl"
                        value={groupTitle}
                        onChange={handleNameChange}
                    ></input>
                </h1>
            </div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-row">
                    <div className="text-center m-2">
                        <h1 className="text-2xl border rounded-md">
                            {" "}
                            Drag Items From Here...
                        </h1>

                        {allSubscriptionsList}
                        <div className="border rounded-lg"></div>
                    </div>
                    <div className="text-center min-w-60 m-2">
                        <h1 className="text-2xl border rounded-md">To Here</h1>

                        {selectedSubscriptionsList}
                        <div className="border"></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center text-2xl">
                <button
                    className="border m-3 p-3 rounded-xl"
                    onClick={async (e) => {
                        const ev =
                            e as unknown as React.MouseEventHandler<HTMLButtonElement>;
                        handleSubmit(ev);
                    }}
                >
                    {" "}
                    Submit List{" "}
                </button>
            </div>
        </div>
    );
}
