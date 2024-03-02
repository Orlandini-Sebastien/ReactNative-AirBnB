import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from './containers/HomeScreen';

import SignInScreen from './containers/SignInScreen';
import SignUpScreen from './containers/SignUpScreen';
import SettingsScreen from './containers/SettingsScreen';
import RoomScreen from './containers/RoomScreen';
import BtnGoBack from './components/BtnGoBack';
import SplashScreen from './containers/SplashScreen';
import Logo from './components/Logo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [userToken, setUserToken] = useState(null);

	const setToken = async (token) => {
		if (token) {
			await AsyncStorage.setItem('userToken', token);
		} else {
			await AsyncStorage.removeItem('userToken');
		}

		setUserToken(token);
	};

	useEffect(() => {
		const bootstrapAsync = async () => {
			const userToken = await AsyncStorage.getItem('userToken'); // token ou null
			setUserToken(userToken);
			setIsLoading(false);
		};

		bootstrapAsync();
	}, []);

	if (isLoading === true) {
		return null;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{userToken === null ? (
					// No token found, user isn't signed in
					<>
						<Stack.Screen options={{ headerShown: false }} name="SignIn">
							{() => <SignInScreen setToken={setToken} />}
						</Stack.Screen>
						<Stack.Screen options={{ headerShown: false }} name="SignUp">
							{() => <SignUpScreen setToken={setToken} />}
						</Stack.Screen>
					</>
				) : (
					// User is signed in ! 🎉
					<Stack.Screen name="Tab" options={{ headerShown: false }}>
						{() => (
							<Tab.Navigator
								screenOptions={{
									headerShown: false,
									tabBarActiveTintColor: 'tomato',
									tabBarInactiveTintColor: 'gray',
								}}
							>
								<Tab.Screen
									name="TabHome"
									options={{
										tabBarLabel: 'Home',
										tabBarIcon: ({ color, size }) => (
											<Ionicons name={'home'} size={size} color={color} />
										),
									}}
								>
									{() => (
										<Stack.Navigator>
											<Stack.Screen
												name="Home"
												options={{
													headerTitleAlign: 'center',
													title: '',
													headerTintColor: 'red',

													headerTitle: () => <Logo />,
												}}
											>
												{() => <HomeScreen />}
											</Stack.Screen>

											<Stack.Screen
												name="Room"
												options={{
													headerTitleAlign: 'center',
													headerTitle: () => <Logo />,
													headerLeft: null,
												}}
											>
												{() => <RoomScreen />}
											</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>

								<Tab.Screen
									name="TabProfil"
									options={{
										tabBarLabel: 'My Profil',
										tabBarIcon: ({ color, size }) => (
											<AntDesign name={'user'} size={size} color={color} />
										),
									}}
								>
									{() => (
										<Stack.Navigator>
											<Stack.Screen
												name="Profil"
												options={{
													title: 'Profil',
												}}
											>
												{() => <ProfileScreen setToken={setToken} />}
											</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>

								<Tab.Screen
									name="TabSettings"
									options={{
										tabBarLabel: 'Settings',
										tabBarIcon: ({ color, size }) => (
											<Ionicons name={'settings'} size={size} color={color} />
										),
									}}
								>
									{() => (
										<Stack.Navigator>
											<Stack.Screen
												name="Settings"
												options={{
													title: 'Settings',
												}}
											>
												{() => <SettingsScreen setToken={setToken} />}
											</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>
							</Tab.Navigator>
						)}
					</Stack.Screen>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
