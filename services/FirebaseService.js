import { database } from "../config/firebase";
import { setDoc, doc, addDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'

// adds user's name to users table associating to user's id
const addUser = async (user, name) => {
    try {
        await setDoc(doc(database, "users", user.uid), {
            'name': name,
            'email': user.email
        });
        console.log('User data added to Firestore');
    } catch (error) {
        console.error('Error adding user data to Firestore:', error);
        throw error;
    }
}

// Saves user's order details to orders table in firestore
const saveOrder = async (user, orderDetails) => {
    console.log(orderDetails)
    try {
        await addDoc(collection(database, "orders"), {
            'email': user.email,
            'discount': orderDetails.discount,
            'currency': orderDetails.currency,
            'coupon': '',
            'order_items': orderDetails,
            'total_amount': orderDetails.total,
            'order_date': new Date().toISOString(),
        });
        console.log('User data added to Firestore');
    } catch (error) {
        console.error('Error adding user data to Firestore:', error);
        throw error;
    }
}

// Saves user's favourites in firestore
const saveFavouritesToDb = async (user, favouriteItem) => {
    console.log(user)
    favouriteItem = {...favouriteItem, ...{email: user.email}}
    console.log(favouriteItem)
    try {
        await addDoc(collection(database, "favourites"), favouriteItem);
        console.log('User favourites added to Firestore');
        return favouriteItem
    } catch (error) {
        console.error('Error adding user favourites to Firestore:', error);
        throw error;
    }
}


const fetchFavoritesFromDB = async (user) => {
    try {
        const q = query(collection(database, 'favourites'), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        const favorites = [];
        querySnapshot.forEach((doc) => {
            favorites.push(doc.data());
        });
        console.log('Favourites fetched from firebase successfully')
        return favorites;
    } catch (error) {
        console.error('Error fetching user favourites from Firestore:', error);
        throw error;
    }
}

const deleteFavoritesByUserEmail = async (user, item) => {
    try {
        // Query favorites collection to find documents with the specified user email
        const q = query(collection(database, 'favourites'), 
            where("email", "==", user.email),
            where("id", "==", item.id)
        );
        const querySnapshot = await getDocs(q);

        // Iterate over each document and delete it
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        return item.id; // Return true to indicate successful deletion
    } catch (error) {
        console.error('Error deleting favorites:', error);
        return error
    }
}


export { addUser, saveOrder, saveFavouritesToDb, fetchFavoritesFromDB, deleteFavoritesByUserEmail }