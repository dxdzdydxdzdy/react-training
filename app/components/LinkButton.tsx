import Link from 'next/link'

interface LinkButtonProps {
	link: string
}

const LinkButton = ({ link }: LinkButtonProps) => {
	return (
		<button className='bg-zinc-900 text-white w-full border rounded-xl my-2'>
			<Link href={link}>Связаться</Link>
		</button>
	)
}

export default LinkButton
