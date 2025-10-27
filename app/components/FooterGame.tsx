'use client'

import type { Body, Engine, Render } from 'matter-js'
import { useEffect, useRef, useState } from 'react'

interface BoxIconProps {
	size?: number
}

const BoxIcon = ({ size = 60 }: BoxIconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 78 78'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M37.8923 77.3084H18.9472C8.48306 77.3084 0 68.8258 0 58.3601V39.4182H22.8729V54.4797H37.8923V77.3105V77.3084Z'
			fill='#FDC41F'
		/>
		<path
			d='M0.00242831 37.8923L0.00242913 18.9472C0.00242959 8.48306 8.48501 -1.28545e-06 18.9507 -8.27975e-07L37.8926 0L37.8926 22.8729L22.8311 22.8729L22.8311 37.8923L0.000276817 37.8923L0.00242831 37.8923Z'
			fill='#FDC41F'
		/>
		<path
			d='M77.3081 39.4182L77.3081 58.3633C77.3081 68.8275 68.8255 77.3105 58.3598 77.3105L39.418 77.3105L39.418 54.4376L54.4795 54.4376L54.4795 39.4182L77.3103 39.4182L77.3081 39.4182Z'
			fill='#FDC41F'
		/>
		<path
			d='M39.4183 0.00217869L58.3633 0.00218035C68.8275 0.00218127 77.3105 8.48476 77.3105 18.9505L77.3105 37.8923L54.4376 37.8923L54.4376 22.8308L39.4182 22.8308L39.4183 2.72049e-05L39.4183 0.00217869Z'
			fill='#FDC41F'
		/>
	</svg>
)

const FooterGame = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const engineRef = useRef<Engine | null>(null)
	const renderRef = useRef<Render | null>(null)
	const boxesRef = useRef<Body[]>([])
	const svgOverlayRef = useRef<HTMLDivElement>(null)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		if (!containerRef.current || !isMounted) return

		let cleanup: (() => void) | undefined

		const initPhysics = async (): Promise<void> => {
			const Matter = await import('matter-js')
			const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint } =
				Matter

			const engine = Engine.create({
				gravity: { x: 0, y: 0.5 },
			})
			engineRef.current = engine

			const container = containerRef.current as HTMLDivElement
			const { width, height } = container.getBoundingClientRect()

			const render = Render.create({
				element: container,
				engine: engine,
				options: {
					width,
					height,
					wireframes: false,
					background: '#000000',
					pixelRatio: window.devicePixelRatio,
				},
			})
			renderRef.current = render

			const walls = [
				Bodies.rectangle(width / 2, height + 25, width, 50, {
					isStatic: true,
					render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
				}),
				Bodies.rectangle(-25, height / 2, 50, height, {
					isStatic: true,
					render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
				}),
				Bodies.rectangle(width + 25, height / 2, 50, height, {
					isStatic: true,
					render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
				}),
				Bodies.rectangle(width / 2, -25, width, 50, {
					isStatic: true,
					render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
				}),
			]

			World.add(engine.world, walls)

			const boxSize = 60
			const initialBoxes: Body[] = []
			const startX = 100
			const startY = height - 200

			let count = 0
			for (let row = 0; row < 4; row++) {
				for (let col = 0; col < 5; col++) {
					if (count >= 19) break

					const box = Bodies.rectangle(
						startX + col * 65,
						startY + row * 65,
						boxSize,
						boxSize,
						{
							restitution: 0.3,
							friction: 0.1,
							frictionAir: 0.01,
							render: {
								fillStyle: 'transparent',
								strokeStyle: 'transparent',
								lineWidth: 0,
							},
							chamfer: { radius: 0 },
						}
					)
					initialBoxes.push(box)
					count++
				}
			}

			boxesRef.current = initialBoxes
			World.add(engine.world, initialBoxes)

			const createInitialSVGElements = (
				boxSize: number,
				startX: number,
				startY: number
			): void => {
				if (!svgOverlayRef.current) return

				const svgContainer = svgOverlayRef.current
				svgContainer.innerHTML = ''

				let count = 0
				for (let row = 0; row < 4; row++) {
					for (let col = 0; col < 5; col++) {
						if (count >= 19) break

						const svgElement = document.createElement('div')
						svgElement.className = 'absolute transition-transform duration-50'
						svgElement.style.left = `${startX + col * 65 - boxSize / 2}px`
						svgElement.style.top = `${startY + row * 65 - boxSize / 2}px`
						svgElement.innerHTML = `
              <svg width="60" height="60" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.8923 77.3084H18.9472C8.48306 77.3084 0 68.8258 0 58.3601V39.4182H22.8729V54.4797H37.8923V77.3105V77.3084Z" fill="#FDC41F"/>
                <path d="M0.00242831 37.8923L0.00242913 18.9472C0.00242959 8.48306 8.48501 -1.28545e-06 18.9507 -8.27975e-07L37.8926 0L37.8926 22.8729L22.8311 22.8729L22.8311 37.8923L0.000276817 37.8923L0.00242831 37.8923Z" fill="#FDC41F"/>
                <path d="M77.3081 39.4182L77.3081 58.3633C77.3081 68.8275 68.8255 77.3105 58.3598 77.3105L39.418 77.3105L39.418 54.4376L54.4795 54.4376L54.4795 39.4182L77.3103 39.4182L77.3081 39.4182Z" fill="#FDC41F"/>
                <path d="M39.4183 0.00217869L58.3633 0.00218035C68.8275 0.00218127 77.3105 8.48476 77.3105 18.9505L77.3105 37.8923L54.4376 37.8923L54.4376 22.8308L39.4182 22.8308L39.4183 2.72049e-05L39.4183 0.00217869Z" fill="#FDC41F"/>
              </svg>
            `
						svgContainer.appendChild(svgElement)
						count++
					}
				}
			}

			createInitialSVGElements(boxSize, startX, startY)

			// Mouse для десктопа
			const mouse = Mouse.create(render.canvas)
			const mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					render: { visible: false },
				},
			})

			World.add(engine.world, mouseConstraint)

			// ИСПРАВЛЕННАЯ ОБРАБОТКА TOUCH СОБЫТИЙ
			let touchConstraint: any = null

			const handleTouchStart = (e: TouchEvent): void => {
				const touch = e.touches[0]
				const rect = render.canvas.getBoundingClientRect()

				// Правильный расчет координат относительно canvas
				const mousePosition = {
					x: touch.clientX - rect.left,
					y: touch.clientY - rect.top,
				}

				// Обновляем позицию мыши в Matter.js
				Mouse.setPosition(mouse, mousePosition)

				// Ищем тело под touch
				const bodies = Matter.Query.point(engine.world.bodies, mousePosition)

				if (bodies.length > 0) {
					const body = bodies[0]

					// Создаем constraint для перетаскивания
					touchConstraint = Matter.Constraint.create({
						pointA: mousePosition,
						bodyB: body,
						pointB: {
							x: mousePosition.x - body.position.x,
							y: mousePosition.y - body.position.y,
						},
						stiffness: 0.2,
						render: { visible: false },
					})

					World.add(engine.world, touchConstraint)
				}
			}

			const handleTouchMove = (e: TouchEvent): void => {
				e.preventDefault()
				const touch = e.touches[0]
				const rect = render.canvas.getBoundingClientRect()

				const mousePosition = {
					x: touch.clientX - rect.left,
					y: touch.clientY - rect.top,
				}

				// Обновляем позицию
				Mouse.setPosition(mouse, mousePosition)

				// Если есть активный constraint, обновляем его pointA
				if (touchConstraint) {
					touchConstraint.pointA = mousePosition
				}
			}

			const handleTouchEnd = (e: TouchEvent): void => {
				// Удаляем constraint при отпускании
				if (touchConstraint) {
					World.remove(engine.world, touchConstraint)
					touchConstraint = null
				}
			}

			render.canvas.addEventListener('touchstart', handleTouchStart, {
				passive: true,
			})
			render.canvas.addEventListener('touchmove', handleTouchMove, {
				passive: false,
			})
			render.canvas.addEventListener('touchend', handleTouchEnd, {
				passive: true,
			})
			render.canvas.addEventListener('touchcancel', handleTouchEnd, {
				passive: true,
			})

			const updateSVGPositions = (): void => {
				if (!svgOverlayRef.current) return

				const svgContainer = svgOverlayRef.current
				const svgElements = svgContainer.children

				boxesRef.current.forEach((box, index) => {
					if (svgElements[index]) {
						const svgElement = svgElements[index] as HTMLElement
						svgElement.style.left = `${box.position.x - boxSize / 2}px`
						svgElement.style.top = `${box.position.y - boxSize / 2}px`
						svgElement.style.transform = `rotate(${box.angle}rad)`
					}
				})

				requestAnimationFrame(updateSVGPositions)
			}

			Render.run(render)
			const runner = Runner.create()
			Runner.run(runner, engine)

			updateSVGPositions()

			const handleResize = (): void => {
				const { width: newWidth, height: newHeight } =
					container.getBoundingClientRect()

				render.options.width = newWidth
				render.options.height = newHeight
				render.canvas.width = newWidth
				render.canvas.height = newHeight

				updateWalls(Matter, newWidth, newHeight)
			}

			window.addEventListener('resize', handleResize)

			const updateWalls = (
				matter: typeof Matter,
				width: number,
				height: number
			): void => {
				const wallsToRemove = engine.world.bodies.filter(
					(body: Body) => body.isStatic
				)
				World.remove(engine.world, wallsToRemove)

				const newWalls = [
					matter.Bodies.rectangle(width / 2, height + 25, width, 50, {
						isStatic: true,
						render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
					}),
					matter.Bodies.rectangle(-25, height / 2, 50, height, {
						isStatic: true,
						render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
					}),
					matter.Bodies.rectangle(width + 25, height / 2, 50, height, {
						isStatic: true,
						render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
					}),
					matter.Bodies.rectangle(width / 2, -25, width, 50, {
						isStatic: true,
						render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
					}),
				]

				World.add(engine.world, newWalls)
			}

			cleanup = (): void => {
				window.removeEventListener('resize', handleResize)
				Runner.stop(runner)
				Render.stop(render)
				World.clear(engine.world, false)
				Engine.clear(engine)

				if (render.canvas) {
					render.canvas.removeEventListener('touchstart', handleTouchStart)
					render.canvas.removeEventListener('touchmove', handleTouchMove)
					render.canvas.removeEventListener('touchend', handleTouchEnd)
					render.canvas.removeEventListener('touchcancel', handleTouchEnd)
				}
			}
		}

		initPhysics()

		return (): void => {
			if (cleanup) {
				cleanup()
			}
		}
	}, [isMounted])

	if (!isMounted) {
		return (
			<div className='relative h-[556px] w-full bg-black overflow-hidden'>
				<div className='absolute inset-0 flex items-center justify-center text-white'>
					Загрузка...
				</div>
			</div>
		)
	}

	return (
		<div className='relative h-[556px] w-full bg-black overflow-hidden'>
			<div ref={containerRef} className='absolute inset-0' />

			<div
				ref={svgOverlayRef}
				className='absolute inset-0 pointer-events-none'
			></div>
		</div>
	)
}

export default FooterGame
