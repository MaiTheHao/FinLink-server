import { networkInterfaces } from 'os';

/**
 * Gets the server's IPv4 address
 * @returns The IPv4 address as a string, using environment variables or auto-detection
 */
export function getServerIPv4Address(): string {
	// First check if there's an environment variable that specifies the IP
	if (process.env.IP) {
		return process.env.IP;
	}

	const nets = networkInterfaces();
	let internalIpv4: string | undefined;

	// Try to find an external IPv4 address
	for (const name of Object.keys(nets)) {
		const netInterface = nets[name];
		if (!netInterface) continue;

		for (const net of netInterface) {
			// Skip over non-IPv4 addresses
			if (net.family !== 'IPv4') continue;

			if (!net.internal) {
				// Found an external IPv4 address
				return net.address;
			} else if (!internalIpv4) {
				// Save the first internal IPv4 address as fallback
				internalIpv4 = net.address;
			}
		}
	}

	// If no external IPv4 found but we have an internal one, return it
	if (internalIpv4) {
		return internalIpv4;
	}

	// If all else fails, return localhost
	return '127.0.0.1';
}

/**
 * Creates a URL using the server's IPv4 address
 * @param port The port number (defaults to PORT env var or 3000)
 * @param protocol The protocol (defaults to PROTOCOL env var or 'http')
 * @returns The URL string
 */
export function createServerUrl(): string {
	const ipAddress = getServerIPv4Address();
	const port = process.env.PORT || 3000;
	const protocol = (process.env.PROTOCOL || 'http') as 'http' | 'https';

	return `${protocol}://${ipAddress}:${port}`;
}

/**
 * Gets the base URL for frontend links
 * Uses FRONTEND_URL environment variable if available, otherwise creates a URL based on server's IP
 * @returns The base URL for frontend links
 */
export function getFrontendBaseUrl(): string {
	return process.env.FRONTEND_URL || createServerUrl();
}

/**
 * Creates a fully qualified URL for the frontend
 * Can be used as a replacement for hardcoded FRONTEND_URL in email service
 * @param path The path to append to the URL
 * @returns The complete URL string
 */
export function createFrontendUrl(path: string = ''): string {
	const baseUrl = getFrontendBaseUrl();

	// Ensure path starts with a slash if it's not empty
	const formattedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';

	return `${baseUrl}${formattedPath}`;
}
