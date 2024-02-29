import LottieView from 'lottie-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function SignUpScreen({ setToken }) {
	const navigation = useNavigation();

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [description, setDescription] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [error, setError] = useState('');
	const [hidep1, setHidep1] = useState(true);
	const [hidep2, setHidep2] = useState(true);
	const [loading, setLoading] = useState(false);

	const handleSignUp = async () => {
		setLoading(true);
		if (password !== password2) {
			setError('Passwords must be the same !');
		}
		if (!description) {
			setError('let to us a little description ...');
		}
		if (!password) {
			setError('you forget the password !');
		}
		if (!email) {
			setError('email is required !');
		}
		if (!username) {
			setError('username is required !');
		}

		if (
			email !== '' &&
			password !== '' &&
			username !== '' &&
			description !== '' &&
			password === password2
		) {
			try {
				const response = await axios.post(
					'https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up',
					{
						email: email,
						password: password,
						username: username,
						description: description,
					}
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
			enableOnAndroid={true}
			enableAutomaticScroll={true}
			extraHeight={Platform.select({ ios: 130, android: 200 })}
			keyboardShouldPersistTaps="handled"
		>
			{loading ? (
				<View className="flex h-screen flex-1 justify-center items-center">
					<LottieView
						className="h-40 w-40"
						source={require('../assets/animation.json')}
						autoPlay
						loop
					/>
				</View>
			) : (
				<View className="flex flex-1 h-screen justify-around items-center px-8">
					<View className="flex justify-center items-center">
						<Image
							className="h-20 w-20 my-4  "
							source={require('../assets/logo.png')}
						/>
						<Text className="text-center font-bold text-2xl text-gray-500">
							Sign Up
						</Text>
					</View>
					<View className="w-full gap-3">
						<TextInput
							className="h-10 border-b-2 border-red-300  text-xl"
							onChangeText={(text) => {
								setEmail(text);
								setError('');
							}}
							placeholder="email"
							value={email}
							editable={true}
							blurOnSubmit={true}
						/>
						<TextInput
							className="h-10  border-b-2  border-red-300 my-4 text-xl"
							onChangeText={(text) => {
								setError('');
								setUsername(text);
							}}
							placeholder="username"
							value={username}
						/>
						<TextInput
							className="h-28  border-2  border-red-300 my-4 text-xl "
							onChangeText={(text) => {
								setError('');
								setDescription(text);
							}}
							placeholder="Describe yourself in a few words..."
							value={description}
							multiline={true}
							numberOfLines={4}
							textAlignVertical="top"
							maxLength={150}
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

						<View className="relative ">
							<TextInput
								className="w-full h-10  border-b-2  border-red-300  text-xl"
								onChangeText={(text) => {
									setError('');
									setPassword2(text);
								}}
								placeholder="confirm password"
								secureTextEntry={hidep2 ? true : false}
								value={password2}
							/>
							<TouchableOpacity
								onPress={() => {
									setHidep2((prev) => !prev);
								}}
								className={`${
									hidep2 && 'hidden'
								} absolute right-2 transform top-1/4 `}
							>
								<FontAwesome name="eye" size={24} color="gray" />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									setHidep2((prev) => !prev);
								}}
								className={`${
									!hidep2 && 'hidden'
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
							className="border-4 border-red-500 py-4 px-12 rounded-full "
							onPress={handleSignUp}
						>
							<Text className="text-xl">Sign Up</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								navigation.navigate('SignIn');
							}}
						>
							<Text className="text-gray-500 py-4">No account ? Register</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</KeyboardAwareScrollView>
	);
}
