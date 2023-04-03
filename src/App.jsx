import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CategorySingle } from './components/CategorySingle/CategorySingle';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Category } from './pages/Category/Category';
import { Home } from './pages/Home/Home';
import { Info } from './pages/Info/Info';
import { News } from './pages/News/News';
import { Product } from './pages/Product/Product';
import { Statistic } from './pages/Statistic/Statistic';
import { SingleProducts } from './pages/SingleProducts/SingleProducts';
import './App.css';

export const App = () => {
	return (
		<div className='flex'>
			<Sidebar />
			<div className='w-full h-full '>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/category' element={<Category />} />
					<Route path='/product' element={<Product />}>
						<Route path='/product/:id' element={<CategorySingle />} />
					</Route>
					<Route path='/statistic' element={<Statistic />} />
					<Route path='/info' element={<Info />} />
					<Route path='/news' element={<News />} />
					<Route
							path='/product/:categoryId/singleproduct/:id'
							element={<SingleProducts />}
						/>
				</Routes>
			</div>
		</div>
	);
};
