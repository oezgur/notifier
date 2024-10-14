import AsyncStorage from '@react-native-async-storage/async-storage';


/**
* Stores data on device
* @param {Object} data - The data to store
*/
export const storeData = async(data) => {
    try{ 
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem('user_data', jsonData);
        console.log('Your Data: ', jsonData);
    }catch(err){
        console.warn(err);
    }
}


/**
* Retrieve data using the the data key
*/
export const retrieveData = async() => {
    try{
      const value = await AsyncStorage.getItem('user_data')
      if(value !== null ){
          console.log(value);
      }
    }
    catch(err){
        console.warn(err)
    }
}