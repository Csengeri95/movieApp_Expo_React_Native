import { View, StyleSheet, Text } from "react-native";
import CustomButton from "./CustomButton";
import { constants } from "../constants/Constants";

export default function HeaderNavbar() {

    return (
        <View style={styles.container}>
            <CustomButton title={'Próbaidőszak megkezdése'} />
            <Text style={styles.text} >7 nap ingyen, ezt követően 1590,00 Ft/hónap</Text>
            <CustomButton title={'Kupon beváltása'} marginTop={8} />
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: 500,
        textShadowOffset: { width: 0, height: 1 },
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowRadius: 3,
        flexWrap: 'wrap',
    }
})