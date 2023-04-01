import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { SiAzureartifacts } from 'react-icons/si';
import { MdLeaderboard } from 'react-icons/md';
import { BiHome } from 'react-icons/bi';
import { TbInfoSquare } from 'react-icons/tb';
import { BiNews } from 'react-icons/bi';


import ValvolineLogo from '../../images/vallogo.png';

export const Sidebar = () => {
	return (
		<div className=''>
			<div
				style={{ backgroundColor: '#1c263d' }}
				className={'w-72 h-screen bg-transparent  p-2 shadow-2xl   '}>
				<img
					className='block p-4 mx-auto py-8  '
					src={ValvolineLogo}
					alt='logo'
					width={'150px'}
				/>
				<ul className='flex-col items-center '>
					<li>
						<NavLink
							style={{ color: '#fff' }}
							className={({ isActive, isPending }) =>
								isPending
									? 'pending'
									: isActive
									? 'block p-5 border-2 border-transparent  bg-violet-600 rounded-xl mb-2 shadow flex items-center '
									: 'block p-5 border-2  border-transparent rounded-xl  mb-2 shadow flex items-center hover:bg-slate-700 '
							}
							to={'/'}>
							<BiHome className='mr-2' size={'32px'} color={'#fff'} /> Home
						</NavLink>
					</li>
					<li>
						<NavLink
							style={{ color: '#fff' }}
							className={({ isActive, isPending }) =>
								isPending
									? 'pending'
									: isActive
									? 'block p-5 border-2 border-transparent  bg-violet-600 rounded-xl mb-2 shadow flex items-center '
									: 'block p-5 border-2 border-transparent  rounded-xl  mb-2 shadow flex items-center hover:bg-slate-700'
							}
							to={'/category'}>
							<BiCategory className='mr-2' size={'32px'} color={'#fff'} />{' '}
							Category
						</NavLink>
					</li>
					<li>
						<NavLink
							style={{ color: '#fff' }}
							className={({ isActive, isPending }) =>
								isPending
									? 'pending'
									: isActive
									? 'block p-5 border-2 border-transparent  bg-violet-600 rounded-xl mb-2 shadow flex items-center '
									: 'block p-5 border-2  border-transparent rounded-xl  mb-2 shadow flex items-center hover:bg-slate-700 '
							}
							to={'/product'}>
							<SiAzureartifacts className='mr-2' size={'32px'} color={'#fff'} />{' '}
							Product
						</NavLink>
					</li>
					<li>
						<NavLink
							style={{ color: '#fff' }}
							className={({ isActive, isPending }) =>
								isPending
									? 'pending'
									: isActive
									? 'block p-5 border-2 border-transparent  bg-violet-600 rounded-xl mb-2 shadow flex items-center '
									: 'block p-5 border-2  border-transparent rounded-xl  mb-2 shadow flex items-center  hover:bg-slate-700'
							}
							to={'/statistic'}>
							<MdLeaderboard
								className='mr-2 w-6'
								size={'32px'}
								color={'#fff'}
							/>
							Statistics
						</NavLink>
					</li>
					<li>
						<NavLink
							style={{ color: '#fff' }}
							className={({ isActive, isPending }) =>
								isPending
									? 'pending'
									: isActive
									? 'block p-5 border-2 border-transparent  bg-violet-600 rounded-xl mb-2 shadow flex items-center '
									: 'block p-5 border-2  border-transparent rounded-xl  mb-2 shadow flex items-center hover:bg-slate-700 '
							}
							to={'/info'}>
							<TbInfoSquare className='mr-2' size={'28px'} color={'#fff'} />
							About Info's
						</NavLink>
					</li>
					<li>
						<NavLink
							style={{ color: '#fff' }}
							className={({ isActive, isPending }) =>
								isPending
									? 'pending'
									: isActive
									? 'block p-5 border-2 border-transparent  bg-violet-600 rounded-xl mb-2 shadow flex items-center '
									: 'block p-5 border-2  border-transparent rounded-xl  mb-2 shadow flex items-center hover:bg-slate-700 '
							}
							to={'/news'}>
							<BiNews className='mr-2' size={'32px'} color={'#fff'} /> News
						</NavLink>
					</li>
					
				</ul>
			</div>
		</div>
	);
};
