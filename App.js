import { Provider } from 'react-redux'
import AppNavigation from './navigation/appNavigation';
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

export default function App() {
	return (
		<Provider store={store}>
			{/* <PersistGate loading={null} persistor={presistor}> */}
				<AppNavigation />
				<Toast/>
			{/* </PersistGate> */}
		</Provider>
	);
}
