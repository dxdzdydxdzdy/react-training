import Image from 'next/image'

interface AvatarProps {
	src: string
	isActive: boolean
}

const Avatar = ({ src, isActive }: AvatarProps) => {
	return (
		<div className='relative shrink'>
			<Image
				width={150}
				height={150}
				src={src}
				alt='photo of person'
				className='w-[150px] h-[150px] object-cover rounded-full'
			/>

			<div
				className={`${
					isActive ? 'bg-green-500' : 'bg-zinc-400'
				} absolute w-4 h-4 rounded-2xl right-3 bottom-3.5`}
			></div>
		</div>
	)
}

export default Avatar
