export const Home = () => {
	// const handleSubmit = (evt) => {
	// 	evt.preventDefault();
	// 	axios
	// 		.post('https://641a8c8df398d7d95d59328a.mockapi.io/category', {
	// 			category_name: categoryRef.current.value,
	// 			category_img: categoryUrlRef.current.value,
	// 		})
	// 		.then((res) => {
	// 			if (res.status === 201) {
	// 				setModal(false);
	// 				fecthCategory();
	// 			}
	// 		})
	// 		.catch((error) => console.log(error));
	// };

	// const fecthCategory = () => {
	// 	axios
	// 		.get('https://641a8c8df398d7d95d59328a.mockapi.io/category')
	// 		.then((res) => setCategory(res.data))
	// 		.catch((error) => console.log(error));
	// };

	// const handleDelete = (id) => {
	// 	axios
	// 		.delete('https://641a8c8df398d7d95d59328a.mockapi.io/category/' + id)
	// 		.then((res) => {
	// 			if (res.status === 200) {
	// 				fecthCategory();
	// 			}
	// 		})
	// 		.catch((error) => console.log(error));
	// };

	// useEffect(() => {
	// 	fecthCategory();
	// }, []);

	return (
		<div className='bg-slate-200 p-8 h-screen'>
			<div className='flex items-center justify-between mb-8'>
				<div style={{height:"55px"}} className='flex items-center '>
					<img
						className='mr-2'
						src='https://cdn-icons-png.flaticon.com/512/4043/4043180.png'
						alt='category logo'
						width={'35px'}
					/>
					<h1> Main Page</h1>
				</div>
				
			</div>
			<div className=''>
				<ul
					style={{ minHeight: '580px' }}
					className=' w-full bg-slate-100 p-7 rounded-xl shadow-md '>
					
				</ul>
			</div>
		</div>
	);
};
