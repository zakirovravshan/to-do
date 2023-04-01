import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { MdDeleteOutline } from 'react-icons/md';
import ReactModal from 'react-modal';
import { Link, useParams } from 'react-router-dom';
import AddImg from '../../images/plus.png';
import CloseIcon from '@mui/icons-material/Close';

export const CategorySingle = () => {
	const [product, setProduct] = useState([]);
	const { id } = useParams();
	const [modal, setModal] = useState(false);

	const nameRef = useRef();
	const apiRef = useRef();
	const approvalsRef = useRef();
	const descriptionRef = useRef();
	const imgRef = useRef();
	const saeRef = useRef();
	const typeRef = useRef();

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.post(
				`https://641a8c8df398d7d95d59328a.mockapi.io/category/${id}/products`,
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
				if (res.status === 201) {
					setModal(false);
					fetchproduct();
					toast.success(`Maxsulot muvaffaqiyatli qo'shildi !`);
				}
			})
			.catch((error) => console.log(error));
	};

	const fetchproduct = () => {
		axios
			.get(
				`https://641a8c8df398d7d95d59328a.mockapi.io/category/${id}/products`,
			)
			.then((res) => {
				setProduct(res.data);
				console.log(res.data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		fetchproduct();
	}, [id]);

	const handleDelete = (idp) => {
		axios
			.delete(
				`https://641a8c8df398d7d95d59328a.mockapi.io/category/${id}/products/` +
					idp,
			)
			.then((res) => {
				if (res.status === 200) {
					fetchproduct();
					toast(`Maxsulot  O'chirildi`, {
						icon: '🚮',
					});
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<Toaster />
			<ul className=' w-full bg-slate-100 p-7 pt-9 rounded-xl shadow-md text-center relative'>
				<Button
					style={{
						borderRadius: '50%',
						padding: '0px',
						position: 'absolute',
						top: '-25px',
					}}
					className=' p-0 mx-auto block '
					onClick={() => setModal(true)}>
					<img
						className='rounded-full'
						src={AddImg}
						alt=' add img'
						width={'55px'}
					/>
				</Button>
				{product.length ? (
					product.map((el) => (
						<div className='relative '>
							<Link
								to='/category'
								key={el.id}
								className=' border border-b-2 p-3  justify-between    bg-white rounded-xl mb-1 flex items-center hover:shadow-xl transition duration-500'>
								<div className='flex items-center w-full '>
									<p className='mr-1'>{product.indexOf(el) + 1}. </p>
									<div style={{maxWidth:"auto" ,}} >
										<img
                                        className='block mx-auto object-cover'
											style={{ maxHeight: '67px', width: 'auto' }}
											src={el.img}
											alt=''
										/>
									</div>
									<p className='ms-2' >{el.name}</p>
								</div>
							</Link>
							<div className='absolute top-7 right-3 '>
								<Button color='error' onClick={() => handleDelete(el.id)}>
									<MdDeleteOutline size={'30px'} color='red' />
								</Button>
							</div>
						</div>
					))
				) : (
					<div className='mx-auto text-center'>
						<p> Maxsulot kategroiyasini tanlang ! </p>
					</div>
				)}
			</ul>
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
									defaultValue={'Valvoline '}
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
