"use client"

import { Combobox } from "@/app/ui/components"
import { LocationCard } from "../LocationCard/LocationCard"
import { NearbyLocations } from "../NearbyLocations/NearbyLocations"

const nearbyLocations = [
	{
		name: "Paris",
		id: 2,
	},
	{
		name: "Berlin",
		id: 3,
	},
	{
		name: "Madrid",
		id: 4,
	},
	{
		name: "Rome",
		id: 5,
	},
	{
		name: "Amsterdam",
		id: 6,
	},
]

export const LocationSearch = () => {
	return (
		<div className="w-96">
			<div className="px-10 py-12 bg-gray-300 dark:bg-gray-800 rounded-2xl w-96 flex flex-col gap-2">
				<Combobox />
			</div>
			<LocationCard
				location={{
					name: "London",
					description: "The capital of the United Kingdom",
					country: "United Kingdom",
					climate: "Temperate",
					currency: "GBP",
					latitude: 51.5074,
					longitude: 0.1278,
					id: 1,
				}}
			/>
			<NearbyLocations
				locations={nearbyLocations}
				onClick={(id) => console.log("Clicked on: " + id)}
			/>
		</div>
	)
}
