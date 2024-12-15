# PetCare - API

PetCare - Sistema de Acompanhamento de Saúde para Pets!

Essa é a API que facilita o seu cuidado com o seu PET =)

## Como começar?

1. Clone o projeto para sua máquina

```bash
git clone https://github.com/petcare-es/petcare-api
```

2. Na raiz do projeto, crie um arquivo chamado `.env`. Use o arquivo `.env.example` como base. 

### Usando o Docker

3. Levante os containers

```bash
docker compose up -d
```

4. Atualize o banco de dados usando as migrações

Entre no container

```bash
docker container exec -it petcare_api /bin/bash
```

Execute as migrações

```bash
npx prisma migrate deploy
```

### Do jeito raiz

Você precisará ter instalado em sua máquina:
- NodeJs (v20.17.0)
- PostgresSQL (v13)

3. Instale as dependências

```bash
npm install
```

4. Execute as migrações

```bash
npx prisma migrate deploy
```

5. Inicialize a API

```bash
npm run dev
```