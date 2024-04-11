import { View, Dimensions, Platform, TouchableOpacity, Text, Image, FlatList, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeColors } from '../theme';
import { StatusBar } from 'expo-status-bar';
import Carousel from 'react-native-snap-carousel';
import CoffeeCard from '../components/coffeeCard';
import Navbar from '../components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import {changeDisplayItems, selectCoffeeCategories, selectCoffeeDisplayItems } from '../redux/slice/coffeeSlice';
import { fetchFavorites } from '../redux/slice/favouriteSlice';
import { selectLoggedInUser } from '../redux/slice/authSlice';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function HomeScreen() {
	const dispatch = useDispatch();
	const [activeCategory, setActiveCategory] = useState(0);
	const items = useSelector(selectCoffeeDisplayItems)
	const categories = useSelector(selectCoffeeCategories)
	const user = useSelector(selectLoggedInUser)


	useEffect(() => {
		dispatch(changeDisplayItems(activeCategory))
		dispatch(fetchFavorites(user))
	}, [activeCategory])

	return (
		<KeyboardAvoidingView behavior="padding" className="flex-1 relative bg-white">
			<StatusBar />
			<Image 
				source={require('../assets/images/beansBackground1.png')} 
				style={{height: height*0.2}} 
				className="w-full absolute -top-5 opacity-10" />
			<Navbar screenName={"CafMe"}/>
			{/* 
				TODO: SEARCH BAR IMPLEMENTATION
			 <View className="mx-5 shadow" style={{ marginTop: height * 0.06 }}>
				<View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
					<TextInput placeholder='Search' className="p-4 flex-1 font-semibold text-gray-700" />
					<TouchableOpacity
						className="rounded-full p-2"
						style={{ backgroundColor: themeColors.bgLight }}>
						<MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
					</TouchableOpacity>
				</View>
			</View> */}
			<View className="px-5 mt-8">
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={true}
					data={categories}
					keyExtractor={item => item.id}
					className="overflow-visible"
					renderItem={({ item }) => {
						isActive = item.id == activeCategory;
						let activeTextClass = isActive ? 'text-white' : 'text-gray-700';
						return (
							<TouchableOpacity
								onPress={() => setActiveCategory(item.id)}
								style={{ backgroundColor: isActive ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
								className="p-4 px-5 mr-2 rounded-full shadow">
								<Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
							</TouchableOpacity>
						)
					}}
				/>
			</View>
			{/* coffee cards */}
			<View className={`overflow-visible flex justify-center flex-1 ${ios ? 'mt-10' : ''}`}>
				<View>
					<Carousel
						containerCustomStyle={{ overflow: 'visible' }}
						data={items}
						renderItem={({ item }) => <CoffeeCard key={item.id} item={item}/>}
						firstItem={1}
						loop={false}
						inactiveSlideScale={0.75}
						inactiveSlideOpacity={0.75}
						sliderWidth={width}
						itemWidth={width * 0.63}
						slideStyle={{ display: 'flex', alignItems: 'center' }}
					/>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})