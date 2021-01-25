import React from 'react';
import { View, Text } from 'react-native';

export default function Key(props) {
    console.log(props);
    const styles = {
        key: {
            height: 60,
            width: 60,
            margin: 3,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#444',
            ...props.style,
            ...(props.styles ? props.styles.key : null),
        },
        text: {
            color: '#ddd',
            fontSize: 27,
            ...(props.styles ? props.styles.text : null)
        }
    };

    return (
        <View style={styles.key}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
}