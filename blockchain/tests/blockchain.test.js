const Blockchain = require("../src/blockchain.js");
const Block = require("../src/block.js");

describe("Blockchain", ()=>{
  let bc, bc2;
  beforeEach(()=>{
    bc = new Blockchain;
    bc2 = new Blockchain;
  });

  it("Iniciando com bloco genesis",()=>{
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it("Adição de novo bloco", ()=>{
    const data = "index.js";
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  });

  it("Validando corrente", ()=>{
    bc2.addBlock("1000conto");
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it("Invalidadndo chain com bloco genesis corrompido", ()=>{
    bc2.chain[0].data = "0conto";
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("Invalidando chain corrompida",()=>{
    bc2.addBlock("200urss");
    bc2.chain[1].data = "0urss";
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("Validando troca de chain atual por uma chain valida", ()=>{
    bc2.addBlock("300conto");
    bc.replaceChain(bc2.chain);
    expect(bc.chain).toEqual(bc2.chain);
  });

  it("Invalidando troca de chain por tamanho de chain invalido",()=>{
    bc.addBlock("20pila");
    bc.replaceChain(bc2.chain);
    expect(bc.chain !== bc2.chain).toEqual(true);
  });
});