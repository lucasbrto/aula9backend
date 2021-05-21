const express = require('express');
const app = express();
app.use(express.json());

//permissoes
var cors = require('cors');
app.use(cors());

app.listen(process.env.PORT || 3000);

app.get('/', function(req, res){
    res.send("Hello World");
});

app.get('/page1', function(req, res){
    res.send("Hello World 2");
});

const musicas = [
    {title: "Citizen Erased", artist:"Muse", duration:"7:18"},
    {title: "English House", artist:"Fleet Foxes", duration:"4:41"},
    {title: "Doomed", artist:"Bring Me The Horizon", duration:"4:34"},
    {title: "Weird Fishes/ Arpeggi", artist:"Radiohead", duration:"5:18"},
    {title: "Star Treatment", artist:"Arctic Monkeys", duration:"5:54"},
    {title: "Heroes", artist:"David Bowie", duration:"6:11"},
    {title: "Sabe o que foi", artist:"Scalene", duration:"3:08"},
]


app.get('/musicas',
    function(req, res){
        // res.send(mensagens);
        res.send(musicas.filter(Boolean));
    }
);

app.get('/musicas/:id',
    function(req, res){
        const id = req.params.id - 1;
        const musica = musicas[id];

        if (!musica){
            res.send("Mensagem não encontrada");
        } else {
            res.send(musica);
        }
    }
);

app.post('/musicas', 
    (req, res) => {
        console.log(req.body);
        const musica = req.body;
        musicas.push(musica);
        res.send("Adicionar Música.")
    }
);

app.put('/musicas/:id',
    (req, res) => {
        const id = req.params.id - 1;
        console.log(req.body);
        const musica = req.body;
        musicas[id] = musica;        
        res.send("Música Atualizada com Sucesso.")
    }
);

app.delete('/musicas/:id', 
    (req, res) => {
        const id = req.params.id - 1;
        delete musicas[id];

        res.send("Música removida com sucesso");
    }
);