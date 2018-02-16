const SHA256 = require("crypto-js");

class Block{
    constructor(index,timestamp,data,previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block Mined: " +this.hash);
    }
}



class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock(){
        return new Block(0,"01/01/2017","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
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
console.log("mining block 1");
bitcoin.addBlock(new Block(1,"10/07/2017",{amount:4}));
console.log("mining block 2");
bitcoin.addBlock(new Block(2,"12/07/2017",{amount:30}));
