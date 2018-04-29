# Block-Chain algorithm, implementation using node js.

## Prerequisite:
* Basic knowledge of creating new node.js project.
* Adding packages in project.
* Oops concept.

## Packages Used:
1) crypto-js 
link: [crypto-js](https://www.npmjs.com/package/crypto-js)

## Implementation:
1) Open Terminal & create new node.js project using **npm init**.
2) Create new .js file.
3) Add cryto-js package using **npm install crypto-js** command in code editor terminal (Visual Studio Code/Atom).
4) Replace the code of chain.js with .js file, or you can add chain.js manually to your project.
5) Build & Execute the project using command **npm build**, followed by **node yourfilename.js**.

## Result & Explanation:
* We created an object of **BlockChain()** class & then created 3 new blocks with suitable parameters.
* After that we are calling **bitcoin.isChainValid()** to check whether chain is valid or not. Expected output **true**.
* Reassigning amount paramters of second block & again calculating its HASH value.
* **bitcoin.isChainValid()** is called again and its states *false*.

## Conclusion:
* Every block is associated with some hash value & previous hash value (Hash value of previous block), so in case any amount/parameter changes after creating a block, the chain is considered to be invalid.
* So to validate chain after its creation, then all hash needs to be regenerated.

Thankyou!
Any suggestions/feedback kindly report an issue.
