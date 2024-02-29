import LottieView from 'lottie-react-native';
import {
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
	FlatList,
	Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import numberOfStars from '../utils/NumberOfStars';

const HomeScreen = () => {
	const navigation = useNavigation();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms'
				);
				console.log('home>>>', response.data[3]);
				setData(response.data);
			} catch (error) {
				console.log('catch app>>>', error);
			}
		};
		fetchData();
		setLoading(false);
	}, []);

	return loading ? (
		<View className="flex-1 justify-center items-center">
			<LottieView
				className="h-40 w-40"
				source={require('../assets/animation.json')}
				autoPlay
				loop
			/>
		</View>
	) : (
		<View className="justify-between items-center flex-1  ">
			<View className="w-11/12">
				<View className="h-[2] bg-slate-200 " />
				<FlatList
					className="h-full"
					data={data}
					keyExtractor={(item) => String(item._id)}
					scrollEnabled={true}
					scrollToOverflowEnabled={true}
					ItemSeparatorComponent={<View className="h-[2] bg-slate-200 my-2" />}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('Room', {
									id: item._id,
									photos: item.photos,
									profil: item.user.account.photo.url,
								});
							}}
						>
							<View>
								<View className="relative">
									<Image
										className="h-[180] w-full my-2 "
										source={{ uri: item.photos[0].url }}
									/>
									<Text className="absolute top-2/3 p-3 bg-black text-white">
										{item.price} €
									</Text>
								</View>

								<View className="flex-row justify-center items-center">
									<View className="flex-col flex justify-around h-20 flex-1">
										<Text
											className="font-bold text-xl w-full"
											ellipsizeMode="tail"
											numberOfLines={1}
										>
											{item.title}
										</Text>
										<View className="flex-row items-center ">
											<Text>{numberOfStars(item.ratingValue)}</Text>
											<Text className="px-2 text-gray-400">
												{item.reviews} reviews
											</Text>
										</View>
									</View>
									<Image
										className="h-20 w-20 my-4 rounded-full "
										source={{ uri: item.user.account.photo.url }}
									/>
								</View>
							</View>
						</TouchableOpacity>
					)}
				></FlatList>
			</View>
		</View>
	);
};

export default HomeScreen;
