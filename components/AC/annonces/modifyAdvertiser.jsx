import React, { useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API_URL, PUBLIC_URL } from '../../../config/api';

export default function ModifyAdvertiserModal({
	Advertiser,
	setSelectedAdvertiser,
	fetchAdvertisers,
}) {
	const [selectedFile, setSelectedFile] = React.useState(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (event.target.classList.contains('modal')) {
				setSelectedAdvertiser(null);
			}
		}

		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setName(Advertiser?.nom_annonceur);
		setPhone(Advertiser?.telephone_annonceur);
		setRCS(Advertiser?.rcs_annonceur);
		setFiscal(Advertiser?.fiscal_annonceur);

		setType(Advertiser?.type_annonceur);
		setImagePath(Advertiser?.path_annonceur);
	}, [Advertiser]);
	const [name, setName] = React.useState();
	const [phone, setPhone] = React.useState('');
	const [RCS, setRCS] = React.useState('');
	const [fiscal, setFiscal] = React.useState('');
	const [type, setType] = React.useState();
	const [image, setImage] = React.useState();
	const [imagePath, setImagePath] = React.useState();
	const handleTypeChange = (e) => {
		e.preventDefault();
		setType(e.target.value);
	};

	const handleSave = async () => {
		const formData = new FormData();
		formData.append('nom_annonceur', name);
		formData.append('telephone_annonceur', phone);
		formData.append('fiscal_annonceur', fiscal);
		formData.append('rcs_annonceur', RCS);
		formData.append('image', image ) ;
		console.log(image);
		const token = localStorage.getItem('token');
		let data,link,config;
		if (!image) {
			data = {
			  nom_annonceur: name,
			  telephone_annonceur :phone,
			  fiscal_annonceur: fiscal,
			  rcs_annonceur:  RCS,
			};
			link = "updateAdvertiserWithoutTheFile";
			config = {
			  headers: {
				Authorization: `Bearer ${token}`,
			  },
			};
		  } else {
			data = formData;
			link = "updateAdvertiser";
	  
			config = {
			  headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			  },
			};
		  }
		
		try {

	
			const res = await axios.post(
				`${API_URL}/api/ads/${link}/${Advertiser.id_annonceur}`,
				data,
				config
			);
			console.log(formData.get('image'));
			console.log(formData.get('nom_annonceur'));
			console.log(res.data);
			await fetchAdvertisers();
		} catch (err) {
			console.error(err);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!name) {
			toast.error('Veuillez entrer le nom de la Annonceur');
			return;
		}
		if (!type) {
			toast.error('Veuillez entrer le type de la Annonceur');
			return;
		}

		// If all validations pass, save the beverage
		handleSave();
		//toast.success('Ajouté avec success');
		
		setSelectedAdvertiser(null);
	};

	// image handling

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				setImagePath(reader.result);
			};
			setSelectedFile(true);
		}
	};

	return (
		<>
			{Advertiser ? (
				<>
					<div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none modal'>
						<div className='relative w-auto max-w-3xl mx-auto my-6'>
							{/*content*/}
							<div
								className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none over overflow-y-scroll 
                                        scrollbar  scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack
                                        h-[600px] w-[600px] '>
								{/*header*/}
								<div className='flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200'>
									<h3 className='text-3xl font-semibold text-dark-grey'>
										Modifier l&apos;nnonceur
									</h3>
									<button
										className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none'
										onClick={() =>
											setSelectedAdvertiser(
												null
											)
										}>
										<span className='z-10 block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none'>
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
												htmlFor='Name'>
												Nom de l&apos;
												Annonceur
											</label>

											<input
												name='Name'
												className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
												id='name'
												type='text'
												placeholder='Entrez le nom de la Annonceur'
												value={name}
												onChange={(e) =>
													setName(
														e.target
															.value
													)
												}
											/>
										</div>
										<div className='mb-4'>
											<label
												className='block mb-2 font-bold text-left text-gray-700'
												htmlFor='price'>
												Numéros de telephone
											</label>
											<div className='flex items-center gap-x-4'>
												<input
													className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
													id='price'
													type='number'
													placeholder='Entrez le Numéros de telephone '
													value={phone}
													onChange={(
														e
													) =>
														setPhone(
															e
																.target
																.value
														)
													}
												/>
											</div>
										</div>
										<div className='mb-4'>
											<label
												className='block mb-2 font-bold text-left text-gray-700'
												htmlFor='price'>
												Numéro fiscal
											</label>
											<div className='flex items-center gap-x-4'>
												<input
													className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
													id='price'
													type='number'
													placeholder='Entrez le Numéro fiscal'
													value={fiscal}
													onChange={(
														e
													) =>
														setFiscal(
															e
																.target
																.value
														)
													}
												/>
											</div>
										</div>
										<div className='mb-4'>
											<label
												className='block mb-2 font-bold text-left text-gray-700'
												htmlFor='RCS'>
												Numéro RCS
											</label>
											<div className='flex items-center gap-x-4'>
												<input
													className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
													id='price'
													type='number'
													placeholder='Entrez le Numéro RCS'
													value={RCS}
													onChange={(
														e
													) =>
														setRCS(
															e
																.target
																.value
														)
													}
												/>
											</div>
										</div>
										<div className='flex items-center justify-start mb-4 gap-x-12'>
											<label
												className='block mt-4 font-bold text-gray-700 '
												htmlFor='name'>
												Le type
											</label>

											<div className='flex items-center justify-center'>
												<div className='flex items-center ml-2 '>
													<div className='mr-2'>
														<input
															type='radio'
															name='type'
															id='Personne'
															value='Personne'
															className='mr-1 appearance-none'
															onClick={
																handleTypeChange
															}
														/>
														<label
															htmlFor='Personne'
															className={`flex items-center px-2 py-1 rounded-lg  bg-gray-100 border border-gray-300  cursor-pointer ${
																type ===
																'Personne'
																	? ' bg-slate-800 text-slate-50'
																	: ' bg-gray-50 text-gray-500'
															}`}>
															Personne
														</label>
													</div>
													<div className='mr-2'>
														<input
															type='radio'
															name='type'
															id='Enterprise'
															value='Enterprise'
															onClick={
																handleTypeChange
															}
															className='mr-1 appearance-none'
														/>
														<label
															htmlFor='Enterprise'
															className={`flex items-center  px-2 py-1  rounded-lg bg-gray-100 border border-gray-300  cursor-pointer ${
																type ===
																'Enterprise'
																	? ' bg-slate-800 text-slate-50'
																	: ' bg-gray-50 text-gray-500'
															}`}>
															Enterprise
														</label>
													</div>
												</div>
											</div>
										</div>

										<div className='mb-4'>
											<label
												className='block mb-2 font-bold text-gray-700'
												htmlFor='picture'>
												Image
											</label>

											<div className='relative flex items-center justify-between gap-8 '>
											{imagePath ? (
													<Image
														src={
															imagePath.indexOf(
																'data'
															) !=
															-1
																? imagePath
																: `${PUBLIC_URL}${imagePath}`
														}
														alt='Boisson'
														className='object-cover w-full h-48 rounded'
														height={
															300
														}
														width={
															300
														}
													/>
												) : (
													<div className='w-48 h-48 bg-gray-200 rounded' />
												)}
												<input
													id='image'
													type='file'
													className='absolute inset-0 opacity-0 cursor-pointer'
													accept='.jpg, .jpeg, .png'
													onChange={
														handleImageChange
													}
												/>
												<button
													className={`px-4 py-2 text-dark-gray ${
														selectedFile
															? 'bg-scrollbarThumb text-white'
															: 'bg-gray-200'
													}  rounded hover:bg-blue-600 focus:outline-none`}>
													Sélectionner un
													image
												</button>
											</div>
										</div>
									</form>
								</div>

								<div className='flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200'>
									<button
										className='px-6 py-3 mb-1 mr-1 text-sm font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-dark-grey hover:shadow-lg focus:outline-none'
										type='button'
										onClick={handleSubmit}>
										Sauvegarder
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
