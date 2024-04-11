import { View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline';
import { HeartIcon, StarIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';


const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';


export default function CheckoutCompleteScreen(props) {
	const navigation = useNavigation();

	return (
        // <TouchableOpacity
		// 	onPress={() => navigate('Checkout', { ...item })}
		// 	style={{
        //         flex: 1
		// 	}}>
		<View className="flex-1">
			<StatusBar style="light" />
            <Image 
				source={require('../assets/images/beansBackground1.png')} 
				style={{height: height*0.2}} 
				className="w-full absolute -top-5 opacity-10" />
            <SafeAreaView className="space-y-4">
                <View className="mx-4 flex-row justify-between items-center">
                    <TouchableOpacity className=" rounded-full " onPress={() => navigation.goBack()}>
                        <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="green" />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center', marginTop: 200 }} >
                    <Image 
                    style={{ height: 250, width: 250, marginTop:100}}
                        source={require('../assets/images/order-success.jpeg')} 
                        className="w-full" />
                    <Text style={{ fontSize:20, fontWeight: 'bold' }}>Order Successfull</Text>
                    <Text style={{ fontSize: 18 }}>Thankyou for choosing us.</Text>
                </View>
                <View className={`space-y-3 ${ios ? 'mb-6' : 'mb-3'}`}>
                    <View className="flex-row items-center p-1 mt-10">
                        <TouchableOpacity
                            onPress={() => navigation.navigate("home")}
                            style={{ backgroundColor: themeColors.bgLight }}
                            className="p-4 rounded-full flex-1 m-2">
                            <Text className="text-center text-white text-base font-semibold">Return Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
		</View>
        // </TouchableOpacity>
	)
}