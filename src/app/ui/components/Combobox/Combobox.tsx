"use client"

import { Input, SelectBox } from "@/app/ui/atoms"
import { useEffect, useState } from "react"

type Option = { name: string; id: string | number }

type Props = {
	getOptions: (value: string) => void
	onSelect: (value: string | number) => void
	options: Option[]
}

const DEBOUNCE_TIME = 500

export const Combobox = ({ getOptions, onSelect, options }: Props) => {
	const [query, setQuery] = useState("")
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (!isOpen) return

		const timeoutId = setTimeout(() => {
			getOptions(query)
		}, DEBOUNCE_TIME)

		return () => clearTimeout(timeoutId)
	}, [query])

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

	return (
		<>
			<Input
				value={query}
				onChange={onChangeHandler}
				label="Location"
				id="location"
			/>
			{isOpen && (
				<SelectBox
					isLoading={false}
					options={options}
					onClick={(option) => onSelectHandler(option)}
				/>
			)}
		</>
	)
}
