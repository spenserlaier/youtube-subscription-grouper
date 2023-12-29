import Image from 'next/image'
//import Link from 'next/link';

export default function Login() {
    const {google} = require('googleapis');
    const REDIRECT_URL = "http://localhost:3000/home"

    const oauth2Client = new google.auth.OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      REDIRECT_URL
    );
    // generate a url that asks permissions for youtube subscription scope
    const scopes = [
      'https://www.googleapis.com/auth/youtube.readonly'
    ];
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      // If you only need one scope you can pass it as a string
      scope: scopes
    });
  return (
      <div>
          this is a default login div
          oh snap
          <a href={url}>
              authenticate with google
          </a>
      </div>
  )
}
