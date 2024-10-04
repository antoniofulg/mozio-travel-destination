"use client"

import { Input } from "@/app/ui/atoms"
import { SelectBox } from "../../atoms/SelectBox/SelectBox"

export const Combobox = () => {
	return (
		<>
			<Input label="Location" id="location" />
			<SelectBox
				isLoading={false}
				options={[
					{ label: "Spain", value: "spain" },
					{ label: "Italy", value: "italy" },
					{ label: "Germany", value: "germany" },
				]}
				onClick={(value) => console.log("Clicked on " + value)}
			/>
		</>
	)
}
