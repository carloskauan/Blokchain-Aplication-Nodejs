const Wallet = require("../src/wallet/wallet.js")

describe("Carteira", ()=>{
  it("Testando carteiara", ()=>{
    let wall = new Wallet();
    console.log(wall);
    expect(wall.balance).toEqual(500);
  });
});