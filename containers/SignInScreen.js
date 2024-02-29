import LottieView from 'lottie-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Image,
	Platform,
	ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignInScreen({ setToken }) {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [hidep1, setHidep1] = useState(true);
	const [loading, setLoading] = useState(false);

	const handleSignIn = async () => {
		setLoading(true);
		if (!password) {
			setError('you forget the password !');
		}
		if (!email) {
			setError('email is required !');
		}

		if (email !== '' && password !== '') {
			try {
				const response = await axios.post(
					'https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in',
					{ email: email, password: password }
				);

				const token = response.data.token;
				const userToken = token;
				setToken(userToken);
				alert('!! connected !!');
			} catch (error) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
			}
		}
		setLoading(false);
	};

	return (
		<KeyboardAwareScrollView
			className="flex-1 flex"
			contentContainerStyle="flex-grow flex-1 "
			enableOnAndroid={true}
			enableAutomaticScroll={true}
			extraHeight={Platform.select({ ios: 130, android: 200 })}
			keyboardShouldPersistTaps="handled"
		>
			{loading ? (
				<View className="flex flex-1 h-screen justify-center items-center">
					<LottieView
						className="h-40 w-40"
						source={require('../assets/animation.json')}
						autoPlay
						loop
					/>
				</View>
			) : (
				<View className="flex flex-1 h-screen justify-around items-center">
					<View className="flex justify-center items-center">
						<Image
							className="h-20 w-20 my-4 "
							source={require('../assets/logo.png')}
						/>
						<Text className="text-center font-bold text-2xl text-gray-500">
							Sign In
						</Text>
					</View>
					<View className="w-full px-8">
						<TextInput
							className="h-10 border-b-2 border-red-300 my-4 text-xl"
							onChangeText={(text) => {
								setEmail(text);
								setError('');
							}}
							placeholder="email"
							value={email}
							editable={true}
							blurOnSubmit={true}
						/>
						<View className="relative ">
							<TextInput
								className="w-full h-10  border-b-2  border-red-300  text-xl"
								onChangeText={(text) => {
									setError('');
									setPassword(text);
								}}
								placeholder="password"
								secureTextEntry={hidep1 ? true : false}
								value={password}
							/>
							<TouchableOpacity
								onPress={() => {
									setHidep1((prev) => !prev);
								}}
								className={`${
									hidep1 && 'hidden'
								} absolute right-2 transform top-1/4 `}
							>
								<FontAwesome name="eye" size={24} color="gray" />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									setHidep1((prev) => !prev);
								}}
								className={`${
									!hidep1 && 'hidden'
								} absolute right-2 transform top-1/4 `}
							>
								<FontAwesome name="eye-slash" size={24} color="gray" />
							</TouchableOpacity>
						</View>
						<View className="flex justify-center items-center">
							<Text className="text-red-500 text-xl">{error}</Text>
						</View>
					</View>
					<View className="flex justify-center items-center">
						<TouchableOpacity
							disabled={loading}
							className="border-4 border-red-500 py-4 px-12 rounded-full my-4"
							onPress={handleSignIn}
						>
							<Text className="text-xl">Sign In</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								navigation.navigate('SignUp');
							}}
						>
							<Text>No account ? Register</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</KeyboardAwareScrollView>
	);
}
