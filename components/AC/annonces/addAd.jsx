import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Range } from 'react-range';
import axios from 'axios';
import { API_URL, PUBLIC_URL } from '../../../config/api';
import Autocomplete from 'react-autocomplete';

export default function AddAdModal({ fetchAdvertisements, advertisers }) {
	const [showModal, setShowModal] = React.useState(false);

	useEffect(() => {
		function handleClickOutside(event) {
			if (event.target.classList.contains('modal')) {
				setShowModal(false);
			}
		}

		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, []);
	const [name, setName] = React.useState('');
	const [showTime, setShowTime] = React.useState('');
	const [sexe, setSexe] = React.useState('');
	const [price, setPrice] = React.useState('');
	const [minMaxAge, setMinMaxAge] = React.useState([20, 40]);
	const [videoFile, setVideoFile] = React.useState(null);
	const [videoPath, setVideoPath] = React.useState('');
	const [selectedAdvertiser, setSelectedAdvertiser] = React.useState(null);
	const [value, setValue] = React.useState('');

	const handleMinMaxAgeChange = (newValue) => {
		setMinMaxAge(newValue);
	};

	const handleSexeChange = (e) => {
		e.preventDefault();
		setSexe(e.target.value);
	};

	const handleSelect = (val) => {
		const selected = advertisers.find(
			(advertiser) => advertiser?.nom_annonceur === val
		);
		setSelectedAdvertiser(selected);
		setValue(val);
	};
	const filteredAdvertisers = advertisers
		?.filter((advertiser) =>
			advertiser.nom_annonceur
				?.toLowerCase()
				?.includes(value.toLowerCase())
		)
		.slice(0, 3); // Limit the number of items to 3
	const handleSave = async () => {
		try {
			const formData = new FormData();
			formData.append('nom_annonce', name);
			formData.append('id_annonceur', selectedAdvertiser.id_annonceur);
			formData.append('duree_affichage', showTime);
			formData.append('ageMax', minMaxAge[1]);
			formData.append('ageMin', minMaxAge[0]);
			formData.append('sexeCible', sexe);
			formData.append('prix_annonce', price);
			formData.append('videoFile', videoFile);

			const response = await axios.post(
				`${API_URL}/api/ads/createAdvertisement/`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			response.data;
		} catch (error) {
			console.error(error);
		}
		// Reset the form
		setName('');
		setPrice('');
		setSexe('');
		setShowTime('');
		setVideoPath('');
		setMinMaxAge([10, 20]);
		console.log(fetchAdvertisements);
		await fetchAdvertisements();
		setShowModal(false);
		console.log(showModal);
	};

	const handleFileInputChange = async (event) => {
		const file = event.target.files[0];
		setVideoFile(file);
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			console.log('start reading the video');

			reader.onload = () => {
				console.log('done reading the video');
				setVideoPath(reader.result);
			};
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!price) {
			toast.error('Veuillez entrer le prix de la Annonce');
			return;
		}
		if (price < 0) {
			toast.error('Veuillez entrer un prix positif');
			return;
		}

		if (price < 0) {
			toast.error('Veuillez entrer un prix positif');
			return;
		}

		const selected = advertisers.find(
			(advertiser) => advertiser?.nom_annonceur === value
		);
		if (selected == -1) {
			toast.error('Veuillez choisir un prix positif');
			return;
		}

		// If all validations pass, save the beverage
		handleSave();
		toast.success('Ajouté avec success');
	};

	return (
		<>
			<button
				className='self-end px-4 py-4 mr-12 text-white bg-dark-grey rounded-xl'
				type='button'
				onClick={() => setShowModal(true)}>
				Ajouter
			</button>
			{showModal ? (
				<>
					<div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none modal'>
						<div className='relative w-auto max-w-3xl mx-auto my-6'>
							{/*content*/}
							<div
								className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  h-[600px] w-[600px] overflow-scroll
                                    scrollbar  scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack '>
								{/*header*/}
								<div className='flex justify-center p-5 mx-auto border-b border-solid rounded-t border-slate-200'>
									<h3 className='text-3xl font-semibold text-dark-grey'>
										Ajouter un annonce
									</h3>
									<button
										className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none'
										onClick={() =>
											setShowModal(false)
										}>
										<span className='block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none'>
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className='relative flex-auto p-6'>
									<form>
										<div className='mb-4'>
											<label
												className='block mb-2 font-bold text-gray-700'
												htmlFor='name'>
												Nom de
												l&apos;annonce
											</label>
											<input
												className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
												id='name'
												type='text'
												placeholder="Entrez le nom de l'annonce"
												value={name}
												onChange={(e) =>
													setName(
														e.target
															.value
													)
												}
											/>
										</div>
										<div className='relative w-full mb-4'>
											<label
												className='block mb-2 font-bold text-gray-700'
												htmlFor='advertiser'>
												Annonceur :
											</label>
											<Autocomplete
												inputProps={{
													id: 'advertiser',
													placeholder:
														"Entrez nom de l'annonceur",
													className:
														'w-full  px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline',
												}}
												getItemValue={(
													item
												) =>
													item.nom_annonceur
												}
												items={
													filteredAdvertisers
												}
												value={value}
												onChange={(e) =>
													setValue(
														e.target
															.value
													)
												}
												onSelect={
													handleSelect
												}
												renderMenu={(
													children
												) => (
													<div className='absolute z-10 w-64 mt-2 bg-white border border-gray-300 rounded'>
														{children}
													</div>
												)}
												renderItem={(
													item,
													isHighlighted
												) => (
													<div
														key={
															item.id_annonceur
														}
														className={` cursor-pointer  mb-2  text-gray-700 item ${
															isHighlighted
																? 'highlighted bg-dark-grey text-white'
																: ''
														}`}>
														{
															item.nom_annonceur
														}
													</div>
												)}
											/>
										</div>
										<div className='mb-4'>
											<label
												className='block font-bold text-gray-700 '
												htmlFor='name'>
												Durée
												d&apos;affichage
											</label>
											<input
												className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
												id='price'
												type='number'
												placeholder="Entrez le durée de l'annonce en jours"
												value={showTime}
												onChange={(e) =>
													setShowTime(
														e.target
															.value
													)
												}
											/>
										</div>

										<div className='mb-4'>
											<label
												className='block font-bold text-gray-700 '
												htmlFor='name'>
												Genre cible
											</label>

											<div className='flex items-center justify-center'>
												<div className='flex ml-2'>
													<div className='mr-2'>
														<input
															type='radio'
															name='sexe'
															id='M'
															value='M'
															className='mr-1 appearance-none'
															onClick={
																handleSexeChange
															}
														/>
														<label
															htmlFor='M'
															className={`flex items-center px-2 py-1 rounded-lg  bg-gray-200 border border-gray-300 rounded-l cursor-pointer ${
																sexe ===
																'M'
																	? ' bg-slate-800 text-slate-50'
																	: ''
															}`}>
															Hommes
														</label>
													</div>
													<div className='mr-2'>
														<input
															type='radio'
															name='sexe'
															id='F'
															value='F'
															onClick={
																handleSexeChange
															}
															className='mr-1 appearance-none'
														/>
														<label
															htmlFor='F'
															className={`flex items-center px-2 py-1  rounded-lg bg-gray-200 border border-gray-300  cursor-pointer ${
																sexe ===
																'F'
																	? ' bg-slate-800 text-slate-50'
																	: ''
															}`}>
															Femmes
														</label>
													</div>
													<div>
														<input
															type='radio'
															name='sexe'
															id='B'
															value='B'
															className='mr-1 appearance-none'
															onClick={
																handleSexeChange
															}
														/>
														<label
															htmlFor='B'
															className={`flex items-center px-2 py-1  rounded-lg bg-gray-200 border border-gray-300 rounded-l cursor-pointer ${
																sexe ===
																'B'
																	? ' bg-slate-800 text-slate-50'
																	: ''
															}`}>
															Les
															deux
														</label>
													</div>
												</div>
											</div>
										</div>

										<div className='flex items-center justify-start my-8 '>
											<div className='mr-8 font-bold text-gray-700'>
												{`Age cible :  ${minMaxAge[0]}
                                                             - ${minMaxAge[1]}`}
											</div>

											<Range
												values={minMaxAge}
												step={1}
												min={0}
												max={100}
												onChange={
													handleMinMaxAgeChange
												}
												renderTrack={({
													props,
													children,
												}) => (
													<div
														{...props}
														style={{
															...props.style,
															height: '6px',
															width: '70%',
															backgroundColor:
																'#343A49',
														}}>
														{children}
													</div>
												)}
												renderThumb={({
													props,
												}) => (
													<div
														{...props}
														style={{
															...props.style,
															height: '24px',
															width: '24px',
															borderRadius:
																'50%',
															backgroundColor:
																'#343A49',
														}}
													/>
												)}
											/>
										</div>

										<div className='mb-4'>
											<label
												className='block mb-2 font-bold text-gray-700'
												htmlFor='price'>
												Prix
											</label>
											<input
												className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
												id='price'
												type='number'
												placeholder='Entrez le prix de la Annonce'
												value={price}
												onChange={(e) =>
													setPrice(
														e.target
															.value
													)
												}
											/>
										</div>
										<div className='mb-4'>
											<label
												className='block mb-2 font-bold text-gray-700'
												htmlFor='picture'>
												vidéo
											</label>

											<div className='relative flex items-center justify-between gap-8 '>
												{videoPath ? (
													<video
														controls
														//poster='/path/to/poster.jpg'
														height={
															300
														}
														width={
															300
														}
														alt='video'
														loading='lazy'>
														<source
															src={
																videoPath
															}
															type='video/mp4'
														/>
													</video>
												) : (
													<div className='w-48 h-48 bg-gray-200 rounded' />
												)}
												<input
													id='videoInput'
													type='file'
													onChange={
														handleFileInputChange
													}
													className='absolute inset-0 mt-2 opacity-0 cursor-pointer'
												/>
												<button
													className={`px-4 py-2 text-dark-gray ${
														videoFile
															? 'bg-scrollbarThumb text-white'
															: 'bg-gray-200'
													}  rounded hover:bg-blue-600 focus:outline-none`}>
													Sélectionner un
													fichier
												</button>
											</div>
										</div>
									</form>
								</div>

								<div className='flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200'>
									<button
										className='px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-dark-grey hover:shadow-lg focus:outline-none'
										type='button'
										onClick={handleSubmit}>
										sauvegarder
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='fixed inset-0 z-40 bg-black opacity-25'></div>
				</>
			) : null}
		</>
	);
}