import { Location } from "@/app/types"

const simplifiedDistance = (
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
): number => {
	return Math.abs(lat1 - lat2) + Math.abs(lon1 - lon2)
}

export const getClosestLocations = (
	referenceLocation: Location,
	locations: Location[],
	n: number
): Location[] => {
	const distances = locations.map((location) => ({
		...location,
		distance: simplifiedDistance(
			referenceLocation.latitude,
			referenceLocation.longitude,
			location.latitude,
			location.longitude
		),
	}))

	distances.sort((a, b) => a.distance - b.distance)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return distances.slice(1, n + 1).map(({ distance, ...loc }) => loc)
}
