import { formatEther, formatUnits } from 'viem';

export const parseNumber = (n: number, digits = 10) => {
	if (isNaN(n)) return 0;
	return parseInt((n * 10 ** digits).toString()) / 10 ** digits;
};

export const getFormattedUnits = (val: bigint, decimals = 0) => {
	let formatted = formatUnits(val, decimals);
	return parseNumber(Number(formatted));
};

export const getContractResult = (result: any, decimals = 18) => {
	if (result.status !== 'success') {
		console.log(result.error);
		return 0;
	}
	return getFormattedUnits(result.result, decimals);
};