type Props = {
	children: React.ReactNode
}

export const Badge = ({ children }: Props) => {
	return (
		<span className="inline-block px-3 py-1 rounded-lg font-semibold uppercase text-sm bg-purple-600 transition-colors duration-300 hover:bg-purple-800 text-white">
			{children}
		</span>
	)
}
