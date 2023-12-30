type props = {
    subscriptionName: string
}
export default function SubscriptionCard(props: props)  {
    return (
        <> 
            <h1> {props.subscriptionName}</h1>
        </>
    )
};
