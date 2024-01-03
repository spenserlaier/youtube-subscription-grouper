export type subscription = {
    kind: "youtube#subscription";
    etag: string;
    id: string;
    snippet: {
        publishedAt: Date;
        channelTitle: string; // this has been returning undefined; use title instead for the channel title
        title: string;
        description: string;
        resourceId: {
            kind: string;
            channelId: string;
        };
        channelId: string;
        thumbnails: {
            /*
            (key): {
                url: string;
                width: number;
                height: number;
            };
            */
            [key: string]: {
                url: string;
                width: number;
                height: number;
            };
        };
    };
    contentDetails: {
        totalItemCount: number;
        newItemCount: number;
        activityType: string;
    };
    subscriberSnippet: {
        title: string;
        description: string;
        channelId: string;
        thumbnails: {
            (key): {
                url: string;
                width: number;
                height: number;
            };
        };
    };
};

export type draggableSubscription = {
    id: string;
    snippet: {
        title: string;
        thumbnails: {
            (key): {
                url: string;
                width: number;
                height: number;
            };
        };
    };
};

export type subscriptionResponse = {
    kind: "youtube#subscriptionListResponse";
    etag: etag;
    nextPageToken: string;
    prevPageToken: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: [subscription];
};

export type userIdentification = {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: tring;
    picture: string; //link to url for profile picture
    locale: string;
};
