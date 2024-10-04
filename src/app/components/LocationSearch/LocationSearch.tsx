"use client"

import { Combobox } from "@/app/ui/components"
import { LocationCard } from "../LocationCard/LocationCard"
import { NearbyLocations } from "../NearbyLocations/NearbyLocations"
import { useCallback, useEffect, useState } from "react"
import { fetchData } from "@/utils"
import { Location, ShortLocation } from "@/app/types"

export const LocationSearch = () => {
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		null
	)
	const [locationsList, setLocationsList] = useState<ShortLocation[]>([])
	const [nearbyLocationsList, setNearbyLocationsList] = useState<
		ShortLocation[]
	>([])

	const fetchLocationsList = async (query: string) => {
		if (!query) {
			setLocationsList([])
			return
		}

		const response = await fetchData<{ data: ShortLocation[] }>(
			"api/locations",
			{
				queryParams: { query },
			}
		)

		setLocationsList(response.data || [])
	}

	const fetchLocationById = async (id: string | number) => {
		if (!id.toString()) {
			setSelectedLocation(null)
			return
		}

		const response = await fetchData<{ data: Location }>("api/location/" + id)

		setSelectedLocation(response.data)
	}

	const fetchNearbyLocations = useCallback(async () => {
		if (!selectedLocation) {
			setNearbyLocationsList([])
			return
		}

		const response = await fetchData<{ data: ShortLocation[] }>(
			"api/location/nearby/" + selectedLocation.id
		)

		setNearbyLocationsList(response.data || [])
	}, [selectedLocation])

	useEffect(() => {
		if (!selectedLocation) {
			return
		}

		fetchNearbyLocations()
	}, [fetchNearbyLocations, selectedLocation])

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
					<LocationCard location={selectedLocation} />
					<NearbyLocations
						locations={nearbyLocationsList}
						onClick={(id) => fetchLocationById(id)}
					/>
				</>
			)}
		</div>
	)
}
