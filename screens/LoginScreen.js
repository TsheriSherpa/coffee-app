import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
	Alert
} from "react-native";

import { useDispatch } from 'react-redux'
const backImage = require("../assets/backImage.png");
import { loginUser } from "../redux/slice/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { navigate } = useNavigation();
	const dispatch = useDispatch();

	const onHandleLogin = () => {
		if (isLoading) {
			return 
		}
		
		if (email !== "" && password !== "") {
			setIsLoading(true)

			dispatch(loginUser({ 'email': email, password: password }))
				.then(unwrapResult)
				.then((result) => {
					console.log(result)
					showToast(true, 'Login Success', 'Successfully logged in')
					navigate('DrawerNav')
				})
				.catch((error) => {
					console.log(error)
					showToast(false, 'Login Error', error)
				})
				.finally(() => {
					setIsLoading(false)
				})
		} else {
			showToast(false, 'Invalid Inputs', 'Please fill email and password')
		}
	};

	const showToast = (success, title, msg) => {
		Toast.show({
			type: success ? 'success' : 'error',
			text1: title,
			autoHide: 'true',
			text2: msg,
			position: 'top',
		});

	}

	return (
		<View style={styles.container}>
			<Image source={backImage} style={styles.backImage} />
			<View style={styles.whiteSheet} />
			<SafeAreaView style={styles.form}>
				<Text style={styles.title}>Log In</Text>
				<TextInput
					style={styles.input}
					placeholder="Enter email"
					autoCapitalize="none"
					keyboardType="email-address"
					textContentType="emailAddress"
					autoFocus={true}
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Enter password"
					autoCapitalize="none"
					autoCorrect={false}
					secureTextEntry={true}
					textContentType="password"
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>

				<TouchableOpacity style={styles.button} onPress={onHandleLogin}>
					<Text style={styles.textLogin}> {isLoading ?  "Logging in.." : "Log In"}</Text>
				</TouchableOpacity>

				<View style={styles.footer}>
					<Text style={styles.textHaveAccount}>Don't have an account? </Text>
					<TouchableOpacity onPress={() => navigate("Signup")}>
						<Text style={styles.textSignUp}> Sign Up</Text>
					</TouchableOpacity>
				</View>

			</SafeAreaView>
			<StatusBar barStyle="light-content" />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: "orange",
		alignSelf: "center",
		paddingBottom: 24,
	},
	input: {
		backgroundColor: "#F6F7FB",
		height: 58,
		marginBottom: 20,
		fontSize: 16,
		borderRadius: 10,
		padding: 12,
	},
	backImage: {
		width: "100%",
		height: 340,
		position: "absolute",
		top: 0,
		resizeMode: 'cover',
	},
	whiteSheet: {
		width: '100%',
		height: '75%',
		position: "absolute",
		bottom: 0,
		backgroundColor: '#fff',
		borderTopLeftRadius: 60,
	},
	form: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 30,
	},
	button: {
		backgroundColor: '#f57c00',
		height: 58,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	footer: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	},
	textLogin: {
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 18
	},
	textSignUp: {
		color: '#f57c00',
		fontWeight: '600',
		fontSize: 14
	},
	textHaveAccount: {
		color: 'gray',
		fontWeight: '600',
		fontSize: 14
	}
});
