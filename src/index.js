import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Things from './Things';
import Users from './Users';
import Home from './Home';
import Nav from './Nav';
import store, { setThings, setUsers } from './store';

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setThings())
		dispatch(setUsers())
	}, [])

	return (
	 <div>
			<Nav />
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/things' element={ <Things />} />
				<Route path='/users' element={ <Users />} />
      </Routes>
    </div>
	)
}

const root = createRoot(document.querySelector('#root'));
root.render(
  <Provider store={ store }>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>);