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
            [key: string]: {
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
            [key: string]: {
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

export type channel = {
    kind: "youtube#channel";
    etag: etag;
    id: string;
    snippet: {
        title: string;
        description: string;
        customUrl: string;
        publishedAt: datetime;
        thumbnails: {
            [key: string]: {
                url: string;
                width: number;
                height: number;
            };
        };
        defaultLanguage: string;
        localized: {
            title: string;
            description: string;
        };
        country: string;
    };
    contentDetails: {
        relatedPlaylists: {
            likes: string;
            favorites: string;
            uploads: string;
        };
    };
    statistics: {
        viewCount: number;
        subscriberCount: number; // this value is rounded to three significant figures
        hiddenSubscriberCount: boolean;
        videoCount: number;
    };
    topicDetails: {
        topicIds: [string];
        topicCategories: [string];
    };
    status: {
        privacyStatus: string;
        isLinked: boolean;
        longUploadsStatus: string;
        madeForKids: boolean;
        selfDeclaredMadeForKids: boolean;
    };
    brandingSettings: {
        channel: {
            title: string;
            description: string;
            keywords: string;
            trackingAnalyticsAccountId: string;
            moderateComments: boolean;
            unsubscribedTrailer: string;
            defaultLanguage: string;
            country: string;
        };
        watch: {
            textColor: string;
            backgroundColor: string;
            featuredPlaylistId: string;
        };
    };
    auditDetails: {
        overallGoodStanding: boolean;
        communityGuidelinesGoodStanding: boolean;
        copyrightStrikesGoodStanding: boolean;
        contentIdClaimsGoodStanding: boolean;
    };
    contentOwnerDetails: {
        contentOwner: string;
        timeLinked: datetime;
    };
    localizations: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
};

export type playlistItem = {
    kind: "youtube#playlistItem";
    etag: string;
    id: string;
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            [key: string]: {
                url: string;
                width: number;
                height: number;
            };
        };
        channelTitle: string;
        videoOwnerChannelTitle: string;
        videoOwnerChannelId: string;
        playlistId: string;
        position: number;
        resourceId: {
            kind: string;
            videoId: string;
        };
    };
    contentDetails: {
        videoId: string;
        startAt: string;
        endAt: string;
        note: string;
        videoPublishedAt: string;
    };
    status: {
        privacyStatus: string;
    };
};

export type video = {
    kind: "youtube#video";
    etag: string;
    id: string;
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            [key: string]: {
                url: string;
                width: number;
                height: number;
            };
        };
        channelTitle: string;
        tags: [string];
        categoryId: string;
        liveBroadcastContent: string;
        defaultLanguage: string;
        localized: {
            title: string;
            description: string;
        };
        defaultAudioLanguage: string;
    };
    contentDetails: {
        duration: string;
        dimension: string;
        definition: string;
        caption: string;
        licensedContent: boolean;
        regionRestriction: {
            allowed: [string];
            blocked: [string];
        };
        contentRating: {
            acbRating: string;
            agcomRating: string;
            anatelRating: string;
            bbfcRating: string;
            bfvcRating: string;
            bmukkRating: string;
            catvRating: string;
            catvfrRating: string;
            cbfcRating: string;
            cccRating: string;
            cceRating: string;
            chfilmRating: string;
            chvrsRating: string;
            cicfRating: string;
            cnaRating: string;
            cncRating: string;
            csaRating: string;
            cscfRating: string;
            czfilmRating: string;
            djctqRating: string;
            //"djctqRatingReasons": [, // not sure what this means, but it's how the original type was written
            djctqRatingReasons: [any, string];
            ecbmctRating: string;
            eefilmRating: string;
            egfilmRating: string;
            eirinRating: string;
            fcbmRating: string;
            fcoRating: string;
            fmocRating: string;
            fpbRating: string;
            fpbRatingReasons: [any, string];
            fskRating: string;
            grfilmRating: string;
            icaaRating: string;
            ifcoRating: string;
            ilfilmRating: string;
            incaaRating: string;
            kfcbRating: string;
            kijkwijzerRating: string;
            kmrbRating: string;
            lsfRating: string;
            mccaaRating: string;
            mccypRating: string;
            mcstRating: string;
            mdaRating: string;
            medietilsynetRating: string;
            mekuRating: string;
            mibacRating: string;
            mocRating: string;
            moctwRating: string;
            mpaaRating: string;
            mpaatRating: string;
            mtrcbRating: string;
            nbcRating: string;
            nbcplRating: string;
            nfrcRating: string;
            nfvcbRating: string;
            nkclvRating: string;
            oflcRating: string;
            pefilmRating: string;
            rcnofRating: string;
            resorteviolenciaRating: string;
            rtcRating: string;
            rteRating: string;
            russiaRating: string;
            skfilmRating: string;
            smaisRating: string;
            smsaRating: string;
            tvpgRating: string;
            ytRating: string;
        };
        projection: string;
        hasCustomThumbnail: boolean;
    };
    status: {
        uploadStatus: string;
        failureReason: string;
        rejectionReason: string;
        privacyStatus: string;
        publishAt: string;
        license: string;
        embeddable: boolean;
        publicStatsViewable: boolean;
        madeForKids: boolean;
        selfDeclaredMadeForKids: boolean;
    };
    statistics: {
        viewCount: string;
        likeCount: string;
        dislikeCount: string;
        favoriteCount: string;
        commentCount: string;
    };
    player: {
        embedHtml: string;
        embedHeight: long;
        embedWidth: long;
    };
    topicDetails: {
        topicIds: [string];
        relevantTopicIds: [string];
        topicCategories: [string];
    };
    recordingDetails: {
        recordingDate: string;
    };
    fileDetails: {
        fileName: string;
        fileSize: number;
        fileType: string;
        container: string;
        videoStreams: [
            {
                widthPixels: number;
                heightPixels: number;
                frameRateFps: double;
                aspectRatio: double;
                codec: string;
                bitrateBps: number;
                rotation: string;
                vendor: string;
            },
        ];
        audioStreams: [
            {
                channelCount: number;
                codec: string;
                bitrateBps: number;
                vendor: string;
            },
        ];
        durationMs: number;
        bitrateBps: number;
        creationTime: string;
    };
    processingDetails: {
        processingStatus: string;
        processingProgress: {
            partsTotal: number;
            partsProcessed: number;
            timeLeftMs: number;
        };
        processingFailureReason: string;
        fileDetailsAvailability: string;
        processingIssuesAvailability: string;
        tagSuggestionsAvailability: string;
        editorSuggestionsAvailability: string;
        thumbnailsAvailability: string;
    };
    suggestions: {
        processingErrors: [string];
        processingWarnings: [string];
        processingHints: [string];
        tagSuggestions: [
            {
                tag: string;
                categoryRestricts: [string];
            },
        ];
        editorSuggestions: [string];
    };
    liveStreamingDetails: {
        actualStartTime: string;
        actualEndTime: string;
        scheduledStartTime: string;
        scheduledEndTime: string;
        concurrentViewers: number;
        activeLiveChatId: string;
    };
    localizations: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
};
