type Props = {
	isLoading: boolean
	onClick: (value: string) => void
	options: { value: string; label: string }[]
}

export const SelectBox = ({ isLoading, onClick, options }: Props) => {
	if (isLoading)
		return (
			<div className="bg-white text-black w-full p-4 text-center rounded-2xl">
				Loading...
			</div>
		)

	return (
		<div>
			{options.map((option) => (
				<button
					className="bg-white text-black hover:bg-gray-100 transition-all duration-300 w-full p-4 text-left first:rounded-t-2xl last:rounded-b-2xl"
					key={option.value}
					value={option.value}
					onClick={() => onClick(option.value)}
				>
					{option.label}
				</button>
			))}
		</div>
	)
}
