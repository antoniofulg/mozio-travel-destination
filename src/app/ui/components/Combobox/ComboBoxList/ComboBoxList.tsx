import { Skeleton } from "@/app/ui/atoms"
import { Dispatch, forwardRef, SetStateAction } from "react"
import { twMerge } from "tailwind-merge"

type Option = { name: string; id: string | number }

type Props = {
	isLoading: boolean
	onSelectItem: (option: Option) => void
	options: Option[]
	selectedIndex: number | null
	setSelectedIndex: Dispatch<SetStateAction<number | null>>
} & React.HTMLAttributes<HTMLUListElement>

export const ComboBoxList = forwardRef<HTMLUListElement, Props>(
	(
		{ isLoading, onSelectItem, options, selectedIndex, setSelectedIndex },
		ref
	) => {
		const handleKeyDown = (event: React.KeyboardEvent) => {
			if (event.key === "ArrowDown") {
				setSelectedIndex((prevIndex) =>
					prevIndex === null || prevIndex === options.length - 1
						? 0
						: prevIndex + 1
				)
			}
			if (event.key === "ArrowUp") {
				setSelectedIndex((prevIndex) =>
					prevIndex === null || prevIndex === 0
						? options.length - 1
						: prevIndex - 1
				)
			}
			if (event.key === "Enter" && selectedIndex !== null) {
				onSelectItem(options[selectedIndex])
			}
		}

		if (isLoading)
			return (
				<ul className="bg-white text-black w-full p-4 text-center rounded-2xl">
					<li>
						<Skeleton className="h-4 w-full bg-gray-400" />
					</li>
				</ul>
			)

		return (
			<ul ref={ref} className="w-full" onKeyDown={handleKeyDown} tabIndex={-1}>
				{options.map((option, index) => (
					<li
						className={twMerge(
							"text-black hover:bg-gray-200 transition-all duration-300 w-full p-4 text-left first:rounded-t-2xl last:rounded-b-2xl",
							selectedIndex === index ? "bg-gray-200" : "bg-white"
						)}
						key={option.id}
						value={option.id}
						onClick={() => onSelectItem(option)}
					>
						{option.name}
					</li>
				))}
			</ul>
		)
	}
)

ComboBoxList.displayName = "ComboBoxList"
