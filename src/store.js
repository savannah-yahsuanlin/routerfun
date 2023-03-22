import {createStore, applyMiddleware, combineReducers} from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

export const setThings = () => {
	return async(dispatch) => {
		const response = await axios.get('/api/things')
		dispatch({type: 'SET_THINGS', things: response.data })
	}
}

export const setUsers = () => {
	return async(dispatch) => {
		const response = await axios.get('/api/users')
		dispatch({type: 'SET_USERS', users: response.data})
	}
}

export const destroyUser = (user) => {
	return async(dispatch) => {
		await axios.delete(`/api/users/${user.id}`)
		dispatch({type: 'DELETE_USER', user })
	}
}

export const thingsReducer = (state=[], action) => {
	switch(action.type) {
		case 'SET_THINGS':
			return action.things
		default:
			return state
	}
}

export const usersReducer = (state=[], action) => {
	switch(action.type) {
		case 'SET_USERS':
			return action.users
		default:
			return state
	}
}

const reducer = combineReducers({
	things: thingsReducer,
	users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store