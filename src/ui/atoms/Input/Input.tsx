import { forwardRef } from "react"

type Props = {
	label: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(
	({ label, id, ...props }, ref) => {
		return (
			<>
				<label htmlFor={id} className="text-base font-normal text-black">
					{label}
				</label>
				<input
					className="rounded-2xl p-4 text-black w-full placeholder-gray-600"
					id={id}
					type="text"
					ref={ref}
					{...props}
				/>
			</>
		)
	}
)

Input.displayName = "Input"
