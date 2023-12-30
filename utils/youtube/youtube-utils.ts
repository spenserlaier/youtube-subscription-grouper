export const getSubscribedChannels = async (accessToken:string) => {
  try {
    const response = await fetch('https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true', {
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
