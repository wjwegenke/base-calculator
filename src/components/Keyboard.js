import React from 'react';
import { View } from 'react-native';
import Keypad from './Keypad';
import Key from './Key';

export default function Keyboard(props) {

    const styles = {
        keyboard: {
            flexDirection: 'row',
            alignContent: 'stretch',
            backgroundColor: 'green',
            ...props.style,
            ...(props.styles ? props.styles.keyboard : null),
        },
        left: {
            flex: 1,
            alignContent: 'stretch',
        },
        functions: {
            height: 66,
            padding: 5,
            paddingRight: 0,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'teal',
        },
        keypad: {
            flex: 1,
            backgroundColor: 'gray',
        },
        operators: {
            width: 66,
            padding: 5,
            alignItems: 'center',
            backgroundColor: 'aqua',
        },
    };

    const onKeyFunctionPress = (e, value) => {
        props.onKeyFunctionPress(e, value);
    }

    const onKeyPress = (e, value) => {
        props.onKeypadPress(e, value);
    }

    return (
        <View style={styles.keyboard}>
            <View style={styles.left}>
                <View style={styles.functions}>
                    <Key text="DEL" value="del" styles={{text: {color: 'red'}}} onPress={onKeyFunctionPress} />
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