import LOCATION_LIST_MOCK from "@/mocks/LocationMocks"
import { NextResponse } from "next/server"
import { delay } from "@/utils"
import { getClosestLocations } from "@/utils/getClosestLocations"

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

	const selectedLocation = LOCATION_LIST_MOCK.find(
		(location) => location.id.toString() === id
	)

	if (!selectedLocation) {
		console.log("---------- Not Found: Location not found.")
		return NextResponse.json(
			{
				error: "Not Found",
				message: "Location not found.",
			},
			{ status: 404 }
		)
	}

	const data = getClosestLocations(selectedLocation, LOCATION_LIST_MOCK, 5).map(
		({ id, name }) => ({ id, name })
	)

	console.log("---------- Closest locations:", data)

	return NextResponse.json({ data }, { status: 200 })
}
