import { Location } from "@/app/types/Location"

type Props = {
	location: Location
}

export const LocationCard = ({
	location: { climate, country, currency, description, name },
}: Props) => {
	return (
		<div className=" p-4 flex flex-col items-start gap-2 justify-between">
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
