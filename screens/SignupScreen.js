import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";	
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/slice/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
const backImage = require("../assets/backImage.png");
import Toast from 'react-native-toast-message';

export default function SignupScreen() {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitLoading, setSubmitLoading] = useState(false);
	const {navigate} = useNavigation();
	const dispatch = useDispatch();

	const onHandleSignup = () => {
		if (fullName && email && password) {
			setSubmitLoading(true)
			dispatch(signupUser({'email': email, 'password': password, 'name': fullName}))
			.then(unwrapResult)
			.then((authUser) => {
				clearInputFields()
			})
			.catch((err) =>  {
				setSubmitLoading(false)
				showToast(false, err)
			})
		} else {
			setSubmitLoading(false)
			showToast(false, "Please fill all inputs")
		}
	}
	const clearInputFields = () => {
		showToast(true);
		setSubmitLoading(false)
		setFullName('')
		setEmail('')
		setPassword('')
		navigate('AppStack')
	}

	const showToast = (success =true, msg='') => {
		if (success) {
			Toast.show({
				type: 'success',
				text1: 'Success',
				autoHide: 'true',
				text2: 'Signed up successfully 🔖',
				position: 'top',
			});
		}
		else{
			Toast.show({
				type: 'error',
				text1: 'Error',
				autoHide: 'true',
				text2: msg,
				position: 'top',
			});
		}
	}

	return (
		<View style={styles.container}>
			<Image source={backImage} style={styles.backImage} />
			<View style={styles.whiteSheet} />
			<SafeAreaView style={styles.form}>
				<Text style={styles.title}>Sign Up</Text>

				<TextInput
					style={styles.input}
					placeholder='Full Name'
					type='text'
					autoFocus
					value={fullName}
					onChangeText={(text) => setFullName(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Enter email"
					autoCapitalize="none"
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

				<TouchableOpacity style={styles.button} onPress={onHandleSignup}>
					<Text style={styles.textLogin}> Sign Up</Text>
				</TouchableOpacity>

				<View style={styles.footer}>
					<Text style={styles.textHaveAccount}>Already have an account? </Text>
					<TouchableOpacity onPress={() => navigate("Login")}>
						<Text style={styles.textSignUp}> Login</Text>
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
		paddingTop: 50,
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
		height: '80%',
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