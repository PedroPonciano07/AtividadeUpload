const imagemController = {
    upload:async(req, res) =>{
        try {
            if(!req.file){
                return res.status(400).json({message:'Arquivo nao foi enviado'});
            }
            return res.status(200).json({message:'Upload realizadi com sucesso'});
            
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor ', errorMessage: error.message});
            
            
        }
    }
}

export default imagemController;