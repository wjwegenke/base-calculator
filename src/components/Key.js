import React from 'react';
import { Pressable, Text } from 'react-native';

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

    const onPress = (e) => {
        props.onPress(e, props.value);
    }

    return (
        <Pressable
            style={styles.key}
            android_ripple={{color: 'rgba(150,150,150,0.4)', borderless: true, radius: 30}}
            hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
            pressRetentionOffset={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    );
}