import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, TouchableOpacity } from 'react-native';


export default function ArrowLeft(props) {


    return (
        <TouchableOpacity onPress={props.onPress} style={[props.style, { zIndex: 2 }]} >
            <Svg
                viewBox="0 0 512 512"
                {...props}
                width={props.size}
                height={props.size}
                style={StyleSheet.flatten([{ transform: [{ scaleX: 1 }] }])}
            >

                <Path
                    fill="none"
                    stroke={props.color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={48}
                    d="M328 112 184 256l144 144"
                />
            </Svg>
        </TouchableOpacity>
    )
};

