"use client";
import { useDrag, useDrop } from "react-dnd";
import { useState, Dispatch, SetStateAction } from "react";
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
    return (
        <>
            <div className="flex flex-row">
                {allSubscriptionsList}
                {selectedSubscriptionsList}
            </div>
        </>
    );
}
