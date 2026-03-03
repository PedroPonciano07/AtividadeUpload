const produtoModel = require("../models/produtoModel");

const produtoController = {

    /**
     * @async
     * @function criarProduto
     * @description Cadastra um novo produto no sistema
     */
    criarProduto: async (req, res) => {
        try {

            const {
                idCategoria,
                nomeProduto,
                valorProduto
            } = req.body;

            if (!idCategoria || !nomeProduto || !valorProduto) {
                return res.status(400).json({
                    erro: "Campos obrigatórios não foram preenchidos"
                });
            }

            const imagem = req.file ? req.file.filename : null;

            const result = await produtoModel.inserirProduto(
                idCategoria,
                nomeProduto,
                valorProduto,
                imagem
            );

            return res.status(200).json({
                mensagem: "Produto cadastrado com sucesso!",
                idProduto: result.insertId
            });

        } catch (error) {
            console.error("Erro ao criar produto:", error);
            return res.status(500).json({
                erro: "Erro interno ao cadastrar produto"
            });
        }
    },
    listarProdutos: async (req, res) => {
        try {
            const { idProduto } = req.query;

            if (idProduto) {
                const produto = await produtoModel.buscarUm(idProduto);

                if (!produto || produto.length === 0) {
                    return res.status(400).json({
                        erro: "Produto não encontrado"
                    });
                }

                return res.status(200).json(produto[0]);
            }

            const produtos = await produtoModel.listarTodos();

            return res.status(200).json(produtos);

        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            return res.status(500).json({
                erro: "Erro interno ao listar produtos"
            });
        }
    },

    /**
     * @async
     * @function atualizarProduto
     * @description Atualiza um produto existente
     */
    atualizarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;

            if (!idProduto || idProduto.length !== 36) {
                return res.status(400).json({
                    erro: "ID do produto inválido"
                });
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(400).json({
                    erro: "Produto não encontrado"
                });
            }

            const atual = produto[0];

            const {
                idCategoria,
                nomeProduto,
                valorProduto,
                vinculoImagem,
                dataCadastro
            } = req.body;

            const idCategoriaNovo = idCategoria ?? atual.idCategoria;
            const nomeNovo = nomeProduto ?? atual.nomeProduto;
            const valorNovo = valorProduto ?? atual.valorProduto;
            const imagemNova = vinculoImagem ?? atual.vinculoImagem;
            const dataNova = dataCadastro ?? atual.dataCadastro;

            await produtoModel.atualizarProduto(
                idProduto,
                idCategoriaNovo,
                nomeNovo,
                valorNovo,
                imagemNova,
                dataNova
            );

            return res.status(200).json({
                mensagem: "Produto atualizado com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            return res.status(500).json({
                erro: "Erro interno ao atualizar produto"
            });
        }
    },

    /**
     * @async
     * @function deletarProduto
     * @description Remove um produto pelo ID
     */
    deletarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;

            if (!idProduto || idProduto.length !== 36) {
                return res.status(400).json({
                    erro: "ID do produto inválido"
                });
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(400).json({
                    erro: "Produto não encontrado"
                });
            }

            await produtoModel.deletarProduto(idProduto);

            return res.status(200).json({
                mensagem: "Produto deletado com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            return res.status(500).json({
                erro: "Erro interno ao deletar produto"
            });
        }
    },

    /**
     * @async
     * @function criarCategoria
     * @description Cadastra uma nova categoria
     */
    criarCategoria: async (req, res) => {
        try {
            const { descricaoCategoria } = req.body;

            // 🔎 Validação
            if (!descricaoCategoria || descricaoCategoria.trim() === "") {
                return res.status(400).json({
                    erro: "Descrição da categoria é obrigatória"
                });
            }

            // 🔎 Verifica se já existe categoria com mesmo nome
            const categoriaExistente = await categoriaModel.buscarPorDescricao(descricaoCategoria);

            if (categoriaExistente.length > 0) {
                return res.status(400).json({
                    erro: "Categoria já cadastrada"
                });
            }

            const result = await categoriaModel.inserirCategoria(descricaoCategoria);

            return res.status(200).json({
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

    /**
     * @async
     * @function listarCategorias
     * @description Lista todas as categorias ou uma específica por ID
     */
    listarCategorias: async (req, res) => {
        try {
            const { idCategoria } = req.query;

            // 🔎 Buscar categoria específica
            if (idCategoria) {

                if (isNaN(idCategoria)) {
                    return res.status(400).json({
                        erro: "ID da categoria inválido"
                    });
                }

                const categoria = await categoriaModel.buscarUm(idCategoria);

                if (!categoria || categoria.length === 0) {
                    return res.status(400).json({
                        erro: "Categoria não encontrada"
                    });
                }

                return res.status(200).json(categoria[0]);
            }

            // 📂 Listar todas
            const categorias = await categoriaModel.listarTodas();

            return res.status(200).json(categorias);

        } catch (error) {
            console.error("Erro ao listar categorias:", error);
            return res.status(500).json({
                erro: "Erro interno ao listar categorias"
            });
        }
    }

};


module.exports = { produtoController };