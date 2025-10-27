interface stackProp {
	stack: string[]
}

const TechStack = ({ stack }: stackProp) => {
	return (
		<div className='flex flex-wrap gap-2 py-3 sm:py-5'>
			{stack.map(el => (
				<div
					key={el}
					className='px-2 py-1 bg-zinc-900 text-xs sm:text-sm text-amber-50 rounded-full flex items-center'
				>
					{el}
				</div>
			))}
		</div>
	)
}

export default TechStack
