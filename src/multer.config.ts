import { diskStorage } from 'multer';
import * as uniqid from 'uniqid';
export const multerOptions = {
  storage: diskStorage({
    destination: 'public',
    filename: async (req, file, cb) => {
      try {
        cb(null, uniqid('image-'));
      } catch (err) {
        console.log(err);
      }
    },
  }),
};
