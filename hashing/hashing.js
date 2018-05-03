"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now()
});

function createBlock(data){
	return {
		index: Blockchain.blocks.length,
		hash: undefined,
		prevHash: (Blockchain.blocks[Blockchain.blocks.length-1].hash),
		data: data,
		timestamp: new Date().valueOf()
	}
}


for (let line of poem) {
	let block = createBlock(line)
	block.hash = blockHash(block)
	Blockchain.blocks.push(block)
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

// **********************************

function blockHash(block) {
	return crypto.createHash("sha256").update(
		`${block.prevHash};${block.index};${JSON.stringify(block.data)};${block.timestamp}`
	).digest("hex");
}

function verifyChain(chain) {
	if (chain.blocks[0].hash !== "000000") return false;
	if (chain.blocks[0].index !== 0) return false;

	var prevHash = chain.blocks[0].hash;

	for (let [idx,block] of chain.blocks.entries()) {
		if (idx === 0) continue;

		let checkHash = createBlock(block);

		if (block.index !== idx) return false;
		if (block.prevHash !== prevHash) return false;
		if (typeof block.data !== "string") return false;
		if (block.hash !== checkHash) return false;

		prevHash = block.hash;
	}

	return true;
}
