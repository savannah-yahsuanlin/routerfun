import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { destroyUser } from './store';

const Users = () => {
	const {users} = useSelector(state => state)
	const dispatch = useDispatch()

	return (
		<div>
			<h1>Users</h1>
				<ul>
					{
						users.map(user => {
							return (
								<li key={user.id}>
									{user.name}
									<button style={{marginLeft: '10px' }} onClick={() => dispatch(destroyUser(user))}>X</button>
								</li>
							)
						})
					}
				</ul>
		</div>
	)
}



export default Users;