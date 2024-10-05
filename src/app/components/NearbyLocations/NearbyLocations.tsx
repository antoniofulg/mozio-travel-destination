import { Badge, Skeleton } from "@/app/ui/atoms"
import { CSSProperties } from "react"

type Props = {
	isLoading: boolean
	locations: { name: string; id: number }[]
	onClick: (id: number) => void
}

const RANDOM_ARRAY = [96, 88, 140, 120, 70]

export const NearbyLocations = ({ isLoading, locations, onClick }: Props) => {
	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-lg font-medium">Nearby Locations</h3>
			{isLoading && (
				<div className="flex flex-wrap gap-2">
					{RANDOM_ARRAY.map((item) => (
						<Skeleton
							key={item}
							className="w-[var(--skeleton-size)] h-7 bg-purple-600"
							style={{ "--skeleton-size": `${item}px` } as CSSProperties}
						/>
					))}
				</div>
			)}
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
