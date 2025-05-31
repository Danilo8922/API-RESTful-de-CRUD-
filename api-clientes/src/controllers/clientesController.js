const db = require('../database/connection')


module.exports = {
    async create(req, res){
        try{
            const {nome, data_nascimento, rg, cpf, telefone, endereco, numero, cidade, uf, cep} = req.body
            if(!nome){
                return res.status(400).json({mensagem: 'Nome é obrigatório'})
            }

            const cpfExiste = await db('clientes').where({ cpf }).first()
            if(cpfExiste){
                return res.status(400).json({ mensagem: 'CPF já cadastrado'})
            }

            const [cliente] = await db('clientes').insert({
                nome, data_nascimento, rg, cpf, telefone, endereco, numero, cidade, uf, cep
            }).returning('*')

            return res.status(201).json(cliente)
        } catch (error){
            console.error(error)
            return res.status(500).json({mensagem: 'Erro interno no servidor'})
        }
    },

    
    async getById(req, res) {
        try {
            const { codigo } = req.params;

            const cliente = await db('clientes').where({ codigo }).first();

            if (!cliente) {
                return res.status(404).json({ mensagem: 'Cliente não encontrado' });
            }

            return res.status(200).json(cliente);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    },

        async list(req, res) {
        try {
            const { nome, cidade, uf } = req.query;

            let query = db('clientes');

            if (nome) query = query.where('nome', 'ilike', `%${nome}%`);
            if (cidade) query = query.where('cidade', 'ilike', `%${cidade}%`);
            if (uf) query = query.where('uf', uf);

            const clientes = await query;

            return res.status(200).json(clientes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    },
        async update(req, res) {
        try {
            const { codigo } = req.params;
            const dados = req.body;

            const cliente = await db('clientes').where({ codigo }).first();
            if (!cliente) {
                return res.status(404).json({ mensagem: 'Cliente não encontrado' });
            }

            if (dados.cpf) {
                const cpfExiste = await db('clientes')
                    .where({ cpf: dados.cpf })
                    .andWhereNot({ codigo })
                    .first();
                if (cpfExiste) {
                    return res.status(400).json({ mensagem: 'CPF já cadastrado por outro cliente' });
                }
            }

            const [clienteAtualizado] = await db('clientes')
                .where({ codigo })
                .update(dados)
                .returning('*');

            return res.status(200).json(clienteAtualizado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    },

    async remove(req, res) {
        try {
            const { codigo } = req.params;

            const cliente = await db('clientes').where({ codigo }).first();
            if (!cliente) {
                return res.status(404).json({ mensagem: 'Cliente não encontrado' });
            }

            await db('clientes').where({ codigo }).delete();

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}


