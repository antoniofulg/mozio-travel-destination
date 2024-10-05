"use client"

import { LocationCard } from "../LocationCard/LocationCard"
import { NearbyLocations } from "../NearbyLocations/NearbyLocations"
import { useCallback, useEffect, useState } from "react"
import { fetchData } from "@/utils"
import { Location, ShortLocation } from "@/app/types"
import { ComboBox } from "../ComboBox/ComboBox"

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
	const [isFetchingSelectedLocation, setIsFetchingSelectedLocation] =
		useState(false)

	const [locationErrorMessage, setLocationErrorMessage] = useState<
		string | null
	>(null)

	const fetchLocationsList = useCallback(async (query: string) => {
		if (!query) {
			setLocationsList([])
			return
		}

		setIsFetchingLocationsList(true)
		try {
			console.log("Fetching locations list:", query)
			const response = await fetchData<{ data: ShortLocation[] }>(
				"api/locations",
				{
					queryParams: { query },
				}
			)
			setLocationsList(response.data || [])
			setLocationErrorMessage(null)
		} catch (error) {
			console.error("Error fetching locations list:", error)
			setLocationErrorMessage("We had a problem while fetching locations.")
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
			console.log("Fetching location by id:", id)
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
			console.log("Fetching nearby locations for:", selectedLocation.name)
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
		<div className="max-w-96 p-4">
			<div className="px-10 py-12 bg-gray-300 dark:bg-gray-800 rounded-2xl w-full flex flex-col gap-2">
				<ComboBox
					getOptions={fetchLocationsList}
					onSelect={fetchLocationById}
					options={locationsList}
					isLoading={isFetchingLocationsList}
					errorMessage={locationErrorMessage ?? undefined}
				/>
			</div>
			{selectedLocation && (
				<>
					<LocationCard
						isLoading={isFetchingSelectedLocation}
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
