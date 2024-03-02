import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';
import { useRoute } from '@react-navigation/core';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import numberOfStars from '../utils/NumberOfStars';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function ProfileScreen() {
	const { params } = useRoute();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	const carousel = () => {
		const array = [];
		for (let i = 0; i < params.photos.length; i++) {
			array.push(
				<Image
					key={params.photos[i]._id}
					className="h-[180] w-full my-2 "
					source={{ uri: params.photos[i].url }}
				/>
			);
		}
		return array;
	};

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const response2 = await axios.get(
					`https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${params.id}`
				);
				console.log('response2>>>', JSON.stringify(response2.data, null, 2));
				const result = response2.data;
				setData(result);
			} catch (error) {
				console.log('catch app>>>', error);
			}
		};
		fetchData();
		setLoading(false);
	}, []);

	return loading || !data.location ? (
		<View className="flex h-screen flex-1 justify-center items-center">
			<LottieView
				className="h-40 w-40"
				source={require('../assets/animation.json')}
				autoPlay
				loop
			/>
		</View>
	) : (
		<View className="items-center  h-full ">
			<View className="w-11/12  items-center h-full  ">
				<View>
					<View className="relative h-[180]">
						<Swiper>{carousel()}</Swiper>
						<Text className="absolute top-2/3 p-3 bg-black text-white">
							{data.price} €
						</Text>
					</View>

					<View className="flex-row items-center ">
						<View className="flex-1 h-20 justify-around">
							<Text
								className="font-bold text-xl w-full "
								ellipsizeMode="tail"
								numberOfLines={1}
							>
								{data.title}
							</Text>
							<View className="flex-row">
								<Text>{numberOfStars(data.ratingValue)}</Text>
								<Text className="px-2 text-gray-400">
									{data.reviews} reviews
								</Text>
							</View>
						</View>

						<Image
							className="h-20 w-20 my-4 rounded-full "
							source={{ uri: params.profil }}
						/>
					</View>
					<View>
						<Text> {data.description}</Text>
					</View>
					<View>
						<View className="rounded-xl border border-red-400 overflow-hidden ">
							<MapView
								className="w-full h-64 "
								provider={PROVIDER_GOOGLE}
								initialRegion={{
									latitude: 48.8480923,
									longitude: 2.3215788,
									latitudeDelta: 0.2,
									longitudeDelta: 0.2,
								}}
							>
								<Marker
									coordinate={{
										latitude: data.location[1],
										longitude: data.location[0],
									}}
								/>
							</MapView>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
