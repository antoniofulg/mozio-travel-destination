"use client"

import { Combobox } from "@/app/ui/components"
import { LocationCard } from "../LocationCard/LocationCard"
import { NearbyLocations } from "../NearbyLocations/NearbyLocations"
import { useCallback, useEffect, useState } from "react"
import { fetchData } from "@/utils"
import { Location, ShortLocation } from "@/app/types"

export const LocationSearch = () => {
	const [locationsList, setLocationsList] = useState<ShortLocation[]>([])
	const [nearbyLocationsList, setNearbyLocationsList] = useState<
		ShortLocation[]
	>([])
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		null
	)

	const [isFetchingLocationsList, setIsFetchingLocationsList] = useState(false)
	const [isFetchingNearbyLocations, setIsFetchingNearbyLocations] =
		useState(false)
	const [isFetchingSelectedLoation, setIsFetchingSelectedLocation] =
		useState(false)

	const fetchLocationsList = useCallback(async (query: string) => {
		if (!query) {
			setLocationsList([])
			return
		}

		setIsFetchingLocationsList(true)
		try {
			const response = await fetchData<{ data: ShortLocation[] }>(
				"api/locations",
				{
					queryParams: { query },
				}
			)
			setLocationsList(response.data || [])
		} catch (error) {
			console.error("Error fetching locations list:", error)
			setLocationsList([])
		} finally {
			setIsFetchingLocationsList(false)
		}
	}, [])

	const fetchLocationById = async (id: string | number) => {
		if (!id.toString()) {
			setSelectedLocation(null)
			return
		}

		setIsFetchingSelectedLocation(true)

		try {
			const response = await fetchData<{ data: Location }>("api/location/" + id)

			setSelectedLocation(response.data)
		} catch (error) {
			console.error("Error fetching nearby locations:", error)
			setNearbyLocationsList([])
		} finally {
			setIsFetchingSelectedLocation(false)
		}
	}

	const fetchNearbyLocations = useCallback(async () => {
		if (!selectedLocation) {
			setNearbyLocationsList([])
			return
		}

		setIsFetchingNearbyLocations(true)
		try {
			const response = await fetchData<{ data: ShortLocation[] }>(
				"api/location/nearby/" + selectedLocation.id
			)
			setNearbyLocationsList(response.data || [])
		} catch (error) {
			console.error("Error fetching nearby locations:", error)
			setNearbyLocationsList([])
		} finally {
			setIsFetchingNearbyLocations(false)
		}
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
					getOptions={fetchLocationsList}
					onSelect={fetchLocationById}
					options={locationsList}
					isLoading={isFetchingLocationsList}
				/>
			</div>
			{selectedLocation && (
				<>
					<LocationCard
						isLoading={isFetchingSelectedLoation}
						location={selectedLocation}
					/>
					<NearbyLocations
						isLoading={isFetchingNearbyLocations}
						locations={nearbyLocationsList}
						onClick={(id) => fetchLocationById(id)}
					/>
				</>
			)}
		</div>
	)
}
