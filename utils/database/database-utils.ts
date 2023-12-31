import { MongoClient, ServerApiVersion } from "mongodb";
import { subscription } from "../youtube/youtube-utils-types";

const uri = process.env.MONGODB_CONNECTION_STRING!;
const client = new MongoClient(uri, {
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
    subscriptions: [subscription];
};

type user = {
    googleID: string;
    email: string;
    subscriptionGroups: [subscriptionGroup];
};
export async function findUser(email: string, googleID: string) {
    try {
        //await client.connect(); //client.connect is optional in recent mongodb versions
        const usersCollection = client
            .db(process.env.DATABASE_NAME)
            .collection("users");
        const selectedUser = await usersCollection.findOne({
            email: email,
            googleID: googleID,
        });
        return selectedUser;
    } catch (error) {
        console.error(
            "something went wrong when searching for a user in the database",
            error
        );
    } finally {
        await client.close();
    }
}

export async function createUserIfNotExists(email: string, googleID: string) {
    // creates user if they don't exist, otherwise returns the user
    let selectedUser = null;
    try {
        //await client.connect();
        const usersCollection = client
            .db(process.env.DATABASE_NAME)
            .collection("users");
        const userExists = await usersCollection.findOne({
            email: email,
            googleID: googleID,
        });
        let selectedUser = null;
        if (userExists !== null) {
            console.log(
                "Attempted to create user, but user already exists. returning user..."
            );
            selectedUser = userExists;
        } else {
            selectedUser = await usersCollection.insertOne({
                email: email,
                googleID: googleID,
                subscriptionGroups: [],
            });
        }
    } catch (error) {
        console.error(
            "something went wrong when creating a user in the database",
            error
        );
    } finally {
        await client.close();
        return selectedUser;
    }
}
export async function synchronizeGroups(email: string, googleID: string) {
    //TODO: we need a function to remove subscriptions from groups when a user
    //unsubscribes to them before visiting the application
    //and considering this case, we also need to consider things like empty
    //groups and so on
    return null;
}
