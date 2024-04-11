import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, emptyCart, selectCartTotalPrice, saveOrderDetails } from '../redux/slice/cartSlice';
import Navbar from '../components/navbar';
import CartItem from "../components/cartItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthToDp } from "rn-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { selectLoggedInUser } from '../redux/slice/authSlice';

const { width, height } = Dimensions.get('window');

const CartScreen = () => {
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotalPrice)
    const {navigate} = useNavigation()
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)
    console.log('user', user)

    const handleCheckout = () => {
        dispatch(saveOrderDetails({'user' : user, 'orderDetails': {'total': total, 'items': cartItems, 'currency': 'CAD', 'discount': 0}}))
        dispatch(emptyCart())
        navigate('Checkout')
    }

    return (
        <View style={styles.superContainer} className="bg-white"> 
            <Image 
				source={require('../assets/images/beansBackground1.png')} 
				style={{height: height*0.2}} 
				className="w-full absolute -top-5 opacity-10" />
            <Navbar screenName={"Cart"}/>
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, backgroundColor: 'white' }}> 
                    {cartItems.length > 0 ? 
                        (<CartView total={total} handleCheckout={handleCheckout} cartItems={cartItems}/>) :
                        (<EmptyCartView/>)}
                </View>
            </SafeAreaView>
        </View>
    );
}

const CartView = ({total, handleCheckout, cartItems}) => {
    return (
        <View className="flex-1">
            <ScrollView style={styles.container} className="">
                    {cartItems?.map((product) => (
                <CartItem key={product.id} product={product} />
            ))}
            </ScrollView>
            <View style={styles.checkoutContainer}>
                <View style={styles.row}>
                    <Text style={styles.cartTotalText}>Items</Text>
                    <Text
                        style={[
                            styles.cartTotalText,
                            {
                                color: "#4C4C4C",
                            },
                        ]}
                    >
                        ${total}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cartTotalText}>Discount</Text>
                    <Text
                        style={[
                            styles.cartTotalText,
                            {
                                color: "#4C4C4C",
                            },
                        ]}
                    >
                        - ${0}
                    </Text>
                </View>
                <View style={[styles.row, styles.total]}>
                    <Text style={styles.cartTotalText}>Total</Text>
                    <Text
                        style={[
                            styles.cartTotalText,
                            {
                                color: "#4C4C4C",
                            },
                        ]}
                    >
                        ${total}
                    </Text>
                </View>
                <View>
                    {/* A button to navigate to checkout screen */}
                    <TouchableOpacity style={styles.button} onPress={() => handleCheckout()}>
                        <Text style={styles.textLogin}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const EmptyCartView = () => {
    return (
        <View style={{ 'alignItems': 'center', marginTop: 100 }}>
            <Image source={require('../assets/images/no-item-found.jpg') } className="h-40 w-40"/>
            <Text className="font-bold text-xl">No Items in the cart!!!</Text>
        </View>
    )
}

// Styles....
const styles = StyleSheet.create({
    superContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 5,
        paddingTop: 0
    },
    checkoutContainer: {
        height: 250,
        padding: 20,
        marginBottom: 10,
        backgroundColor: themeColors.bgLight,
        borderTopLeftRadius: 20, // Adjust the radius values as needed
        borderTopRightRadius: 20, // Adjust the radius values as needed
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: widthToDp(90),
        marginTop: 10,
    },
    total: {
        borderTopWidth: 1,
        paddingTop: 10,
        borderTopColor: "#E5E5E5",
    },
    cartTotalText: {
        fontSize: widthToDp(4.5),
        color: "black",
        fontWeight: 'bold'
    },
    button: {
		backgroundColor: '#f57c00',
		height: 50,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
    textLogin: { 
		fontWeight: 'bold', 
		color: '#fff', 
		fontSize: 18 
	},
});

export default CartScreen;
