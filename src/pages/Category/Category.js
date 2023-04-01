import { Button, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import AddImg from '../../images/plus.png';
import CloseIcon from '@mui/icons-material/Close';
import { MdDeleteOutline } from 'react-icons/md';
import { toast, Toaster } from 'react-hot-toast';

export const Category = () => {
	const [category, setCategory] = useState([]);
	const [product, setProducts] = useState([]);
	const [modal, setModal] = useState(false);
	const [productmodal, setProductModal] = useState(false);

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
					toast.success(`Kategoriya muvaffaqiyatli qo'shildi !`);
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

	const handleDelete = (id) => {
		axios
			.get(
				`https://641a8c8df398d7d95d59328a.mockapi.io/category/${id}/products`,
			)
			.then((res) => {
				setProducts(res.data);
				if (res.data.length) {
					toast.error(
						`Kategoriyada tovarlar mavjudligi uchun kategoriyani o'chirib bolmaydi`,
					);
				} else {
					axios
						.delete(
							'https://641a8c8df398d7d95d59328a.mockapi.io/category/' + id,
						)
						.then((res) => {
							if (res.status === 200) {
								fecthCategory();
								toast(`Kategoriya O'chirildi`, {
									icon: '🚮',
								});
							}
						})
						.catch((error) => console.log(error));
				}
			})
			.catch((error) => console.log(error));
	};
	const handleProductModal = (id) => {
		setProductModal(true);
		axios
			.get(
				`https://641a8c8df398d7d95d59328a.mockapi.io/category/${id}/products`,
			)
			.then((res) => setProducts(res.data))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		fecthCategory();
	}, []);

	return (
		<div className='bg-slate-200 p-8 h-screen'>
			<div>
				<Toaster />
			</div>
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center'>
					<img
						className='mr-2'
						src='https://cdn-icons-png.flaticon.com/512/9244/9244680.png'
						alt='category logo'
						width={'35px'}
					/>
					<h1> Categories</h1>
				</div>
				<Button
					style={{ borderRadius: '50%', padding: '0px' }}
					className=' p-0'
					onClick={() => setModal(true)}>
					<img
						className='rounded-full'
						src={AddImg}
						alt=' add img'
						width={'55px'}
					/>
				</Button>
			</div>
			<div className=''>
				<ul
					style={{ minHeight: '580px' }}
					className=' w-full bg-slate-100 p-7 rounded-xl shadow-md       '>
					{category.length ? (
						category.map((el) => (
							<li className='relative '>
								<Link
									onClick={() => handleProductModal(el.id)}
									to='/category'
									key={el.id}
									className=' border-double p-4 justify-between    bg-white rounded-xl mb-4 flex items-center hover:shadow-xl transition duration-500'>
									<div className='flex'>
										<p className='mr-4'>{category.indexOf(el) + 1}. </p>
										<p>{el.category_name}</p>
									</div>
								</Link>
								<div className='absolute top-2 right-3 '>
									<Button color='error' onClick={() => handleDelete(el.id)}>
										<MdDeleteOutline size={'30px'} color='red' />
									</Button>
								</div>
							</li>
						))
					) : (
						<Loader />
					)}
				</ul>
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
			<ReactModal
				onRequestClose={() => setProductModal(false)}
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
						maxWidth: '45',
						maxHeight: 'calc(100vh - 2rem)',
						overflowY: 'auto',
						position: 'relative',
						border: '1px solid #ccc',
						borderRadius: '1rem',
					},
				}}
				isOpen={productmodal}>
				<ul>
					<div className='flex justify-end items-center mb-2 p-1'>
						<Button
							style={{
								maxWidth: '30px',
								maxHeight: '30px',
								minWidth: '30px',
								minHeight: '30px',
							}}
							color='error'
							onClick={() => setProductModal(false)}>
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
					{product.length ? (
						product.map((el) => (
							<div>
								<Link
									to='/category'
									key={el.id}
									className=' border border-b-2 p-3  justify-between    bg-white rounded-xl mb-2 flex items-center hover:shadow-xl transition duration-500'>
									<div className='flex items-center w-full '>
										<p className='mr-1'>{product.indexOf(el) + 1}. </p>
										<div style={{ maxWidth: '50px', width: '100%' }}>
											<img
												className='block mx-auto'
												style={{ maxHeight: '67px', width: 'auto' }}
												src={el.img}
												alt=''
											/>
										</div>
										<p>{el.name}</p>
									</div>
								</Link>
							</div>
						))
					) : (
						<div className='mx-auto text-center'>
							<Loader />
							<p>Bu kategoriyaga maxsulot qoshilmagan ! </p>
						</div>
					)}
				</ul>
			</ReactModal>
		</div>
	);
};
