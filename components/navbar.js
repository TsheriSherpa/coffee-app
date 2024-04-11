
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { BellIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'

export default Navbar = ({ screenName }) => {
	const { width, height } = Dimensions.get('window');
	const ios = Platform.OS == 'ios';

	const navigation = useNavigation();

	const openDrawer = () => {
		navigation.openDrawer(); 
	};

	return (
		<View style={{ marginTop:10 }}>
			<SafeAreaView className={ios ? '-mb-8' : ''}>
				{/* avatar and bell icon */}
				<View className="mx-4 flex-row justify-between items-center">
					<TouchableOpacity onPress={openDrawer}>
						<Image source={require('../assets/images/avatar.png')}
							className="h-9 w-9 rounded-full" />
					</TouchableOpacity>

					<View className="flex-row items-center space-x-2">
						<Text className="font-bold text-xl">
							{screenName}
						</Text>
					</View>
					{/* <TouchableOpacity onPress={() => handleProfileClick()}> */}
					{/* <BellIcon size="27" color="black" />
					</TouchableOpacity> */}
				</View>
			</SafeAreaView>
		</View>
	);
}