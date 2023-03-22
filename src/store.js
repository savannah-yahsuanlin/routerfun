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

export const createThing = (thing) => {
	return async(dispatch) => {
		const response = await axios.post('/api/things', thing)
		dispatch({type: 'CREATE_THING', thing: response.data})
	}
}

export const destroyThing = (thing) => {
	return async(dispatch) => {
		await axios.delete(`/api/things/${thing.id}`)
		dispatch({type: 'DELETE_THING', thing })
	}
}

export const updateThing = (thing) => {
	return async(dispatch) => {
		const response = await axios.put(`/api/things/${thing.id}`, thing)
		dispatch({type: 'UPDATE_THING', thing: response.data })
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
		case 'CREATE_THING':
			return [...state, action.thing]
		case 'DELETE_THING':
			return state.filter(thing => thing.id !== action.thing.id)
		case 'UPDATE_THING':
			return state.map(thing => thing.id === action.thing.id ? action.thing:thing)
		default:
			return state
	}
}


export const usersReducer = (state=[], action) => {
	switch(action.type) {
		case 'SET_USERS':
			return action.users
		case 'DELETE_USER':
			return state.filter(user => user.id !== action.user.id)
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