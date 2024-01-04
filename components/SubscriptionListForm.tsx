"use client";
import { useDrag, useDrop } from "react-dnd";
import {
    useState,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    MouseEventHandler,
    FormEvent,
} from "react";
import SubscriptionCard from "./SubscriptionCard";
import { draggableCard } from "@/types/draggable";
import { subscription } from "@/types/youtube-utils-types";
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
    const [groupTitle, setGroupTitle] = useState<string>("");
    const allSubscriptionsList = (
        <SubscriptionList
            currentSubscriptions={props.initialSubscriptions}
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
