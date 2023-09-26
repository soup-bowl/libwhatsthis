export { calculateCronString, checkForValidCronCode, decodeCronCode, encodeCronCode } from './cron';
export { CMYK, HSL, Hue, RGB, IColourValues, cmykToAll, hexToAll, hslToAll, rgbToAll, isValidColorString } from './colour';

/**
 * Formats a number of bytes as a human-readable string, with the size unit automatically selected based on the size of the number.
 * 
 * Based on this StackOverflow answer: https://stackoverflow.com/a/35696506
 *
 * @param {number} bytes - The number of bytes to format.
 * @param {number} [decimals=2] - The number of decimal places to include in the formatted string. Defaults to 2.
 * @returns {string} A human-readable string representing the given number of bytes.
 *
 * @example
 * const fileSize = formatBytes(1024);
 * console.log(fileSize); // '1.00 KB'
 */
export const formatBytes = (bytes: number, decimals: number = 2) => {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Determines whether a given string represents a valid IPv4 or IPv6 address.
 * 
 * Amazing code from this SO: https://stackoverflow.com/a/34529037
 *
 * @param {string} ip - The string to test.
 * @returns {boolean} True if the string represents a valid IP address, false otherwise.
 *
 * @example
 * const valid = isValidIP('192.0.2.1');
 * console.log(valid); // true
 */
export const isValidIP = (ip: string) => {
	const expression = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

	if (expression.test(ip)) {
		return true;
	}
	return false;
}

/**
 * Get a country flag emoji based on the provided country code.
 * Uses Unicode regional indicator symbols to represent country flags.
 * Credit: OpenAI
 * @param {string} countryCode - The two-letter ISO country code (e.g., 'US', 'GB').
 * @returns {string | null} The country flag emoji if a valid countryCode is provided,
 *                         otherwise returns null for an invalid countryCode.
 */
export const getCountryFlag = (countryCode: string): string | null => {
	const base = 0x1F1A5;
	const alphaOffset = 0x41;
	const countryCodeUppercase = countryCode.toUpperCase();

	// Check if the input countryCode is exactly 2 characters long and contains only letters
	if (/^[A-Z]{2}$/.test(countryCodeUppercase)) {
		const firstChar = countryCodeUppercase.charCodeAt(0);
		const secondChar = countryCodeUppercase.charCodeAt(1);

		// Combine the two characters to form the flag emoji
		const flagEmoji = String.fromCodePoint(base + (firstChar - alphaOffset), base + (secondChar - alphaOffset));
		return flagEmoji;
	}

	// Return null if the countryCode is invalid
	return null;
};