import LOCATION_LIST_MOCK from "@/mocks/LocationMocks"
import { NextResponse } from "next/server"
import { delay, getQueryParams } from "@/utils"

export async function GET(req: Request) {
	const { query } = getQueryParams(req)

	await delay(1000)

	if (!query) {
		return NextResponse.json(
			{
				error: "Bad Request",
				message: "Query parameters are required.",
			},
			{ status: 400 }
		)
	}

	if (query === "fail") {
		return NextResponse.json(
			{
				error: "Internal Server Error",
				message: "Something went wrong.",
			},
			{ status: 500 }
		)
	}

	const data = LOCATION_LIST_MOCK.filter((location) =>
		location.name.toLowerCase().includes(query.toLowerCase())
	).map(({ id, name }) => ({ id, name }))

	return NextResponse.json({ data }, { status: 200 })
}
