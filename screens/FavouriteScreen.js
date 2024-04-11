import { View, Dimensions, Platform, StyleSheet, Image,Text } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import CoffeeCard from '../components/coffeeCard';
import Navbar from '../components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavouriteItems } from '../redux/slice/favouriteSlice';
import { SafeAreaView } from "react-native-safe-area-context";


const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function FavouriteScreen() {
    const favourites = useSelector(selectFavouriteItems)
    console.log('favss' ,favourites)

	return (
        <View className="flex flex-1 bg-white">
            <Image 
				source={require('../assets/images/beansBackground1.png')} 
				style={{height: height*0.2}} 
				className="w-full absolute -top-5 opacity-10" />
            <Navbar screenName={"My Favourites"}/>
            <SafeAreaView style={styles.container}>
                {favourites.length > 0 ? 
                (<FavScreen favourites={favourites}/>) :
                (<EmptyFavScreen/>)}
            </SafeAreaView>
        </View>
	)
}

const EmptyFavScreen = () => {
    return (
        <View style={{ 'alignItems': 'center', marginTop: 100 }}>
            <Image source={require('../assets/images/no-item-found.jpg') } className="h-40 w-40"/>
            <Text className="font-bold text-xl">No Favourites Found!!!</Text>
        </View>
    )
}

const FavScreen = ({favourites}) => {
    return (
    <View className={`overflow-visible flex justify-center flex-1 ${ios ? 'mt-10' : ''}`}>
        <View>
            <Carousel
                containerCustomStyle={{ overflow: 'visible' }}
                data={favourites}
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
    )
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})