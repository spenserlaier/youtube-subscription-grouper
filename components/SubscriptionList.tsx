"use client";
import { useDrag, useDrop } from "react-dnd";
import { useState, Dispatch, SetStateAction } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { draggableCard } from "@/types/draggable";
import { subscription } from "@/types/youtube-utils-types";

type props = {
    //subscriptionName: string;
    currentSubscriptions: subscription[];
    canModify: boolean;
    callback: Dispatch<SetStateAction<subscription[]>>;
};

type collected = {
    isDragging: boolean;
};
const acceptedItems = "SubscriptionCard";
export default function SubscriptionList(props: props) {
    const [collectedProps, drop] = useDrop(() => ({
        accept: [acceptedItems],
        collect: (monitor) => {
            const item: subscription = monitor.getItem();
        },
        drop: (item, monitor) => {
            const newSub = item as subscription;
            props.callback((subscriptions) => {
                if (props.canModify) {
                    const currentIDs = subscriptions.map((sub) => sub.id);
                    if (!currentIDs.includes(newSub.id)) {
                        return [...subscriptions, newSub];
                    }
                    return subscriptions;
                } else {
                    return subscriptions.filter((sub) => sub.id != newSub.id);
                }
            });
        },
    }));
    let subscriptionComponents = null;
    if (props.currentSubscriptions) {
        subscriptionComponents = props.currentSubscriptions.map((sub) => {
            return <SubscriptionCard {...sub} key={sub.id} />;
        });
    }

    return (
        <>
            <div className="text-xl" ref={drop}>
                Drop Target
                {subscriptionComponents}
            </div>
        </>
    );
}
