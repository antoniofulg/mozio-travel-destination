const serializeParams = (params: Record<string, any>): string => {
	return Object.keys(params)
		.map(
			(key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
		)
		.join("&")
}

interface FetchOptions extends RequestInit {
	queryParams?: Record<string, any>
}

export const fetchData = async <T>(
	url: string,
	options: FetchOptions = {}
): Promise<T> => {
	const { queryParams, ...fetchOptions } = options

	if (queryParams) {
		const queryString = serializeParams(queryParams)
		url += (url.includes("?") ? "&" : "?") + queryString
	}

	try {
		const response = await fetch(url, fetchOptions)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const data: T = await response.json()
		return data
	} catch (error) {
		console.error("Fetch error:", error)
		throw error
	}
}
