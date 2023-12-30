import Image from 'next/image'
import { getAuthClient } from '@/utils/auth-utils'
import { redirect } from 'next/navigation';
import { getSubscribedChannels } from '@/utils/youtube/youtube-utils';
import { subscription, subscriptionResponse } from '@/utils/youtube/youtube-utils-types';
//import Link from 'next/link';

export default async function Home() {
    const oauthClient = getAuthClient();
    const credentials = oauthClient.credentials;
    console.log(credentials);
    if (credentials.access_token == undefined) {
        redirect("/login");
    }
    const subscribedChannelsResponse: subscriptionResponse = await getSubscribedChannels(credentials.access_token);
    //console.log(subscribedChannels);
    /*
    if (subscribedChannelsResponse != null ){
        for (const channel of subscribedChannelsResponse.items) {
            console.log(channel);
        }
    }
     */
    if (subscribedChannelsResponse != null) {
        //console.log(subscribedChannelsResponse)
        console.log(subscribedChannelsResponse.nextPageToken)
        console.log(subscribedChannelsResponse.prevPageToken)
        console.log(subscribedChannelsResponse.pageInfo)
        console.log(subscribedChannelsResponse.kind)
    }
  return (
      <>
          <h1> this is the homepage huzzah</h1>
          <div> 
              retrieved credentials:
              {credentials.access_token}
          </div>
      </>
  )
}
