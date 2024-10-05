"use client"

import { Input } from "@/app/ui/atoms"
import { useEffect, useRef, useState } from "react"
import { ComboBoxList } from "./ComboBoxList/ComboBoxList"

type Option = { name: string; id: string | number }

type Props = {
	errorMessage?: string
	getOptions: (value: string) => void
	isLoading: boolean
	onSelect: (value: string | number) => void
	options: Option[]
}

const DEBOUNCE_TIME = 500

export const ComboBox = ({
	errorMessage,
	getOptions,
	isLoading,
	onSelect,
	options,
}: Props) => {
	const [query, setQuery] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
	const listRef = useRef<HTMLUListElement>(null)

	useEffect(() => {
		if (!isOpen) return

		const timeoutId = setTimeout(() => {
			getOptions(query)
		}, DEBOUNCE_TIME)

		return () => clearTimeout(timeoutId)
	}, [query, isOpen, getOptions])

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value)
		setIsOpen(!!event.target.value)
	}

	const onSelectHandler = ({
		id,
		name,
	}: {
		name: string
		id: string | number
	}) => {
		setIsOpen(false)
		setQuery(name)
		onSelect(id)
	}

	const handleInputKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "ArrowDown") {
			setSelectedIndex(0)
			listRef.current?.focus()
		}
	}

	return (
		<div className="relative flex flex-col gap-2 w-full">
			<Input
				value={query}
				onChange={onChangeHandler}
				label="Location"
				id="location"
				onKeyDown={handleInputKeyDown}
			/>
			{errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
			{isOpen && (
				<div className="absolute top-[5.5rem] w-full">
					<ComboBoxList
						isLoading={isLoading}
						options={options}
						onSelectItem={(option) => onSelectHandler(option)}
						selectedIndex={selectedIndex}
						setSelectedIndex={setSelectedIndex}
						ref={listRef}
					/>
				</div>
			)}
		</div>
	)
}
