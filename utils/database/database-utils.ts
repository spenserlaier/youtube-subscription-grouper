import { Collection, MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { subscription } from "@/types/youtube-utils-types";

const DB_URI = process.env.MONGODB_CONNECTION_STRING!;
const USERS_COLLECTION_NAME = "users";
//const DB_NAME = "youtubesubscriptiongroups";
const DB_NAME = process.env.DATABASE_NAME;
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

export type subscriptionGroup = {
    groupName: string;
    subscriptions: subscription[];
    id?: ObjectId;
};

export type user = {
    email: string;
    googleID: string;
    subscriptionGroups: subscriptionGroup[];
    alreadyWatched: string[];
};
export type userCredentials = {
    email: string;
    googleID: string;
};
const usersCollection: Collection<user> = client
    .db(DB_NAME)
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
export async function findUser(userCredentials: userCredentials) {
    const result = await usersCollection.findOne(userCredentials);
    console.log("found user in the database: ", result);
    return result;
}

export async function getUserGroups(userCredentials: userCredentials) {
    const userDocument = await usersCollection.findOne(userCredentials);
    if (userDocument) {
        const subscriptionGroups = userDocument.subscriptionGroups;
        return subscriptionGroups;
    } else {
        console.error("couldn't find user with credentials: ", userCredentials);
        return null;
    }
}
export async function addSubscriptionGroup(
    user: user,
    subscriptionGroup: subscriptionGroup
) {
    subscriptionGroup.id = new ObjectId();
    const existingGroups = await getUserGroups(user);
    let groupNames: string[] = [];
    if (existingGroups) {
        groupNames = existingGroups.map((group) => group.groupName);
    }
    if (!groupNames.includes(subscriptionGroup.groupName)) {
        const result = await usersCollection.findOneAndUpdate(
            { email: user.email, googleID: user.googleID },
            { $push: { subscriptionGroups: subscriptionGroup } },
            { returnDocument: "after" } // Optional: To return the updated document;
        );
        console.log("inserted new group for user: ", user.email, result);
        return result;
    } else {
        console.log(
            "already found a matching name for user ",
            user.email,
            " can't insert group"
        );
    }
}

export async function markVideoAsSeen(user: userCredentials, videoId: string) {
    const result = await usersCollection.findOneAndUpdate(
        { ...user },
        { $push: { alreadyWatched: videoId } },
        { returnDocument: "after" }
    );
    if (result) {
        console.log("added video to list of watched videos for user", result);
        return true;
    } else {
        console.log("something went wrong when updating watched videos");
        return false;
    }
}

export async function getSeenVideos(userCredentials: userCredentials) {
    const user = await usersCollection.findOne(userCredentials);
    if (user) {
        console.log("user was found when retrieving watched videos");
        return user.alreadyWatched;
    }
    return null;
}
