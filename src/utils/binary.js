function decimalToBinary(decimal) {
	const binary = (decimal >>> 0).toString(2);
	if (binary.length < 32) {
		return "0".repeat(32 - binary.length) + binary;
	}
	return binary;
}

function binaryToDecimal(binary) {
	return parseInt(binary, 2);
}

export { binaryToDecimal, decimalToBinary };

