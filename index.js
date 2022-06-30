//Inclusão dos pacotes:
const express = require('express') 
var mysql      = require('mysql2'); //POrque instalei o npm install mysql2 e não só o mysql, como indicado.

//Instância o Express:
const app = express()

//Definição de porta:
const port = 3000

//Definiçõesd e conexão mysql:
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'sistema_noticias'
  });

  connection.connect();


// Serviço de HEllo World
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Serviço de busca de categorias. Sabemso que será um GET.
app.get('/categoria', (req, res) => {

    // Busca d categoria no banco de dados:
    connection.query('SELECT id, nome FROM sistema_noticias.categoria;', function(err, rows, fields) {
        if (err) throw err;
        
        res.send(rows)
      });
  })

app.get('/categoria/:categoriaId/critica', (req, res) => {

    // res.send(req.params.categoriaId)

    // Busca noticias de uma categoria no banco de dados:
    connection.query('SELECT postagem, titulo, conteudo, nota FROM sistema_noticias.critica WHERE categoria = ' + req.params.categoriaId, function(err, rows, fields) {
        if (err) throw err;
        
        //res.send(rows)
        res.send(rows[0]) //È um modo de tirar a lista de dentro do array

      });

    
  })

  //categoria/:categoriaId/critica/:criticaTitulo

  app.get('/categoria/:categoriaId/critica/:criticaTitulo', (req, res) => {

    // res.send(req.params.categoriaId)
    

    // Busca noticias/critica por titulo especifica:
    connection.query('SELECT postagem, titulo, conteudo, nota FROM sistema_noticias.critica WHERE categoria = ' + req.params.categoriaId + ' AND titulo LIKE '+ '%'+ req.params.criticaTitulo + '%', function(err, rows, fields) {
        if (err) throw err;
        
        res.send(rows)
      });

    
  })


//Subindo servidor NODE
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})