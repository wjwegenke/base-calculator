import React from 'react';
import { Pressable, Text } from 'react-native';

export default function Key(props) {
    console.log(props);
    const styles = {
        key: {
            height: 50,
            width: 50,
            margin: 3,
            borderRadius: 25,
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

    const onPress = (e) => {
        props.onPress(e, props.value);
    }

    return (
        <Pressable style={styles.key} onPress={onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    );
}