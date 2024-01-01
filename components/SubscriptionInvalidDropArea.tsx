"use client";
import { useDrag, useDrop } from "react-dnd";
import { useState, Dispatch, SetStateAction } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { draggableCard } from "@/types/draggable";
import { subscription } from "@/types/youtube-utils-types";

type props = {
    //subscriptionName: string;
    initialSubscriptions?: subscription[];
    canModify?: boolean;
    parentCallback?: Dispatch<SetStateAction<[subscription]>>;
};

type collected = {
    isDragging: boolean;
};
const acceptedItems = "SubscriptionCard";
export default function SubscriptionList(props: props) {
    if (!props.initialSubscriptions) {
        props.initialSubscriptions = [];
    }
    if (!props.canModify) {
        props.canModify = true;
    }
    const initialState = props.initialSubscriptions;
    const [currentSubscriptions, setCurrentSubscriptions] =
        useState<subscription[]>(initialState);
    const [collectedProps, drop] = useDrop(() => ({
        accept: [acceptedItems],
        collect: (monitor) => {
            const item: subscription = monitor.getItem();
            console.log(item);
        },
        drop: (item, monitor) => {
            // Behavior when the item is dropped
            const subscriptionItem = item as subscription;
            console.log("Item dropped:", item);
            //onDrop(item); // Call a custom function with the dropped item
            setCurrentSubscriptions((currentSubscriptions) => {
                const subscriptionNames = currentSubscriptions.map(
                    (sub) => sub.snippet.title
                );
                if (
                    !subscriptionNames.includes(
                        subscriptionItem.snippet.title
                    ) &&
                    props.canModify
                ) {
                    return [...currentSubscriptions, subscriptionItem];
                } else {
                    /*
                    if (!monitor.didDrop() && props.canModify == true) {
                        const filteredSubscriptions =
                            currentSubscriptions.filter(
                                (sub) => sub.id != subscriptionItem.id
                            );
                        return filteredSubscriptions;
                    }
                     */
                    return currentSubscriptions;
                }
            });
        },
    }));
    const subscriptionComponents = currentSubscriptions.map((sub) => {
        return <SubscriptionCard {...sub} key={sub.id} />;
    });
    return (
        <>
            <div className="text-xl" ref={drop}>
                Drop Target
                {subscriptionComponents}
            </div>
        </>
    );
}
