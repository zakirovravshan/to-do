import React from 'react';

export const News = () => {
	return (
		<div className='bg-slate-200 p-8 h-screen'>
			<div className='flex items-center justify-between mb-8'>
				<div style={{ height: '55px' }} className='flex items-center '>
					<img
						className='mr-2'
						src='https://cdn-icons-png.flaticon.com/512/2899/2899403.png'
						alt='category logo'
						width={'35px'}
					/>
					<h1> News</h1>
				</div>
			</div>
			<div className=''>
				<ul
					style={{ minHeight: '580px' }}
					className=' w-full bg-slate-100 p-7 rounded-xl shadow-md '></ul>
			</div>
		</div>
	);
};
