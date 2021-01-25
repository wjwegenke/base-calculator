import React from 'react';
import { View } from 'react-native';
import History from './History';
import Command from './Command';

export default function Display(props) {

    const styles = {
        display: {
            flex: 1,
            backgroundColor: 'purple',
            ...props.style,
            ...(props.styles ? props.styles.display : null),
        }
    };

    return (
        <View style={styles.display}>
            Display
        </View>
    );
}