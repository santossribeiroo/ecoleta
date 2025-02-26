//Importar a depência do sqlite3
const sqlite3 = require("sqlite3").verbose()

//Criar objeto que irá fazer operações no banco
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//Utilizar para operações
//serialize = passo a passo
db.serialize( () => {

//     //Comandos SQL
//     // 1 - Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             adress TEXT,
//             adress2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // 2 - Inserir dados na tabela
//     const  query = `
//         INSERT INTO places (
//             image,
//             name,
//             adress,
//             adress2,
//             state,
//             city,
//             items
//         ) VALUES (?, ?, ?, ?, ?, ?, ?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData (err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com Sucesso")
//         console.log(this)
//     }

//     //db.run(query, values, afterInsertData) 

//     // 3 - Consultar os dados da tabela
//     db.all(`SELECT * FROM places` , function(err ,rows) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Aqui estão seus registros:")
//         console.log(rows)
//     })


//     // 4 - Deletar os dados da tabela

    db.run(`DELETE FROM places WHERE id = ?` , [14], function(err) {
        if (err) {
            return console.log(err)
        }
        
        console.log("Registro deletado com Sucesso!")
    })

})    