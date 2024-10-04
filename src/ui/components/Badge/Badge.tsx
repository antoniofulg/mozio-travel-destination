type Props = {
	children: React.ReactNode
}

export const Badge = ({ children }: Props) => {
	return (
		<span className="inline-block p-4 uppercase text-xs bg-purple-600 transition-colors duration-300 hover:bg-purple-800 text-white">
			{children}
		</span>
	)
}
