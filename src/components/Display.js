import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import History from './History';
import Command from './Command';
import { convertBase } from '../scripts/calculator';

export default function Display(props) {
    const [altResult, setAltResult] = useState('');
    const [altBase, setAltBase] = useState(16);

    useEffect(() => {
        setAltResult(convertBase(props.result, props.base, altBase));
    }, [props.result]);

    const styles = {
        display: {
            flex: 1,
            backgroundColor: 'purple',
            ...props.style,
            ...(props.styles ? props.styles.display : null),
        }, 
        commands: {
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'magenta',
        },
        history: {
            height: 50,
            backgroundColor: 'lightgray',
        },
        expression: {
            flex: 1,
            backgroundColor: 'maroon',
        },
        result: {
            height: 50,
            backgroundColor: 'green',
        },
        altResult: {
            height: 50,
            backgroundColor: 'salmon',
        },
    };

    const latestHistory = props.history.slice(-1)[0];

    return (
        <View style={styles.display}>
            <View style={styles.commands}></View>
            <View style={styles.history}>
                {latestHistory ?
                    (<Text>{latestHistory.expression + '=' + latestHistory.result + ' [' + latestHistory.base + ']'}</Text>)
                    : null
                }
            </View>
            <View style={styles.expression}>
                <Text>{props.expression}</Text>
            </View>
            <View style={styles.result}>
                <Text>{props.result ? '=' + props.result: null}</Text>
            </View>
            <View style={styles.altResult}>
                <Text>{altResult ? '=' + altResult : null}</Text>
            </View>
        </View>
    );
}