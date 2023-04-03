import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export const Statistic = () => {
	const [category, setCategory] = useState([]);
	const [product, setProducts] = useState([]);

	const arr = [];

	category.map((el) => el.category_name);

	const options = {
		dataLabels: {
			enabled: false,
		},
		series: [],
		labels: category.map((el) => el.category_name),
	};

	category.map((el) => arr.push(el.child_product.length));

	const series = [...arr];

	const fecthCategory = () => {
		axios
			.get('https://641a8c8df398d7d95d59328a.mockapi.io/category')
			.then((res) => {
				setCategory(res.data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		fecthCategory();
	}, []);

	return (
		<div className='bg-slate-200 p-8 h-screen'>
			<div className='flex items-center justify-between mb-8'>
				<div style={{ height: '55px' }} className='flex items-center '>
					<img
						className='mr-2'
						src='https://cdn-icons-png.flaticon.com/512/9376/9376434.png'
						alt='category logo'
						width={'40px'}
					/>
					<h1> Statistics</h1>
				</div>
			</div>
			<div className=''>
				<ul
					style={{ minHeight: '580px' }}
					className=' w-full bg-slate-100 p-7 rounded-xl shadow-md flex items-center '>
						
					<div className='mx-auto' >
					<h2 className='mx-auto text-center mb-4 text-2xl font-medium' >Статистика по количеству товаров на сайте</h2>
						<Chart
							className='text-center mx-auto'
							options={options}
							series={series}
							type='donut'
							width='120%'
							heigh={300}
						/>
					</div>
				</ul>
			</div>
		</div>
	);
};
