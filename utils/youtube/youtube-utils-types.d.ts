export type subscription = {
  "kind": "youtube#subscription",
  "etag": string,
  "id": string,
  "snippet": {
    "publishedAt": Date,
    "channelTitle": string,
    "title": string,
    "description": string,
    "resourceId": {
      "kind": string,
      "channelId": string,
    },
    "channelId": string,
    "thumbnails": {
      (key): {
        "url": string,
        "width": number,
        "height": number
      }
    }
  },
  "contentDetails": {
    "totalItemCount": number,
    "newItemCount": number,
    "activityType": string
  },
  "subscriberSnippet": {
    "title": string,
    "description": string,
    "channelId": string,
    "thumbnails": {
      (key): {
        "url": string,
        "width":  number,
        "height": number
      }
    }
  }
}

export type subscriptionResponse = {
  "kind": "youtube#subscriptionListResponse",
  "etag": etag,
  "nextPageToken": string,
  "prevPageToken": string,
  "pageInfo": {
    "totalResults": number,
    "resultsPerPage": number
  },
  "items": [
    subscription 
  ]
}
