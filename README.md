# API-RESTful-de-CRUD-
TF Aula 12 Desinvolvimento Web  

## Nome do projeto 
    API-RESTful-de-CRUD

## como configurar
    1-Clone o repositório:
        bash
        git clone https://github.com/Danilo8922/API-RESTful-de-CRUD-.git
        cd api-clientes

    2-Istale as dependências 
        npm install

    3-Crie um arquivo .env(variaveis do ambiente)
        coloque essas informações 
            DB_HOST=localhost
            DB_PORT=5432
            DB_USER=postgres
            DB_PASSWORD=sua_senha
            DB_DATABASE=cadastro_clientes
            PORT=3000

    4-certifique de ter o banco de dados e as tabelas feitas e rodando na porta 3000
        CREATE DATABASE cadastro_clientes

        CREATE TABLE clientes (
            codigo SERIAL PRIMARY KEY,
            nome TEXT NOT NULL,
            data_nascimento DATE,
            rg TEXT,
            cpf TEXT UNIQUE,
            telefone TEXT,
            endereco TEXT,
            numero TEXT,
            cidade TEXT,
            uf TEXT,
            cep TEXT
        );        

## como rodar 

    Rode a api no terminal 'node app.js'




## Exemoplos de uso 
    para fazer uma requesição basta usa o comando curl no terminal
    EX:
        curl -X POST http://localhost:3000/clientes \
        -H "Content-Type: application/json" \
        -d '{
                "nome": "Maria Souza",
                "cpf": "98765432100",
                "data_nascimento": "1985-08-15",
                "rg": "9876547",
                "telefone": "11987654321",
                "endereco": "Av. Central",
                "numero": "456",
                "cidade": "Rio de Janeiro",
                "uf": "RJ",
                "cep": "20000-000"
            }'

    Resposta:
        {
                "nome": "Maria Souza",
                "cpf": "98765432100",
                "data_nascimento": "1985-08-15",
                "rg": "9876547",
                "telefone": "11987654321",
                "endereco": "Av. Central",
                "numero": "456",
                "cidade": "Rio de Janeiro",
                "uf": "RJ",
                "cep": "20000-000"
            }
