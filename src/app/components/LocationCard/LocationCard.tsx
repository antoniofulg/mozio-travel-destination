import { Location } from "@/app/types/Location"
import { Skeleton } from "@/app/ui/atoms"

type Props = {
	isLoading: boolean
	location: Location
}

export const LocationCard = ({
	isLoading,
	location: { climate, country, currency, description, name },
}: Props) => {
	if (isLoading)
		return (
			<div className="py-4 flex flex-col items-start gap-3 justify-between">
				<Skeleton className="h-7 w-full" />

				<div className="w-full flex flex-col gap-1">
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-2/3" />
				</div>

				<Skeleton className="h-5 w-2/4" />
				<Skeleton className="h-5 w-3/4" />
				<Skeleton className="h-5 w-2/4" />
			</div>
		)

	return (
		<div className="py-4 flex flex-col items-start gap-2 justify-between">
			<h3 className="text-xl font-medium">{name}</h3>
			<p className="text-sm text-gray-500">{description}</p>

			<p>
				<strong>Country:</strong> {country}
			</p>
			<p>
				<strong>Climate:</strong> {climate}
			</p>
			<p>
				<strong>Currency:</strong> {currency}
			</p>
		</div>
	)
}
