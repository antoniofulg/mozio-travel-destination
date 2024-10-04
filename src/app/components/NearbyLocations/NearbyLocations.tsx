import { Badge } from "@/app/ui/atoms"

type Props = {
	isLoading: boolean
	locations: { name: string; id: number }[]
	onClick: (id: number) => void
}

export const NearbyLocations = ({ isLoading, locations, onClick }: Props) => {
	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-lg font-medium">Nearby Locations</h3>
			{isLoading && <div>Loading...</div>}
			{!isLoading && locations.length === 0 && (
				<div>No nearby locations found</div>
			)}
			{!isLoading && locations.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{locations.map((location) => (
						<Badge key={location.id} onClick={() => onClick(location.id)}>
							{location.name}
						</Badge>
					))}
				</div>
			)}
		</div>
	)
}
