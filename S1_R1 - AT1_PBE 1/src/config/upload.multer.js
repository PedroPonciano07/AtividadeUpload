import multer from "multer";
import path from "path"
import crypto from "crypto"
import fs from "fs"

const baseUploadDir = path.resolve(process.cwd(),'uploads');

const verificarDir = (dir)=>{
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir,{ recursive: true });
    }
}

const createMulter = ({pasta, tipoPermitidos, tamanhoArquivos }) => {
    const pastaFinal = path.join(baseUploadDir, pasta);
    verificarDir(pastaFinal);
    const storage=multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, pastaFinal);

        },
        filename:(req, file, cb)=>{
            const hash = crypto.randomBytes(12).toString('hex');
            cb(null, `${hash}-${file.originalname}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        if(!tipoPermitidos.includes(file.mimetype)){
            return cb(new Error("Tipo de arquivo nao permitido"));
        }
        cb(null, true);
    }
    return multer({
        storage,
        limits: {tamanhoArquivos},
        fileFilter
    })

}
export default createMulter;