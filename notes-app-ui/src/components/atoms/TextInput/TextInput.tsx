import { FC, InputHTMLAttributes, useState } from 'react'
import { clsx } from 'clsx'

interface TextInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	label: string
	onChange: (value: string) => void
}

export const TextInput: FC<TextInputProps> = ({
	id,
	required,
	label,
	onChange,
	...rest
}) => {
	const [showLabel, setShowLabel] = useState<boolean>(false)
	return (
		<div className={clsx('relative', 'flex', 'flex-col')}>
			<label
				className={clsx(
					'text-body3-mobile',
					'laptop:text-body3',
					'invisible',
					'opacity-0',
					'transform',
					'translate-y-none',
					'transition-all',
					'duration-500',
					'ease-in-out',
					showLabel && '-translate-y-min',
					showLabel && 'visible',
					showLabel && 'opacity-100'
				)}
				htmlFor={id}
			>
				{label}
				{!!required && <span>*</span>}
			</label>
			<input
				id={id}
				className={clsx(
					'p-xs',
					'rounded-base',
					'border',
					'border-solid',
					'border-primary'
				)}
				placeholder={!showLabel ? label : ''}
				required={required}
				type='text'
				onChange={(e) => onChange(e.target.value)}
				onFocus={() => setShowLabel(true)}
				onBlur={() => setShowLabel(false)}
				aria-required={required}
				aria-labelledby={showLabel ? id : undefined}
				{...rest}
			/>
		</div>
	)
}
