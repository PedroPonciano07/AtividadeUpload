import createMulter  from "../config/upload.multer.js";

const uploadImage = createMulter({
    pasta: 'imagens',
    tipoPermitidos: ['image/png','image/jpeg'],
    tamanhoArquivos: 10 * 1024*1024 // 10 mb 
}).single('image');

export default uploadImage;