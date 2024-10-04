"use client"

import { Input, SelectBox } from "@/app/ui/atoms"
import { useEffect, useRef, useState } from "react"

type Props = {
	getOptions: (value: string) => void
	onSelect: (value: string) => void
	options: { name: string; id: string }[]
}

const DEBOUNCE_TIME = 500

export const Combobox = ({ getOptions, onSelect, options }: Props) => {
	const [query, setQuery] = useState("")

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			getOptions(query)
		}, DEBOUNCE_TIME)

		return () => clearTimeout(timeoutId)
	}, [query])

	return (
		<>
			<Input
				value={query}
				onChange={(event) => setQuery(event.target.value)}
				label="Location"
				id="location"
			/>
			<SelectBox
				isLoading={false}
				options={options}
				onClick={(value) => onSelect(value)}
			/>
		</>
	)
}
