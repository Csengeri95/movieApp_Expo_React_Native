import { Alert } from 'react-native'
import axios from "axios"
import { constants } from "./Constants"
import { BACKEND_URL } from "@env"


export const fetchData = async () => {

    try {
        const response = await axios.get(`${BACKEND_URL}/api/data`)
        return response.data
    } catch (error) {
        Alert.alert('Warning!', 'Hiba történt a hálózatban!')
        console.log(error)
        return null
    }
}


export const fetchVideoId = async (id) => {

    try {
        const response = await axios.get(`${BACKEND_URL}/${constants.youtubeLink}/${id}`)
        return response.data.videoId
    } catch (error) {
        console.log(error)
        return null
    }
}





