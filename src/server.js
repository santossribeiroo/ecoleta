const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")

//Configurar pasta pública
server.use(express.static("public"))

// Habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//Utilizar nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurar caminhos
//Página Inicial
//req - Requisição  res - Resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    // req.query: Query strings da URL
    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: O Corpo do formulário
    console.log(req.body)

    // Inserir os dados no banco

    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Cadastro!")
        }

        console.log("Cadastrado com Sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)


})

server.get("/search", (req, res) => {

    const searchCity  = req.query.city;
    // const searchState = req.query.state;

    if (searchCity == "") {
        // Pesquisa Vazia
        // Mostrar a página html com banco
        return res.render("search-results.html", { total: 0 })
    }

    //Pegar os dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${searchCity}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros:")
        console.log(rows)

        const total = rows.length

        // Mostrar a página html com banco
        return res.render("search-results.html", { places: rows, total: total })
    })
})

//Ligar o servidor
server.listen(3000)