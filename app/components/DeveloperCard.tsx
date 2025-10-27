import Avatar from './Avatar'
import Info from './Info'
import LinkButton from './LinkButton'
import ProjectsList from './ProjectsList'
import TechStack from './TechStack'

interface DeveloperData {
	id: number
	name: string
	specialisation: string
	stack: string[]
	info: string
	avatarSrc: string
	link: string
	experience: number
	isActive: boolean
	projects: Project[]
}

type Project = {
	id: number
	name: string
	description: string
	year: number
	tech: string[]
}

const DeveloperCard = ({ credentials }: { credentials: DeveloperData }) => {
	return (
		<div className='bg-amber-50 text-zinc-600 flex-col w-full max-w-sm sm:max-w-md md:max-w-2xl lg:w-161 p-4 sm:p-6 md:p-8 lg:p-10 mx-4 sm:mx-6 md:mx-8 lg:m-10 rounded-xl sm:rounded-2xl'>
			{/* Заголовок и бейдж */}
			<div className='flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center mb-4 sm:mb-5'>
				<h3 className='text-2xl sm:text-3xl font-bold'>{credentials.name}</h3>
				{credentials.experience > 4 && (
					<div className='bg-zinc-700 px-3 py-1 sm:p-2 flex rounded-xl sm:rounded-2xl text-sm sm:text-base text-white justify-center items-center'>
						Senior
					</div>
				)}
			</div>

			{/* Основной контент */}
			<div className='flex-col w-full'>
				{/* Инфо и аватар */}
				<div className='flex flex-col sm:flex-row w-full justify-between gap-4 sm:gap-5 mb-4 sm:mb-5'>
					<div className='order-2 sm:order-1 flex-1'>
						<Info info={credentials.info} />
					</div>
					<div className='order-1 sm:order-2'>
						<Avatar
							src={credentials.avatarSrc}
							isActive={credentials.isActive}
						/>
					</div>
				</div>

				{/* Кнопка ссылки */}
				<LinkButton link={credentials.link} />
			</div>

			{/* Специализация */}
			<p className='pb-4 sm:pb-5 text-lg sm:text-xl'>
				<b>Специализация:</b> {credentials.specialisation}
			</p>

			{/* Стек технологий */}
			<div className='pb-4 sm:pb-5'>
				<p className='font-bold text-lg sm:text-xl mb-2 sm:mb-3'>
					Список технологий:
				</p>
				<TechStack stack={credentials.stack} />
			</div>

			{/* Разделитель */}
			<hr className='mb-4 sm:mb-5' />

			{/* Проекты */}
			<ProjectsList projects={credentials.projects} />
		</div>
	)
}

export default DeveloperCard
