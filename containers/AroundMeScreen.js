import { Text, View, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { coordsList } from '../utils/coords';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';

export default function AroundMeScreen() {
	const navigation = useNavigation();
	const [userCoords, setUserCoords] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=48.85&longitude=2.33'
				);
				console.log('around>>>', JSON.stringify(response.data, null, 2));
				setData(response.data);
			} catch (error) {
				console.log('catch app 1>>>', error);
			}
		};
		fetchData();
		const getPermission = async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status === 'granted') {
				const { coords } = await Location.getCurrentPositionAsync();
				setUserCoords({
					latitude: coords.latitude,
					longitude: coords.longitude,
				});
			} else {
				alert('Accès refusé');
			}
			setIsLoading(false);
		};
		getPermission();
	}, []);

	return isLoading ? (
		<View className="flex-1 justify-center items-center">
			<LottieView
				className="h-40 w-40"
				source={require('../assets/animation.json')}
				autoPlay
				loop
			/>
		</View>
	) : (
		<View className="flex justify-center">
			<MapView
				className="h-screen"
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: userCoords.latitude,
					longitude: userCoords.longitude,
					latitudeDelta: 0.2,
					longitudeDelta: 0.2,
				}}
				showsUserLocation
			>
				{data.map((item) => {
					return (
						<Marker
							key={item._id}
							coordinate={{
								latitude: item.location[1],
								longitude: item.location[0],
							}}
							onPress={() => {
								navigation.navigate('Room', {
									id: item._id,
								});
							}}
						/>
					);
				})}
			</MapView>
		</View>
	);
}
