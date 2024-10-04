import { Combobox } from "@/app/ui/components"
import { LocationCard } from "../LocationCard/LocationCard"

export const LocationSearch = () => {
	return (
		<>
			<div className="px-10 py-12 bg-gray-300 dark:bg-gray-800 rounded-2xl min-w-96 flex flex-col gap-2">
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
		</>
	)
}
