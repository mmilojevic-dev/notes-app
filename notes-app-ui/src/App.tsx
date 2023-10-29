import { useEffect, useState } from 'react'
// import { TextInput } from 'src/components/atoms/TextInput'
import { Note } from 'src/models'
import { clsx } from 'clsx'
import { TextInput } from 'components/atoms/TextInput'

function App() {
	const [notes, setNotes] = useState<Note[]>([])
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [selectedNote, setSelectedNote] = useState<Note | null>(null)

	const fetchNotes = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/notes')

			const notes: Note[] = await response.json()

			setNotes(notes)
		} catch (e) {
			console.log(e)
		}
	}

	const handleAddNote = async (event: React.FormEvent) => {
		event.preventDefault()
		try {
			const response = await fetch('http://localhost:5000/api/notes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					content,
				}),
			})

			const newNote = await response.json()

			setNotes([newNote, ...notes])
			setTitle('')
			setContent('')
		} catch (e) {
			console.log(e)
		}
	}

	const handleNoteClick = (note: Note) => {
		setSelectedNote(note)
		setTitle(note.title)
		setContent(note.content)
	}

	const handleUpdateNote = async (event: React.FormEvent) => {
		event.preventDefault()

		if (!selectedNote) {
			return
		}

		try {
			const response = await fetch(
				`http://localhost:5000/api/notes/${selectedNote.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title,
						content,
					}),
				}
			)

			const updatedNote = await response.json()

			const updatedNotesList = notes.map((note) =>
				note.id === selectedNote.id ? updatedNote : note
			)

			setNotes(updatedNotesList)
			setTitle('')
			setContent('')
			setSelectedNote(null)
		} catch (e) {
			console.log(e)
		}
	}

	const handleCancel = () => {
		setTitle('')
		setContent('')
		setSelectedNote(null)
	}

	const handleDeleteNote = async (event: React.MouseEvent, noteId: number) => {
		event.stopPropagation()

		try {
			await fetch(`http://localhost:5000/api/notes/${noteId}`, {
				method: 'DELETE',
			})
			const updatedNotes = notes.filter((note) => note.id !== noteId)

			setNotes(updatedNotes)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		fetchNotes()
	}, [])

	return (
		<div className={clsx('container', 'font-sans', 'text-text-dark')}>
			<div
				className={clsx(
					'grid',
					'grid-cols-1',
					'gap-base',
					'lgTablet:grid-cols-[12.5rem_1fr]'
				)}
			>
				<form
					className={clsx('flex', 'flex-col', 'gap-base')}
					onSubmit={(event) =>
						selectedNote ? handleUpdateNote(event) : handleAddNote(event)
					}
					noValidate
				>
					<TextInput
						id='note-form-title'
						type='text'
						label='Title'
						required
						value={title}
						onChange={setTitle}
					/>
					<textarea
						id='note-form-content'
						className={clsx(
							'p-xs',
							'rounded-base',
							'border',
							'border-solid',
							'border-primary'
						)}
						rows={10}
						placeholder='Content'
						required
						value={content}
						onChange={(event) => setContent(event.target.value)}
					/>
					{selectedNote ? (
						<div className={clsx('flex', 'justify-evenly', 'gap-min')}>
							<button
								className={clsx(
									'rounded-base',
									'border-none',
									'p-base',
									'text-text-light',
									'bg-primary',
									'flex-1'
								)}
								type='submit'
							>
								Save
							</button>
							<button
								className={clsx(
									'rounded-base',
									'border-none',
									'p-base',
									'text-text-light',
									'bg-warning',
									'flex-1'
								)}
								onClick={handleCancel}
							>
								Cancel
							</button>
						</div>
					) : (
						<button
							className={clsx(
								'rounded-base',
								'border-none',
								'p-base',
								'text-text-light',
								'bg-primary',
								'flex-1'
							)}
							type='submit'
						>
							Add Note
						</button>
					)}
				</form>
				<div
					className={clsx(
						'grid',
						'grid-cols-[repeat(auto-fill,minmax(15.625rem,1fr))]',
						'auto-rows-[15.625rem]',
						'gap-md'
					)}
				>
					{notes.map((note) => (
						<div
							key={`note-${note.id}`}
							className={clsx(
								'flex',
								'flex-col',
								'border',
								'border-solid',
								'border-primary-light',
								'p-sm',
								'rounded-base',
								'bg-primary',
								'shadow-base'
							)}
							onClick={() => handleNoteClick(note)}
						>
							<div className={clsx('flex', 'justify-end')}>
								<button
									className={clsx(
										'bg-transparent',
										'border-none',
										'cursor-pointer'
									)}
									onClick={(event) => handleDeleteNote(event, note.id)}
								>
									X
								</button>
							</div>
							<div>
								<h2 className={clsx('text-h2-mobile', 'laptop:text-h2')}>
									{note.title}
								</h2>
								<p className={clsx('text-body1-mobile', 'laptop:text-body1')}>
									{note.content}
								</p>
							</div>
							<div className={clsx('mt-auto')}>Footer Content</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default App
