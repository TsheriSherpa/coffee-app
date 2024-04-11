import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { Platform, View, Dimensions, Image, Text } from 'react-native';
import ProductScreen from '../screens/ProductScreen';
import { themeColors } from '../theme';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid } from 'react-native-heroicons/solid';
import { logout, selectDisplayName, selectIsLoggedIn } from '../redux/slice/authSlice';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { useDispatch, useSelector } from 'react-redux';
import CartScreen from '../screens/CartScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import CheckoutCompleteScreen from '../screens/CheckoutCompleteScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform.OS == 'ios';

export default function AppNavigation() {
	const isLoggedIn = useSelector(selectIsLoggedIn)

	return (
		<NavigationContainer>
			{/* <AuthStack /> */}
			{isLoggedIn ? (<AppStack isLoggedIn={isLoggedIn} />) : (<AuthStack />)}
		</NavigationContainer>
	)
}

function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
			<Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
			<Stack.Screen name="AppStack" options={{ headerShown: false }} component={AppStack} />
		</Stack.Navigator>
	)
}

function AppStack({ isLoggedIn }) {
	const navigation = useNavigation();
	if (!isLoggedIn) {
		navigation.navigate("Login")
	}

	return (
		<Stack.Navigator screenOptions={{
			contentStyle: { backgroundColor: 'white' }
		}}>
			<Stack.Screen name="DrawerNav" options={{ headerShown: false }} component={DrawerNavigation} />
			<Stack.Screen name="Product" options={{ headerShown: false }} component={ProductScreen} />
			<Stack.Screen name="Cart" options={{ headerShown: false }} component={CartScreen} />
			<Stack.Screen name="Checkout" options={{ headerShown: false }} component={CheckoutCompleteScreen} />

		</Stack.Navigator>
	)
}

function HomeTabs() {
	return (
		<Tab.Navigator screenOptions={({ route }) => ({
			headerShown: false,
			tabBarShowLabel: false,
			tabBarHideOnKeyboard: true,
			tabBarIcon: ({ focused }) => menuIcons(route, focused),
			tabBarStyle: {
				marginBottom: 10,
				height: 65,
				alignItems: 'center',
				borderRadius: 100,
				marginHorizontal: 20,
				backgroundColor: themeColors.bgLight,

			},
			tabBarItemStyle: {
				marginTop: ios ? 30 : 0,

			}
		})}

		>
			<Tab.Screen name="home" component={HomeScreen} />
			<Tab.Screen name="favourite" component={FavouriteScreen} />
			<Tab.Screen name="cart" component={CartScreen} />
		</Tab.Navigator>
	)
}

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
	return (
		<Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
			<Drawer.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
		</Drawer.Navigator>

	);
}

const CustomDrawerContent = (props) => {
	const { navigation } = props;
	const dispatch = useDispatch();
	const { width, height } = Dimensions.get('window');
	const displayName = useSelector(selectDisplayName) ?? ''

	const handleLogout = () => {
		dispatch(logout())
		navigation.navigate('Login');
	};

	return (
		<DrawerContentScrollView {...props} >
			<Image
				source={require('../assets/images/beansBackground1.png')}
				style={{ height: height * 0.2 }}
				className="w-full absolute -top-5 opacity-10" />
			<View style={{ alignItems: 'center' }}>
				<Image source={require('../assets/images/user.png')}
					resizeMethod="resize"
					resizeMode="contain"
					style={{ flex: 1, alignSelf: "center", width: 80, height: 76, }}
				/>
				<Text style={{ fontWeight: 'bold' }}>{displayName}</Text>
			</View>
			<DrawerItemList {...props} />
			<DrawerItem label="Logout" onPress={handleLogout} />
		</DrawerContentScrollView>
	);
};

const menuIcons = (route, focused) => {
	let icon;

	if (route.name === 'home' || route.name === "Home") {
		icon = focused ? <HomeSolid size={30} color='white' /> : <HomeOutline size={30} strokeWidth={2} color="white" />;
	} else if (route.name === 'favourite') {
		icon = focused ? <HeartSolid size={30} color='white' /> : <HeartOutline size={30} strokeWidth={2} color="white" />;
	} else if (route.name === 'cart') {
		icon = focused ? <BagSolid size={30} color='white' /> : <BagOutline size={30} strokeWidth={2} color="white" />;
	}

	const buttonStyle = focused ? { backgroundColor: 'white' } : {};
	const shadowStyle = focused ? { shadowColor: 'black', shadowRadius: 5, shadowOpacity: 0.5 } : {};

	return (
		<View style={[{ alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25 }, shadowStyle]}>
			{icon}
		</View>
	);
};
