const Websocket = require("ws");
const P2P_PORT = process.env.P2P_PORT || 8080;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2pServer{
  constructor(blockchain){
    this.blockchain = blockchain;
    this.socket = []
  }

  listen(){
    //Cria uma nova instancia de um servidor WebSocket especificando a porta
    const server = new Websocket.Server({port: P2P_PORT}); 

    /*Adiciona um evento 'connection' ao sevidor. 
    Quando um novo client se conecta ao servidor a conexão sera passada como argumento pra função*/
    server.on('connection', socket => this.connectSocket(socket))
    this.connectToPeers();
    console.log(`Ouvindo conexões P2P na porta ${P2P_PORT}`);
  }

  connectSocket(socket){
    //Ele armazena o novo socket em um array chamado "socket" empurrando o novo socket nele
    this.socket.push(socket)
    console.log("Socket connected");
    this.msgHandler(socket);
    this.sendChain(socket);
  }

  sendChain(socket){
    socket.send(JSON.stringify(this.blockchain.chain)); 
  }
  
  connectToPeers(){
    peers.forEach(peer => {
      //Para cada peer, ele cria uma nova conexão WebSocket usando a classe 
      const socket = new Websocket(peer);

      /*Adiciona um ouvinte de evento para o evento "open" no socket, quando o socket é aberto, 
      ele chama a função connectSocket passando o socket como argumento.*/
      socket.on("open", ()=>{this.connectSocket(socket)})
    });
  }

  msgHandler(socket){
    //Função que vai ouvir ser outras intancias estão mandando chains
    socket.on("message", msg=>{
      const data = JSON.parse(msg);
      this.blockchain.replaceChain(data);//Trocar a chain atual pela chain recebida se for valida
    });
  }
 
  syncChain(){
    this.socket.forEach(socket => this.sendChain(socket));//Sincronizar as chains de cada socket
  }
}

module.exports = P2pServer;