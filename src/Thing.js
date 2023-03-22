import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { updateThing, destroyThing } from './store';


const Thing = () => {
	const {id} = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const {things} = useSelector(state => state)
	const [name, setName] = useState('')
	const thing = things.find(thing => thing.id === id)

	useEffect(() => {
		const thing = things.find(thing => thing.id === id)
		if(thing) setName(thing.name)
	}, [things])

	if(!thing) return null

	const destroyed = (thing) => {
		dispatch(destroyThing(thing))
		navigate('/things');
	}

	const update = async(ev) => {
		ev.preventDefault()
		try {
			const updated = {id, name}
			await dispatch(updateThing(updated))
			navigate(`/things/${id}`);
		} catch (error) {
			console.log(error.response.data)
		}
	}
	return (
		<div>
			<h1>Todo</h1>
				{thing.name}
			<form onSubmit={update}>
				<input value={name} onChange={(e) => setName(e.target.value)}/>
				<button disabled={name === thing.name}>Update</button>
			</form>
			<button onClick={() => destroyed(thing) }>X</button>
		</div>
	)		
}

export default Thing