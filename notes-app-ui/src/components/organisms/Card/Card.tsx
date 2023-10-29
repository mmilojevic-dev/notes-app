import {
	forwardRef,
	ComponentProps,
	RefAttributes,
	ForwardRefExoticComponent,
	SVGProps,
} from 'react'

export interface CardProps
	extends Omit<ComponentProps<'div'>, 'className' | 'children'> {
	title: string
	description: string
	Icon: ForwardRefExoticComponent<
		Omit<SVGProps<SVGSVGElement>, 'ref'> & {
			title?: string | undefined
			titleId?: string | undefined
		} & RefAttributes<SVGSVGElement>
	>
	href: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ title, description, Icon, href, ...rest }, ref) => {
		return (
			<div
				ref={ref}
				className=''
				{...rest}
			>
				<div>
					<span className=''>
						<Icon
							className=''
							aria-hidden='true'
						/>
					</span>
				</div>
				<div className=''>
					<h3 className=''>{title}</h3>
					<p className=''>{description}</p>
					<div className=''>
						<a
							href={href}
							target='_blank'
							rel='noreferrer'
							className=''
						>
							Visit documentation →
						</a>
					</div>
				</div>
			</div>
		)
	}
)
