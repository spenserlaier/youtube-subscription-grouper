"use client";
import { useDrag, useDrop } from "react-dnd";
import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { draggableCard } from "@/types/draggable";
import { subscription } from "@/types/youtube-utils-types";
import SubscriptionList from "./SubscriptionList";

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
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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

            <button> Submit List </button>
        </>
    );
}
