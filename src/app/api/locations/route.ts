import { getQueryParams } from "@/utils/getQueryParams"
import LOCATION_LIST_MOCK from "@/mocks/LocationMocks"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	const { query } = getQueryParams(req)

	if (!query) {
		return NextResponse.json(
			{
				error: "Bad Request",
				message: "Query parameters are required.",
			},
			{ status: 400 }
		)
	}

	const data = LOCATION_LIST_MOCK.filter((location) =>
		location.name.toLowerCase().includes(query.toLowerCase())
	).map(({ id, name }) => ({ id, name }))

	return NextResponse.json({ data }, { status: 200 })
}
