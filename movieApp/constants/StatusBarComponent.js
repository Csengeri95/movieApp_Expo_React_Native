import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}