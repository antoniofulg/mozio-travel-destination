import LOCATION_LIST_MOCK from "@/mocks/LocationMocks"
import { NextResponse } from "next/server"
import { delay, getQueryParams } from "@/utils"

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const id = params.id

	await delay(1000)

	if (!id) {
		return NextResponse.json(
			{
				error: "Bad Request",
				message: "Id is required.",
			},
			{ status: 400 }
		)
	}

	const data = LOCATION_LIST_MOCK.find(
		(location) => location.id.toString() === id
	)

	if (!data) {
		return NextResponse.json(
			{
				error: "Not Found",
				message: "Location not found.",
			},
			{ status: 404 }
		)
	}

	return NextResponse.json({ data }, { status: 200 })
}
