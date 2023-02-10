const Block = require("./block.js");

class Blockchain{
  constructor(){
    this.chain = [Block.genesis()]
  }

  addBlock(data){//Adicionando novo bloco a chain com base no bloco anterior e recebendo um novo data
   const block = Block.mineBlock(this.chain[this.chain.length - 1], data);// Gerando novo bloco com o metodo mineBlock
    this.chain.push(block);//Adicionando o bloco a chain

    return block;
  }

  isValidChain(chain){// Validaçõa de correntes
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))return false; // Validação de bloco genesis
    for(let i = 1; i < chain.length; i++){
      const block = chain[i];
      const lastBlock = chain[i-1]
      if(
        block.lastHash !== lastBlock.hash || // Verifiacndo lasthash do bloco atual com hash do lastblock
        block.hash !== Block.blockHash(block) // Verificando hash gerado e hash gerado com os dados atuais
        ){
        return false
      };
    }
    return true;
  }

  replaceChain(newChain){ //Recebendo chains e verificando validade e executando a troca da atual pela maior recebida
    if(newChain.length <= this.chain.length){ return;// Invalidando troca pelo tamanho
    }else if(!this.isValidChain(newChain)){ return; } // Invalidando troca por chain corrompida
    console.log("Corrente trocada");
    this.chain = newChain;
  }
}

module.exports = Blockchain;