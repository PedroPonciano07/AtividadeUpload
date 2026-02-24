import createMulter from "../config/upload.multer.js"

const uploadFile = createMulter({
    pasta: 'documents',
    tipoPermitidos: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    tamanhoArquivos: 10 * 1024 * 1024
}).single('doc');

export default uploadFile;