import { Badge } from "@/app/ui/atoms"

type Props = {
	locations: { name: string; id: number }[]
	onClick: (id: number) => void
}

export const NearbyLocations = ({ locations, onClick }: Props) => {
	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-lg font-medium">Nearby Locations</h3>
			<div className="flex flex-wrap gap-2">
				{locations.map((location) => (
					<Badge key={location.id} onClick={() => onClick(location.id)}>
						{location.name}
					</Badge>
				))}
			</div>
		</div>
	)
}
