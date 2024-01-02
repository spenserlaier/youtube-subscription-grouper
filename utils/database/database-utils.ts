import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import { subscription } from "@/types/youtube-utils-types";

const DB_URI = process.env.MONGODB_CONNECTION_STRING!;
const USERS_COLLECTION_NAME = "users";
const client = new MongoClient(DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
export function getDBClient() {
    return client;
}

type subscriptionGroup = {
    groupName: string;
    subscriptions: subscription[];
};

type user = {
    email: string;
    googleID: string;
    subscriptionGroups: subscriptionGroup[];
};
const usersCollection: Collection<user> = client
    .db()
    .collection(USERS_COLLECTION_NAME);

export async function createUser(user: user) {
    const result = await usersCollection.insertOne(user);
    console.log("inserted user into database: ", result);
    return result;
}
export async function createUserIfNotExists(user: user) {
    const result = await findUser(user);
    if (!result) {
        createUser(user);
    }
    return null;
}
export async function findUser(user: user) {
    const result = await usersCollection.findOne(user);
    console.log("found user in the database: ", result);
    return result;
}
export async function addSubscriptionGroup(
    user: user,
    subscriptionGroup: subscriptionGroup
) {
    const result = usersCollection.findOneAndUpdate(
        { email: user.email, googleID: user.googleID },
        { $push: { subscriptionGroups: subscriptionGroup } },
        { returnDocument: "after" } // Optional: To return the updated document;
    );
    console.log("updated subscription groups for user", user.email, result);
    return result;
}
