"use client"

import { Input } from "@/app/ui/atoms"
import { useEffect, useRef, useState } from "react"
import { SelectBox } from "@/app/ui/components"

type Option = { name: string; id: string | number }

type Props = {
	getOptions: (value: string) => void
	isLoading: boolean
	onSelect: (value: string | number) => void
	options: Option[]
}

const DEBOUNCE_TIME = 500

export const Combobox = ({
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
			setSelectedIndex(0) // Start from the first item
			listRef.current?.focus() // Move focus to the list
		}
	}

	return (
		<>
			<Input
				value={query}
				onChange={onChangeHandler}
				label="Location"
				id="location"
				onKeyDown={handleInputKeyDown}
			/>
			{isOpen && (
				<SelectBox
					isLoading={isLoading}
					options={options}
					onSelectItem={(option) => onSelectHandler(option)}
					selectedIndex={selectedIndex}
					setSelectedIndex={setSelectedIndex}
					ref={listRef}
				/>
			)}
		</>
	)
}
