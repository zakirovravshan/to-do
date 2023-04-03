import { Button, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import AddImg from '../../images/plus.png';
import CloseIcon from '@mui/icons-material/Close';
import { CategorySingle } from '../../components/CategorySingle/CategorySingle';

export const Product = () => {
	const [category, setCategory] = useState([]);
	const [modal, setModal] = useState(false);

	const categoryRef = useRef();
	const categoryUrlRef = useRef();

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.post('https://641a8c8df398d7d95d59328a.mockapi.io/category', {
				category_name: categoryRef.current.value,
				category_img: categoryUrlRef.current.value,
			})
			.then((res) => {
				if (res.status === 201) {
					setModal(false);
					fecthCategory();
				}
			})
			.catch((error) => console.log(error));
	};

	const fecthCategory = () => {
		axios
			.get('https://641a8c8df398d7d95d59328a.mockapi.io/category')
			.then((res) => setCategory(res.data))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		fecthCategory();
	}, []);

	return (
		<div  className='bg-slate-200 p-8 h-screen'>
			<div style={{height:"55px"}} className='flex items-center justify-between mb-8 '>
				<div className='flex items-center'>
					<img
						className='mr-2'
						src='https://cdn-icons-png.flaticon.com/512/10186/10186122.png	'
						alt='category logo'
						width={'37px'}
					/>
					<h1> Products</h1>
				</div>
				
			</div>
			<div className=''>
				<ul
					// style={{ minHeight: '580px' }}
					className=' flex justify-between w-full gap-2 bg-slate-100 p-3 rounded-xl  mb-10'>
					{category.length ? (
						category.map((el) => (
							<li className='w-full max-w-4xl'>
								<NavLink
									to={`/product/${el.id}`}
									key={el.id}
									className={({ isActive, isPending }) =>
										isPending
											? 'pending'
											: isActive
											? 'font-medium text-blue-600 border-blue-600  border-double p-4 w-full transition duration-600 py-8 border-2 border-transparent    bg-white rounded-xl  flex items-center  '
											: 'font-medium border-double p-4 w-full transition duration-600 py-8 border-2 border-transparent    bg-white rounded-xl  flex items-center hover:border-slate-400 '
									}>
									<p className='mx-auto m-0'>{el.category_name}</p>
								</NavLink>
							</li>
						))
					) : (
						<div className='mx-auto'>
							<Loader />
						</div>
					)}
				</ul>
				<CategorySingle/>
			</div>
			<ReactModal
				onRequestClose={() => setModal(false)}
				style={{
					overlay: {
						position: 'fixed',
						zIndex: 1020,
						top: 0,
						left: 0,
						width: '100vw',
						height: '100vh',
						background: 'rgba(255, 255, 255, 0.75)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					},
					content: {
						background: 'white',
						width: '45rem',
						maxWidth: '32rem',
						maxHeight: 'calc(100vh - 2rem)',
						overflowY: 'auto',
						position: 'relative',
						border: '1px solid #ccc',
						borderRadius: '0.3rem',
					},
				}}
				isOpen={modal}>
				<div className=''>
					<div className='flex justify-between items-center mb-6 p-1'>
						<h1 className='text-lg'>Add Category </h1>
						<Button
							style={{
								maxWidth: '30px',
								maxHeight: '30px',
								minWidth: '30px',
								minHeight: '30px',
							}}
							color='error'
							onClick={() => setModal(false)}>
							<CloseIcon
								style={{
									maxWidth: '30px',
									maxHeight: '30px',
									minWidth: '30px',
									minHeight: '30px',
								}}
							/>
						</Button>
					</div>
					<div className='p-5'>
						<form onSubmit={(e) => handleSubmit(e)}>
							<div class='relative z-0 w-full mb-6 group'>
								<input
									type='text'
									ref={categoryRef}
									name='floating_email'
									id='floating_email'
									class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									placeholder=' '
									required
								/>
								<label
									for='floating_email'
									class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
									Category name
								</label>
							</div>
							<div class='relative z-0 w-full mb-6 group'>
								<input
									type='text'
									ref={categoryUrlRef}
									name='floating_first_name'
									id='floating_first_name'
									class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									placeholder=' '
									required
								/>
								<label
									for='floating_first_name'
									class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
									Category IMG URL
								</label>
							</div>
							<button
								type='submit'
								class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								Add Category
							</button>
						</form>
					</div>
				</div>
			</ReactModal>
		</div>
	);
};
