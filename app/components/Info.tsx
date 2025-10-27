interface InfoProps {
	info: string
}

const Info = ({ info }: InfoProps) => {
	return (
		<div className='w-full max-w-full sm:max-w-[400px] text-sm sm:text-base'>
			{info}
		</div>
	)
}

export default Info
