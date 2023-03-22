import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
	return (
		<nav>
			<Link to='/'>Home</Link>
			<Link to='/things'>Things</Link>
			<Link to='/users'>Users</Link>
		</nav>
	)
}

export default Nav