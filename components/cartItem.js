import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { heightToDp, widthToDp } from "rn-responsive-screen";
import { decreaseItemCount, increaseItemCount, removeItem, selectCartItemCount } from "../redux/slice/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import { MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';



export default function CartItem({ product }) {
    const dispatch = useDispatch();
    const {navigate} = useNavigation();
    const inCartCount = useSelector(state => selectCartItemCount(state, product));

    const handleRemoveFromCart = product => {   
        dispatch(removeItem(product));
        Toast.show({
			type: 'success',
			text1: 'Success',
			autoHide: 'true',
			text2: 'Item removed From cart successfully 🗑️',
			position: 'top',
		});
    };

    const handleIncrement = (product) => {
        dispatch(increaseItemCount(product));
    };

    const handleDecrement = (product) => {
        if (inCartCount > 1) {
            dispatch(decreaseItemCount(product));
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
				onPress={() => navigate('Product', { ...product })}
				style={{
					shadowColor: 'black',
					shadowRadius: 40,
					shadowOffset: { width: -20, height: -10 },
					shadowOpacity: 1,
				}}>
            <View>
                <Image source={product.image} style={styles.image} />
            </View>
            <View style={styles.info}>
                <View>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.description}>
                        Volume: {product.volume}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.price}>${product.price}</Text>
                    
                </View>
            </View>
            </TouchableOpacity>

            <View
                style={styles.quantityContainer}
                className="flex-row items-center space-x-4 border-gray-500 border rounded-full p-1 px-4">
                <TouchableOpacity
                    onPress={() => handleDecrement(product)}>
                    <MinusIcon size="20" strokeWidth={3} color={themeColors.text} />
                </TouchableOpacity>
                <Text style={{ color: themeColors.text }} className="font-extrabold text-lg">{inCartCount}</Text>
                <TouchableOpacity
                    onPress={() => handleIncrement(product)}>
                    <PlusIcon size="20" strokeWidth={3} color={themeColors.text} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleRemoveFromCart(product)} style={styles.removeButton}>
                <Icon name="remove" size={30}></Icon>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: "row",
        paddingBottom: 10,
        padding: 15,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: themeColors.bgLight,
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20
    },
    image: {
        width: 60,
        height: 65,
        borderRadius: 10,
    },
    title: {
        fontSize: widthToDp(4),
        fontWeight: "bold",
    },
    footer: {
        flexDirection: "row",
        // justifyContent: "space-between",
    },
    info: {
        marginLeft: widthToDp(3),
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: heightToDp(2),
        width: widthToDp(50),
    },
    description: {
        fontSize: widthToDp(3.5),
        color: "#8e8e93",
        marginTop: heightToDp(2),
    },

    price: {
        fontSize: widthToDp(4),
    },
    quantity: {
        fontSize: widthToDp(2),
    },

    quantityContainer: {
        position: 'absolute',
        right: 5,
        bottom: 10,
    },
    quantityButton: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityText: {
        fontSize: widthToDp(2),
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 15,
    },
});