import React from 'react';
import { View } from 'react-native';
import Keypad from './Keypad';
import Key from './Key';

export default function Keyboard(props) {

    const styles = {
        keyboard: {
            flexDirection: 'row',
            alignContent: 'stretch',
            backgroundColor: '#00676a',
            ...props.style,
            ...(props.styles ? props.styles.keyboard : null),
        },
        left: {
            flex: 1,
            alignContent: 'stretch',
        },
        functions: {
            height: 76,
            padding: 5,
            paddingRight: 0,
            flexDirection: 'row',
            alignItems: 'center',
        },
        keypad: {
            flex: 1,
            borderTopRightRadius: 10,
            backgroundColor: '#3a3a3a'
        },
        operators: {
            width: 76,
            padding: 5,
            alignItems: 'center',
        },
    };

    const onKeyPress = (e, value) => {
        props.onKeyPress(e, value);
    }

    return (
        <View style={styles.keyboard}>
            <View style={styles.left}>
                <View style={styles.functions}>
                    <Key text="DEL" value="del" longValue="clear" styles={{text: {color: 'red'}}} onPress={onKeyPress} onLongPress={onKeyPress} />
                    <Key text="π" value="π" styles={{text: {color: 'orange'}}} onPress={onKeyPress} />
                    <Key text="(" value="(" onPress={onKeyPress} />
                    <Key text=")" value=")" onPress={onKeyPress} />
                </View>
                <Keypad style={styles.keypad} base={props.base} onKeyPress={onKeyPress} />
            </View>
            <View style={styles.operators}>
                <Key text="^" value="^" onPress={onKeyPress} />
                <Key text="*" value="*" onPress={onKeyPress} />
                <Key text="/" value="/" onPress={onKeyPress} />
                <Key text="+" value="+" onPress={onKeyPress} />
                <Key text="-" value="-" onPress={onKeyPress} />
                <Key text="=" value="=" onPress={onKeyPress} />
            </View>
        </View>
    );
}