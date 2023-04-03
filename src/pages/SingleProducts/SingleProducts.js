import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineArrowBack } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import ReactModal from 'react-modal';
import { Toaster, toast } from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';

export const SingleProducts = () => {
	const { id, categoryId } = useParams();
	const [product, setProduct] = useState({});
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();

	const nameRef = useRef();
	const apiRef = useRef();
	const approvalsRef = useRef();
	const descriptionRef = useRef();
	const imgRef = useRef();
	const saeRef = useRef();
	const typeRef = useRef();

	const fetchproduct = () => {
		axios
			.get(
				`https://641a8c8df398d7d95d59328a.mockapi.io//category/${categoryId}/products/${id}`,
			)
			.then((res) => setProduct(res.data))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		fetchproduct();
	}, []);

	const handleEdit = () => {
		setModal(true);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.put(
				`https://641a8c8df398d7d95d59328a.mockapi.io//category/${categoryId}/products/${id}`,
				{
					name: nameRef.current.value,
					img: imgRef.current.value,
					api: apiRef.current.value,
					sae: saeRef.current.value,
					type: typeRef.current.value,
					description: descriptionRef.current.value,
					approvals: approvalsRef.current.value,
				},
			)
			.then((res) => {
				if (res.status === 200) {
					setModal(false);
					fetchproduct();
					toast.success(`Maxsulot malumotlari muvaffaqiytali ozgartirildi  !`);
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className='bg-slate-200 p-8 h-screen'>
			<Toaster />
			<div className='flex items-center justify-between mb-8'>
				<div
					style={{ height: '55px' }}
					className='flex items-center justify-between w-100 '>
					<Button className='block' onClick={() => navigate(-1)}>
						<MdOutlineArrowBack size={'32px'} />
					</Button>
				</div>
			</div>
			<div className=''>
				<Button style={{ position: 'absolute' , right:"40px" , top:"130px" }} onClick={() => handleEdit()}>
					<BiEditAlt size={'35px'} color='orange' />
				</Button>
				<ul
					style={{ minHeight: '580px', maxHeight: '581px' }}
					className=' w-full bg-white p-7 pt-3 rounded-xl shadow-md  flex pt-10 '>
					<li className='flex items-start justify-between w-full'>
						<div
							style={{
								maxWidth: '300px',
								width: '100%',
								maxHeight: '510px',
								height: '100%',
							}}
							className='mt-3 text-center '>
							<img
								style={{
									objectFit: 'contain',
									maxHeight: '510px',
									height: '100%',
								}}
								className='object-contain block mx-auto'
								src={product.img}
								alt={product.name}
							/>
						</div>
						<div className='text-slate-800 p-7 w-3/4'>
							<h3
								style={{ color: '#0f3d7b' }}
								className='text-3xl font-medium mb-4'>
								{product.name}
							</h3>
							<h4 style={{ color: '#0f3d7b' }} className='text-lg font-medium'>
								Описание :
							</h4>
							<div style={{ maxHeight: '200px', overflow: 'auto' }}>
								<p
									style={{ maxWidth: '100%', overflow: 'scroll' }}
									className='text-base italic'>
									{product.description}
								</p>
							</div>
							<h4 style={{ color: '#0f3d7b' }} className='text-lg font-medium'>
								Тип :
							</h4>
							<p
								style={{ maxWidth: '100%', overflow: 'scroll' }}
								className='text-base'>
								{product.type}
							</p>
							<h4 style={{ color: '#0f3d7b' }} className='text-lg font-medium'>
								Вязкость :
							</h4>
							<p
								style={{ maxWidth: '100%', overflow: 'scroll' }}
								className='text-base'>
								{product.sae}
							</p>
							<div style={{ maxHeight: '80px', overflow: 'auto' }}>
								<h4
									style={{ color: '#0f3d7b' }}
									className='text-lg font-medium'>
									Лицензии/Соответствия :
								</h4>
								<p
									style={{ maxWidth: '100%', overflow: 'scroll' }}
									className='text-base'>
									{product.approvals}
								</p>
							</div>
						</div>
					</li>
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
						<h1 className='text-lg'>Add Product </h1>
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
							<div className='relative z-0 w-full mb-6 group'>
								<input
									ref={nameRef}
									type='text'
									defaultValue={product.name}
									name='floating_email'
									id='floating_email'
									className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									placeholder=' '
									required
								/>
								<label
									htmlFor='floating_email'
									className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
									Product Name
								</label>
							</div>
							<div className='relative z-0 w-full mb-6 group'>
								<input
									type='text'
									ref={descriptionRef}
									name='floating_password'
									id='floating_password'
									className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									placeholder=' '
									required
									defaultValue={product.description}
								/>
								<label
									htmlFor='floating_password'
									className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
									Description
								</label>
							</div>
							<div className='relative z-0 w-full mb-6 group'>
								<input
									type='text'
									ref={typeRef}
									name='repeat_password'
									id='floating_repeat_password'
									className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									placeholder=' '
									defaultValue={product.type}
									required
								/>
								<label
									htmlFor='floating_repeat_password'
									className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
									Type
								</label>
							</div>
							<div className='grid md:grid-cols-2 md:gap-6'>
								<div className='relative z-0 w-full mb-6 group'>
									<input
										type='text'
										ref={apiRef}
										name='floating_first_name'
										id='floating_first_name'
										className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
										placeholder=' '
										defaultValue={product.api}
									/>
									<label
										htmlFor='floating_first_name'
										className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
										API
									</label>
								</div>
								<div className='relative z-0 w-full mb-6 group'>
									<input
										type='text'
										ref={saeRef}
										name='floating_last_name'
										id='floating_last_name'
										defaultValue={product.sae}
										className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
										placeholder=' '
									/>
									<label
										htmlFor='floating_last_name'
										className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
										SAE
									</label>
								</div>
							</div>
							<div className='grid md:grid-cols-2 md:gap-6'>
								<div className='relative z-0 w-full mb-6 group'>
									<input
										ref={approvalsRef}
										type='text'
										name='floating_phone'
										id='floating_phone'
										className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
										placeholder=' '
										required
										defaultValue={product.approvals}
									/>
									<label
										htmlFor='floating_phone'
										className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
										Approvals
									</label>
								</div>
								<div className='relative z-0 w-full mb-6 group'>
									<input
										ref={imgRef}
										type='text'
										name='floating_company'
										id='floating_company'
										className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
										placeholder=' '
										required
										defaultValue={product.img}
									/>
									<label
										htmlFor='floating_company'
										className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
										IMAGE URL
									</label>
								</div>
							</div>
							<button
								type='submit'
								className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</ReactModal>
		</div>
	);
};
