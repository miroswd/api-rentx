import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
  upload(folder: string) {
    // recebendo folder, para quem fizer a chamada tenha a autonomia de escolher a pasta q terá os uploads
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
