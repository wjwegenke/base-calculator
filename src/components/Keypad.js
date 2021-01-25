import React from 'react';
import { View, ScrollView } from 'react-native';
import Key from './Key';

export default function Kaypad(props) {
    
    const styles = {
        keypad: {
            flex: 1,
            alignContent: 'stretch',
            backgroundColor: 'red',
            ...props.style,
            ...(props.styles ? props.styles.keypad : null),
        },
        keys: {
            flex: 1,
            padding: 5,
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row',
            backgroundColor: 'yellow',
        },
        key: {
            margin: 3,
        },
    };

    const onKeyPress = (e, value) => {
        props.onKeyPress(e, value);
    };

    let keysJSX = [];
    for (let i = 0; i < props.base; i++) {
        keysJSX.push((<Key key={i} text={i} value={i} onPress={onKeyPress} style={styles.key} />));
    }
    keysJSX.push((<Key key="." text="." value="." onPress={onKeyPress} style={styles.key} />));

    return (
        <ScrollView style={styles.keypad}>
            <View style={styles.keys}>
                {keysJSX}
            </View>
        </ScrollView>
    );
}