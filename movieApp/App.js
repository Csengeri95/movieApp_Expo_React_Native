import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import Home from './screens/Home';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import SelectedItem from './screens/SelectedItem';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import Search from './screens/Search';
import { constants } from './constants/Constants';
import { ToastProvider } from 'react-native-toast-notifications'
import SuccessIcon from './assets/toastIcons/successIcon.png'
import WarningIcon from './assets/toastIcons/warningIcon.png'
import DangerIcon from './assets/toastIcons/dangerIcon.png'

const Tab = createMaterialBottomTabNavigator();


const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();


const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name='Home' component={Home} options={{ headerShown: false }} />
    <HomeStack.Screen name='SelectedItem' component={SelectedItem} options={{ headerShown: false }} />
  </HomeStack.Navigator>
)

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name='Search' component={Search} options={{ headerShown: false }} />
    <SearchStack.Screen name='SelectedItem' component={SelectedItem} options={{ headerShown: false }} />
  </SearchStack.Navigator>
)


const CustomTab = () => (

  <Tab.Navigator
    inactiveColor="#000000"
    activeColor="#FF0000"
    barStyle={styles.barStyle}

  >
    <Tab.Screen
      name='Movies'
      component={HomeStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="movie-open" size={26} color={color} />
        )
      }}
    />

    <Tab.Screen
      name='SearchStackScreen'
      component={SearchStackScreen}
      options={{
        tabBarLabel: 'Search',
        title: 'Search',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name='search' size={26} color={color}
          />
        ),
      }
      }
    />

  </Tab.Navigator>


)


const CustomToastComponent = ({ content, type }) => {

  let containerStyle;
  let textStyle;
  let toastIcon;

  if (type === 'success') {
    containerStyle = styles.successContainer
    textStyle = styles.successText
    toastIcon = SuccessIcon
  } else if (type === 'warning') {
    containerStyle = styles.warningContainer
    textStyle = styles.warningText
    toastIcon = WarningIcon
  } else if (type === 'danger') {
    containerStyle = styles.dangerContainer
    textStyle = styles.dangerText
    toastIcon = DangerIcon
  }



  return (
    <View style={[styles.toastContainer, containerStyle]}>
      <Image style={styles.toastIcon} source={toastIcon} />
      <Text style={[styles.toastText, textStyle]} >{content}</Text>
    </View>
  );
};




export default function App() {

  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent"

  return (
    <ToastProvider
      offsetTop={100}
      duration={3000}
      animationType='silde-in'
      placement={'top'}
      swipeEnabled={true}
      renderToast={({ message, type }) => (
        <CustomToastComponent content={message} type={type} />
      )}

    >
      <PaperProvider theme={theme} >
        <NavigationContainer>
          <CustomTab />
        </NavigationContainer>
      </PaperProvider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({

  barStyle: {
    height: constants.barHeight,
    backgroundColor: 'rgba(192,192,192,0.1)',
    borderTopWidth: 0.1,
  },

  toastContainer: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    width: constants.width * 0.75,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',

  },

  toastText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'center',

  },

  successContainer: {
    backgroundColor: '#def1d7',
    borderColor: '#1f8722',
  },

  warningContainer: {
    backgroundColor: '#fef7ec',
    borderColor: '#f08135',
  },


  dangerContainer: {
    backgroundColor: '#fae1db',
    borderColor: '#d9100a',
  },

  toastIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  successText: {
    color: '#1f8722',
  },
  warningText: {
    color: '#f08135',
  },
  dangerText: {
    color: '#d9100a',
  },
});
