import LOCATION_LIST_MOCK from "@/mocks/LocationMocks"
import { NextResponse } from "next/server"
import { delay } from "@/utils"

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const id = params.id

	console.log("---------- Received id:", id)

	await delay(1000)

	if (!id) {
		console.log("---------- Bad Request: Id is required.")
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
		console.log("---------- Not Found: Location not found.")
		return NextResponse.json(
			{
				error: "Not Found",
				message: "Location not found.",
			},
			{ status: 404 }
		)
	}

	console.log("---------- Selected location:", data)

	return NextResponse.json({ data }, { status: 200 })
}
