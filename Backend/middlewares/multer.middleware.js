import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./utils/upload/");
    },
    filename: function (req, file, cb){
        
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})

export const upload = multer({storage: storage});