import { ReactNode } from "react"

type Props = {
	children: ReactNode
	onClick: () => void
}

export const Badge = ({ children, onClick }: Props) => {
	return (
		<button
			type="button"
			className="inline-block px-3 py-1 rounded-lg font-semibold uppercase text-sm bg-purple-600 transition-colors duration-300 hover:bg-purple-800 text-white"
			onClick={onClick}
		>
			{children}
		</button>
	)
}
