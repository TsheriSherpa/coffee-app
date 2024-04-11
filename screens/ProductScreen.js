import { View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline';
import { HeartIcon, StarIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { ShoppingBag } from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/slice/cartSlice';
import { selectIsFavourite, saveFavourites, deleteFavorite } from '../redux/slice/favouriteSlice';
import Toast from 'react-native-toast-message';
import { selectLoggedInUser } from '../redux/slice/authSlice';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';


export default function ProductScreen(props) {
	const item = props.route.params;
	const [size, setSize] = useState('small');
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const favourite = useSelector(state => selectIsFavourite(state, item))
	const user = useSelector(selectLoggedInUser)

	const handleFavClick = () => {
		if (favourite) {
			dispatch(deleteFavorite({user: user, item: item}))
		} else {
			dispatch(saveFavourites({user: user, item: item}))
			// dispatch(addToFavourite(item))
		}
	}

	const handleAddToCart = (item) => {
		dispatch(addItem(item))
		Toast.show({
			type: 'success',
			text1: 'Success',
			autoHide: 'true',
			text2: 'Item added to cart successfully ❤️',
			position: 'top',
		});
	}

	return (
		<View className="flex-1">
			<StatusBar style="light" />
			<Image
				source={require('../assets/images/beansBackground2.png')}
				style={{ height: 300, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
				className="w-full absolute" />
			<SafeAreaView className="space-y-4">
				<View className="mx-4 flex-row justify-between items-center">
					<TouchableOpacity className=" rounded-full " onPress={() => navigation.goBack()}>
						<ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => handleFavClick(item)}
						className="rounded-full border-2 border-white p-2">
						<HeartIcon size="24" color={favourite ? "red" : "white"} />
					</TouchableOpacity>
				</View>
				<View
					style={{
						shadowColor: themeColors.bgDark,
						shadowRadius: 30,
						shadowOffset: { width: 0, height: 30 },
						shadowOpacity: 0.9,
					}}
					className="flex-row justify-center">
					<Image source={item.image} className="h-60 w-60" style={{ marginTop: ios ? 0 : 40 }} />
				</View>
				<View
					style={{ backgroundColor: themeColors.bgLight }}
					className="flex-row justify-center items-center mx-4 rounded-3xl p-1 px-2 space-x-1 opacity-90 w-16">
					<StarIcon size="15" color="white" />
					<Text className="text-base font-semibold text-white">{item.stars}</Text>
				</View>
				<View className="px-4 flex-row justify-between items-center">
					<Text style={{ color: themeColors.text }} className="text-3xl font-semibold">
						{item.name}
					</Text>
					<Text style={{ color: themeColors.text }} className="text-lg font-semibold">
						$ {item.price}
					</Text>

				</View>
				<View className="px-4 space-y-2">
					<Text style={{ color: themeColors.text }} className="text-lg font-bold">Coffee size</Text>
					<View className="flex-row justify-between">
						<TouchableOpacity
							onPress={() => setSize('small')}
							style={{ backgroundColor: size == 'small' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
							className="p-3 px-8 rounded-full">
							<Text className={size == 'small' ? "text-white" : "text-gray-700"}>Small</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setSize('medium')}
							style={{ backgroundColor: size == 'medium' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
							className="p-3 px-8 rounded-full">
							<Text className={size == 'medium' ? "text-white" : "text-gray-700"}>Medium</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setSize('large')}
							style={{ backgroundColor: size == 'large' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
							className="p-3 px-8 rounded-full">
							<Text className={size == 'large' ? "text-white" : "text-gray-700"}>Large</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View className="px-4 space-y-2">
					<Text style={{ color: themeColors.text }} className="text-lg font-bold">About</Text>
					<Text className="text-gray-600">
						{item.desc}
					</Text>
				</View>
			</SafeAreaView>

			<View className={`space-y-3 ${ios ? 'mb-6' : 'mb-3'}`}>
				{/* buy now button */}
				<View className="flex-row items-center p-1">
					<TouchableOpacity 
						onPress={() => navigation.navigate("cart")}
						className="p-4 m-2 rounded-full border border-gray-400">
						<ShoppingBag size="30" color="gray" />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => handleAddToCart(item)}
						style={{ backgroundColor: themeColors.bgLight }}
						className="p-4 rounded-full flex-1 m-2">
						<Text className="text-center text-white text-base font-semibold">Add To Cart</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}