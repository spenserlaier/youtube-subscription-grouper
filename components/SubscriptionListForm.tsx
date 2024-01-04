"use client";
import { useDrag, useDrop } from "react-dnd";
import {
    useState,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    MouseEventHandler,
    FormEvent,
    useEffect,
} from "react";
import SubscriptionCard from "./SubscriptionCard";
import { draggableCard } from "@/types/draggable";
import {
    subscription,
    subscriptionResponse,
} from "@/types/youtube-utils-types";
import SubscriptionList from "./SubscriptionList";
import { subscriptionGroup } from "@/utils/database/database-utils";
import { headers } from "next/headers";

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

    useEffect(() => {
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
                    }
                );
                const data = await response.json();
                //console.log("logging data from subscription api call...", data);
                setSubscriptionResponse(data);
            }
            setFetchNextPage(false);
        };
        fetchSubscriptionData();
    }, [fetchNextPage, subscriptionResponse]);

    const [groupTitle, setGroupTitle] = useState<string>("");

    const allSubscriptionsList = (
        <SubscriptionList
            currentSubscriptions={
                subscriptionResponse ? subscriptionResponse.items : []
            }
            canModify={false}
            callback={setSelectedSubscriptions}
        />
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
        <>
            <h1>
                Group Title:
                <input value={groupTitle} onChange={handleNameChange}></input>
            </h1>
            <div className="flex flex-row">
                {allSubscriptionsList}
                {selectedSubscriptionsList}
            </div>

            <button
                onClick={async (e) => {
                    const ev =
                        e as unknown as React.MouseEventHandler<HTMLButtonElement>;
                    handleSubmit(ev);
                }}
            >
                {" "}
                Submit List{" "}
            </button>
        </>
    );
}
