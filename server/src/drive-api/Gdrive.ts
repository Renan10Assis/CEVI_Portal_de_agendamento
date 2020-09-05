import fs from "fs";
import { google } from 'googleapis';
import path from 'path';

class Gdrive {
  async imageUpload(fileName: string) {

    const filePath = path.resolve(__dirname,'..','tmp',fileName);

    let auth = require("./GdriveAuth");
    let token;


    fs.readFile('token.json', (err, content: any) => {
      
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      token = content;
    });
    console.log(token);


    /* const fileMetadata = {
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
    }); */

  }
}
export default Gdrive;