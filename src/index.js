const express =  require("express");
const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 7070;
const Blockchain = require("./blockchain/blockchain.js");
const P2pServer =  require("./server/p2pServer.js");

const bc = new Blockchain();
//Instância da classe P2pServer, passando um objeto "bc" como argumento.
const p2pServ = new P2pServer(bc);

app.use(express.json());

app.get("/blocks", (_, res)=>{
  res.json(bc.chain);
});

app.post("/mine", (req, res)=>{
  const newBlock = bc.addBlock(req.body.data);
  console.log(`\nNovo bloco adicionado\n${newBlock}`);
  p2pServ.syncChain();
  res.redirect("/blocks");
})

app.listen(HTTP_PORT, ()=>{console.log(`Aplicação rodando na porta ${HTTP_PORT}`)})
p2pServ.listen();