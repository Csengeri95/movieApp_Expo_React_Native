import { StyleSheet, Text, View } from "react-native"
import { constants } from "../constants/Constants"
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function CustomButton({ title, marginTop, icon: IconComponent, iconName, onPress }) {
    return (
        <TouchableOpacity style={[styles.buttonContainer, { marginTop: marginTop }]} onPress={onPress}  >

            {iconName && <IconComponent name={iconName} size={16} color="#000000" style={styles.icon} />}

            <View style={styles.textContainer}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({


    buttonContainer: {
        elevation: 8,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: constants.width * 0.6,
        flexDirection: 'row',
    },

    text: {
        fontSize: 16,
        fontWeight: 600,
        color: '#000000',
        alignSelf: 'center',
    },

    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        marginLeft: 2,
        alignSelf: 'center',
    }

})