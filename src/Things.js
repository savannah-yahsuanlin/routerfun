import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Things = () => {
	const {things} = useSelector(state => state)

	return (
		<div>
			<h1>Todos</h1>
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