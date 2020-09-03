
import { readFile, writeFile } from 'fs';
import { createInterface } from 'readline';
import { google } from 'googleapis';




export const api = () => {

  interface CredentialsType {
    installed: {
      client_id: string,
      project_id: string,
      auth_uri: string,
      token_uri: string,
      auth_provider_x509_cert_url: string,
      client_secret: string,
      redirect_uris: ["", ""]
    }
  }

  // If modifying these scopes, delete token.json.
  const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = 'token.json';

  // Load client secrets from a local file.
  readFile('./src/config/drive-api/credentials.json', (err, content:any) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), listFiles);
  });




  function authorize(credentials: CredentialsType, callback: any) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    readFile(TOKEN_PATH, (err, token:any) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   */
  const oAuth2ClientType = new google.auth.OAuth2();

  function getAccessToken(oAuth2Client: typeof oAuth2ClientType, callback: any) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token:any) => {
        console.log(token);
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  /**
   * Lists the names and IDs of up to 10 files.
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  function listFiles(auth: any) {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    }, (err, res: any) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file: any) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log('No files found.');
      }
    });

  }
  console.log('entrei');
}

