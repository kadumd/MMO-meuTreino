const http = require("http")
const fs = require("fs")
const porta = 3000

const servidor = http.createServer((pedido, resposta) => {
    const url = pedido.url
    console.log(url)
    if (url === "/") {
        resposta.end(fs.readFileSync("./index.html"))
    } else if (url === "/style.css") {
        resposta.end(fs.readFileSync("./style.css"))
    }
    if (url === "/lista") {
        resposta.end(fs.readFileSync("./listaDePlayers.json"))
    }

    if (url === "/adicionarPlayer") {
        pedido.on("data", (body) => {
            const nomeECorRecebidos = JSON.parse(body)
            const cor = nomeECorRecebidos.corNoInput
            const nome = nomeECorRecebidos.nomeNoInput
            const tamanhoAltura = 100
            const tamanhoLargura = 100
            const positionEsquerda = 0
            const positionAltura = 0
            const criar = [{ nomeDoPlayer: nome, cor: cor, left: positionEsquerda, bottom: positionAltura, largura: tamanhoLargura, altura: tamanhoAltura }]
            const lista = JSON.parse(fs.readFileSync('./listaDePlayers.json'));

            lista[nome] = criar
            fs.writeFileSync('listaDePlayers.json', JSON.stringify(lista));


            resposta.writeHead(200, { "Content-Type": "application/json" })
            resposta.end(JSON.stringify({ nome, cor, tamanhoAltura, tamanhoLargura, positionEsquerda, positionAltura }))
        })
    }

    if (url === "/playerAndaDireita") {
        pedido.on("data", (body) => {
            const pegarArrayPeloNome = JSON.parse(body)
            let lista = JSON.parse(fs.readFileSync('./listaDePlayers.json'));
            lista[pegarArrayPeloNome]["0"]["left"] += 20
            fs.writeFileSync('listaDePlayers.json', JSON.stringify(lista));
            resposta.writeHead(200, { "Content-Type": "application/json" })
            resposta.end(JSON.stringify(lista[pegarArrayPeloNome]["0"]["left"]))
        })
    }

    if (url === "/playerAndaEsquerda") {
        pedido.on("data", (body) => {
            const pegarArrayPeloNome = JSON.parse(body)
            let lista = JSON.parse(fs.readFileSync('./listaDePlayers.json'));
            lista[pegarArrayPeloNome]["0"]["left"] -= 20
            fs.writeFileSync('listaDePlayers.json', JSON.stringify(lista));
            resposta.writeHead(200, { "Content-Type": "application/json" })
            resposta.end(JSON.stringify(lista[pegarArrayPeloNome]["0"]["left"]))
        })
    }

    if (url === "/playerAndaCima") {
        pedido.on("data", (body) => {
            const pegarArrayPeloNome = JSON.parse(body)
            let lista = JSON.parse(fs.readFileSync('./listaDePlayers.json'));
            lista[pegarArrayPeloNome]["0"]["bottom"] += 20
            fs.writeFileSync('listaDePlayers.json', JSON.stringify(lista));
            resposta.writeHead(200, { "Content-Type": "application/json" })
            resposta.end(JSON.stringify(lista[pegarArrayPeloNome]["0"]["bottom"]))
        })
    }

    if (url === "/playerAndaBaixo") {
        pedido.on("data", (body) => {
            const pegarArrayPeloNome = JSON.parse(body)
            let lista = JSON.parse(fs.readFileSync('./listaDePlayers.json'));
            lista[pegarArrayPeloNome]["0"]["bottom"] -= 20
            fs.writeFileSync('listaDePlayers.json', JSON.stringify(lista));
            resposta.writeHead(200, { "Content-Type": "application/json" })
            resposta.end(JSON.stringify(lista[pegarArrayPeloNome]["0"]["bottom"]))
        })
    }
})

servidor.listen(porta, () => {
    console.log("http://localhost:3000")
})