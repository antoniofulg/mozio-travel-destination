import { Location } from "@/app/types/Location"

type Props = {
	location: Location
}

export const LocationCard = ({
	location: { climate, country, currency, description, name },
}: Props) => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg font-semibold">{name}</h3>
					<p className="text-sm text-gray-500">{description}</p>
				</div>
				<div>
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
			</div>
		</div>
	)
}
