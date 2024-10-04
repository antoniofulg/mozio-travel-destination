export const getQueryParams = (
	req: Request
): Record<string, string | undefined> => {
	const url = new URL(req.url)
	const params: Record<string, string | undefined> = {}

	url.searchParams.forEach((value, key) => {
		params[key] = value
	})

	return params
}
