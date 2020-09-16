import fs from "fs";
import { google } from 'googleapis';
import path from 'path';
import {callGoogleAPI}from './GdriveAuth';
import crypto from 'crypto';

async function imageUpload(auth:any) {

  const filePath = path.resolve(__dirname, '..', 'tmp');
  const fileName = String(crypto.randomBytes(8)) + 'teste';
  const fileMetadata = {
    name: fileName,
  };

  const media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream(filePath)
  }

  const drive = google.drive({ version: 'v3', auth });

  drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  }, function (err: any, file: any) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      return file.data.id;
    }
  });

}

/*Lists the names and IDs of up to 10 files.*/
async function listFiles(auth: any) {
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
class Gdrive {
  async callGdriveUpload(){
    //callGoogleAPI(imageUpload);
  }

  async callGdriveListFiles(){
    const auth = callGoogleAPI();
    listFiles(auth);
  }
}
export default Gdrive;