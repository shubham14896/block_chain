const SHA256 = require("crypto-js");

class Block{
    constructor(index,timestamp,data,previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,"01/01/2017","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i =1;i < this.chain.length;i++){
            
            const currBlock = this.chain[i];
            const preBlock = this.chain[i-1];

            if(currBlock.hash !== currBlock.calculateHash()){
                return false;
            }

            if(currBlock.previousHash !== preBlock.hash){
                return false;
            }
        }

        return true;
    }

}

let bitcoin = new BlockChain();
bitcoin.addBlock(new Block(1,"10/07/2017",{amount:4}));
bitcoin.addBlock(new Block(2,"12/07/2017",{amount:30}));
bitcoin.addBlock(new Block(3,"15/07/2017",{amount:60}));

console.log(bitcoin.isChainValid());
console.log(JSON.stringify(bitcoin,null,4));

// CASE FOR INVALID

bitcoin.chain[1].data = {amount : 100};
bitcoin.chain[1].hash = bitcoin.chain[1].calculateHash();

console.log(bitcoin.isChainValid());
console.log(JSON.stringify(bitcoin,null,4));
