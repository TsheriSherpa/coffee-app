import { View, Text, Image, TouchableOpacity, Dimensions, Platform, StyleSheet } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { StarIcon, HeartIcon } from 'react-native-heroicons/solid';
import { PlusIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import { saveFavourites, deleteFavorite, selectIsFavourite } from '../redux/slice/favouriteSlice';
import { addItem } from '../redux/slice/cartSlice';
import Toast from 'react-native-toast-message';
import { selectLoggedInUser } from '../redux/slice/authSlice';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';


export default function CoffeeCard({ item }) {
	const { navigate } = useNavigation();
	const dispatch = useDispatch()
	const user = useSelector(selectLoggedInUser)


	const isFavourite = useSelector(state => selectIsFavourite(state, item));

	const handleFavTap = (item) => {
		if (isFavourite) {
			dispatch(deleteFavorite({user: user, item: item}))
		} else {
			dispatch(saveFavourites({user: user, item: item}))
		}

		Toast.show({
			type: 'success',
			text1: 'Success',
			autoHide: 'true',
			text2: 'Successfully Favourited ',
			position: 'top',
		});
	}

	const handleAddToCart = (item) => {
		console.log('adding', item)
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
		<TouchableOpacity
			onPress={() => navigate('Product', { ...item })}
			style={{
				shadowColor: 'black',
				shadowRadius: 40,
				shadowOffset: { width: -20, height: -10 },
				shadowOpacity: 1,
			}}>
			<View
				style={{
					borderRadius: 40,
					backgroundColor: themeColors.bgDark,
					height: ios ? height * 0.4 : height * 0.50,
					width: width * 0.65,
				}}
			>
				<TouchableOpacity style={styles.favoriteButton} onPress={() => handleFavTap(item)}>
					<HeartIcon size="24" color={isFavourite ? 'red' : 'white'} />
				</TouchableOpacity>
				<View
					style={{
						shadowColor: 'black',
						shadowRadius: 30,
						shadowOffset: { width: 0, height: 40 },
						shadowOpacity: 0.8,
						marginTop: ios ? -(height * 0.08) : 15,
					}}
					className="flex-row justify-center">
					<Image
						source={item?.image}
						className="h-40 w-40"
					/>
				</View>

				<View className={`px-5 flex-1 justify-between ${ios ? 'mt-5' : ''}`}>
					<View className="space-y-3 mt-3">
						<Text className="text-3xl text-white font-semibold z-10">
							{item.name}
						</Text>
						<View style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
							className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 w-16">
							<StarIcon size="15" color="white" />
							<Text className="text-base font-semibold text-white">{item.stars}</Text>
						</View>
						<View className="flex-row space-x-1 z-10 mb-6">
							<Text className="text-base text-white font-semibold opacity-60">
								Volume
							</Text>
							<Text className="text-base text-white font-semibold"> {item.volume}</Text>
						</View>
					</View>

					<View style={{
						backgroundColor: ios ? themeColors.bgDark : 'transparent',
						shadowColor: themeColors.bgDark,
						shadowRadius: 25,
						shadowOffset: { width: 0, height: 40 },
						shadowOpacity: 0.8,
						marginTop: -10
					}} className="flex-row justify-between items-center mb-5">
						<Text className="text-white font-bold text-lg">$ {item.price}</Text>
						<TouchableOpacity
							onPress={() => { handleAddToCart(item) }}
							style={{
								shadowColor: 'black',
								shadowRadius: 40,
								shadowOffset: { width: -20, height: -10 },
								shadowOpacity: 1,
							}} className="p-4 bg-white rounded-full">
							<PlusIcon size="20" strokeWidth={2} color={themeColors.bgDark} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</TouchableOpacity>

	)
}

const styles = StyleSheet.create({
	favoriteButton: {
		position: 'absolute',
		top: 10,
		right: 15,
		zIndex: 1,
		padding: 5,
		borderRadius: 50,
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
	},
})