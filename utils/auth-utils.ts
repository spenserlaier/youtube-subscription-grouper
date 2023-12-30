import { google } from 'googleapis';

import { OAuth2Client, Credentials } from 'google-auth-library';

const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth/callback"

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const generateAuthUrl = () => {
  const scopes = ['https://www.googleapis.com/auth/youtube.readonly',
      "openid",
      "email",
      "profile"
  ];
  return oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes});
};

export const getTokenFromCode = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

export const setCredentials = (tokens: Credentials) => {
  oauth2Client.setCredentials(tokens);
};

export const getAuthClient = () => {
  return oauth2Client;
};

