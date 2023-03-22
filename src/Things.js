import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { createThing } from './store';

const Things = () => {
	const {things} = useSelector(state => state)
	const dispatch = useDispatch()
	const [name, setName] = useState('')
	
	const handleSubmit = async(e) => {
		e.preventDefault();
		try {
			dispatch(createThing({name}))
			setName('');
		} catch (error) {
			console.log(error)
		}
	
	}
	return (
		<div>
			<h1>Todos</h1>
				<form onSubmit={handleSubmit}>
				<input value={name} onChange={(e) => setName(e.target.value)}/>
				<button>Add</button>
			</form>
				<ul>
					{
						things.map(thing => {
							return (
								<li key={thing.id}>
									<Link to={`/things/${thing.id}`}>{thing.name}</Link>({ thing.rating})
								</li>
							)
						})
					}
				</ul>
				
		</div>
	)
}



export default Things;