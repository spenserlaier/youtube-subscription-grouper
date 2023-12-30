export const getSubscribedChannels = async (accessToken:string, pageToken:string|null = null) => {
  try {
    //const response = await fetch('https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true', {
      let fetchURL = "";
      let maxResults = "50";
      if (pageToken == null) {
          fetchURL = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=${maxResults}`
      }
      else{
          fetchURL= `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=${maxResults}&pageToken=${pageToken}`
      }
    //const response = await fetch('https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=200', {
    const response = await fetch(fetchURL, {
        //it seems like the max is 50, even if you attempt to select a higher value
        // Use 'nextPageToken' in the next API request to get the next page
        // Example: https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=50&pageToken=YOUR_NEXT_PAGE_TOKEN&key=[YOUR_API_KEY]

      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
    console.error('Error fetching subscribed channels:', error);
    return null;
  }
};
