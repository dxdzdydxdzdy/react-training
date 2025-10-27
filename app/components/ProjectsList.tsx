type Project = {
	id: number
	name: string
	description: string
	year: number
	tech: string[]
}

interface ProjectsListProps {
	projects: Project[]
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
	return (
		<div>
			<h4 className='font-bold text-xl py-2'>Проекты:</h4>
			{projects.map(e => (
				<div key={e.id}>
					<p>{e.name}</p>
				</div>
			))}
		</div>
	)
}

export default ProjectsList
