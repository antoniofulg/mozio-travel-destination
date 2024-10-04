"use client"

import { Combobox } from "@/app/ui/components"
import { LocationCard } from "../LocationCard/LocationCard"
import { NearbyLocations } from "../NearbyLocations/NearbyLocations"
import { useState } from "react"
import { fetchData } from "@/utils"
import { Location, ShortLocation } from "@/app/types"

export const LocationSearch = () => {
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		null
	)
	const [locationsList, setLocationsList] = useState<ShortLocation[]>([])

	const fetchLocationsList = async (query: string) => {
		if (!query) return

		const response = await fetchData<{ data: ShortLocation[] }>(
			"api/locations",
			{
				queryParams: { query },
			}
		)
		console.log(response)
		setLocationsList(response.data)
	}

	const fetchLocationById = async (id: string | number) => {
		console.log("fetchLocationById", id)
		setSelectedLocation(null)
	}

	return (
		<div className="w-96">
			<div className="px-10 py-12 bg-gray-300 dark:bg-gray-800 rounded-2xl w-96 flex flex-col gap-2">
				<Combobox
					getOptions={(query) => fetchLocationsList(query)}
					onSelect={(id) => fetchLocationById(id)}
					options={locationsList}
				/>
			</div>
			{selectedLocation && (
				<>
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
						locations={[]}
						onClick={(id) => console.log("Clicked on: " + id)}
					/>
				</>
			)}
		</div>
	)
}
