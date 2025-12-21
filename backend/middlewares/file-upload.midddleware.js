import multer from 'multer';
import path from 'path';

// Set up storage engine

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'uploads/videos')
    },
    filename:function (req,file,cb){
        const name = Date.now() + '-' + path.extname(file.originalname); // path.extname() returns the extension name of the file, for example .jpg, .png, .gif etc.file.originalname;
        cb(null,name);
    }
});

const videoUpload = multer({storage,
    fileFilter:function (req,file,cb){
        if(!file.originalname.match(/\.(mp4|mov|avi|mkv)$/)){
        return cb(new Error('Only video files are allowed!'),false);
        }
        cb(null,true);
    }
})

export {videoUpload};