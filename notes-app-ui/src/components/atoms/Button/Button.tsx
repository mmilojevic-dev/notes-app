import { forwardRef, ComponentProps } from 'react'

export const Button = forwardRef<
	HTMLButtonElement,
	Omit<ComponentProps<'button'>, 'className'>
>(({ children, ...rest }, ref) => {
	return (
		<button
			ref={ref}
			className=''
			{...rest}
		>
			{children}
		</button>
	)
})
