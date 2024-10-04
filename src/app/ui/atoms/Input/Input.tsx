import { forwardRef } from "react"

type Props = {
	label: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(
	({ label, id, ...props }, ref) => {
		return (
			<>
				<label htmlFor={id} className="text-base font-normal">
					{label}
				</label>
				<input
					className="rounded-2xl p-4 w-full placeholder-gray-600 dark:text-black"
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
