#!/bin/bash

# Parar o container se estiver em execução
docker stop rottenPotatoes-ui

# Remover o container
docker rm rottenPotatoes-ui

# Remover a imagem Docker
docker image rm rotten-potatoes-ui

# Construir a nova imagem Docker
docker build -t rotten-potatoes-ui .

# Executar o novo container em segundo plano na porta 8080
docker run -d -p 8080:8080 --name rottenPotatoes-ui rotten-potatoes-ui
