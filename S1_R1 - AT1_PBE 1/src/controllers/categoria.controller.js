const categoriaModel = require("../models/categoriaModel");

const categoriaController = {

    // Criar Categoria
    criarCategoria: async (req, res) => {
        try {
            const { descricaoCategoria } = req.body;

            if (!descricaoCategoria) {
                return res.status(400).json({
                    erro: "Descrição da categoria é obrigatória"
                });
            }

            const categoriaExistente =
                await categoriaModel.buscarPorDescricao(descricaoCategoria);

            if (categoriaExistente.length > 0) {
                return res.status(400).json({
                    erro: "Categoria já cadastrada"
                });
            }

            const result =
                await categoriaModel.inserirCategoria(descricaoCategoria);

            return res.status(201).json({
                mensagem: "Categoria cadastrada com sucesso!",
                idCategoria: result.insertId
            });

        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            return res.status(500).json({
                erro: "Erro interno ao cadastrar categoria"
            });
        }
    },

    // Listar Categorias
    listarCategorias: async (req, res) => {
        try {
            const { idCategoria } = req.query;

            if (idCategoria) {

                if (isNaN(idCategoria)) {
                    return res.status(400).json({
                        erro: "ID da categoria inválido"
                    });
                }

                const categoria =
                    await categoriaModel.buscarUm(idCategoria);

                if (!categoria || categoria.length === 0) {
                    return res.status(404).json({
                        erro: "Categoria não encontrada"
                    });
                }

                return res.status(200).json(categoria[0]);
            }

            const categorias =
                await categoriaModel.listarTodas();

            return res.status(200).json(categorias);

        } catch (error) {
            console.error("Erro ao listar categorias:", error);
            return res.status(500).json({
                erro: "Erro interno ao listar categorias"
            });
        }
    }

};

module.exports = { categoriaController };