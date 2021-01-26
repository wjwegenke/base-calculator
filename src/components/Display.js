import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import History from './History';
import Command from './Command';
import { convertBase } from '../scripts/calculator';
import Clipboard from 'expo-clipboard';
import { Picker } from '@react-native-picker/picker';

export default function Display(props) {
    const [altResult, setAltResult] = useState('');
    const [altBase, setAltBase] = useState(16);

    useEffect(() => {
        setAltResult(convertBase(props.result, props.base, altBase));
    }, [props.result, altBase]);

    const styles = {
        display: {
            flex: 1,
            backgroundColor: '#3a3a3a',
            ...props.style,
            ...(props.styles ? props.styles.display : null),
        }, 
        commands: {
            height: 62,
            padding: 6,
            flexDirection: 'row',
            alignItems: 'center',
        },
        basePicker: {
            height: 50,
            width: 100,
            color: '#ddd',
            fontSize: 20,
        },
        history: {
            height: 42,
            padding: 6,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // borderBottomWidth: StyleSheet.hairlineWidth,
            // borderBottomColor: '#ddd',
        },
        historyText: {
            fontSize: 30,
            color: '#bbb',
        },
        expression: {
            flex: 1,
            padding: 6,
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        expressionText: {
            fontSize: 80,
            color: '#ddd',
        },
        result: {
            height: 62,
            padding: 6,
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        resultText: {
            fontSize: 40,
            color: '#ddd',
        },
        altResult: {
            height: 62,
            padding: 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: '#ddd',
        },
        altResultText: {
            fontSize: 40,
            color: '#bbb',
        },
        altBasePicker: {
            height: 50,
            width: 100,
            color: '#bbb',
            fontSize: 20,
        }
    };

    const onCommandPress = async (e, value) => {
        switch (value) {
            case 'copy':
                Clipboard.setString(props.expression);
                break;
            case 'paste':
                props.setExpression(await Clipboard.getStringAsync());
                break;
            case 'history':
                break;
        }
    }

    const latestHistory = props.history.slice(-1)[0];

    const baseSelection = [];
    for (let i = 2; i < 36; i++) {
        baseSelection.push((<Picker.Item key={i} label={i.toString()} value={i} />));
    }

    return (
        <View style={styles.display}>
            <View style={styles.commands}>
                <Picker
                    selectedValue={props.base}
                    style={styles.basePicker}
                    onValueChange={(itemValue, itemIndex) => 
                        props.setBase(itemValue)
                    }
                    dropdownIconColor="#dddddd">
                    {baseSelection}
                </Picker>
                <Command text="Copy" value="copy" onPress={onCommandPress} />
                <Command text="Paste" value="paste" onPress={onCommandPress} />
                <Command text="History" value="history" onPress={onCommandPress} />
            </View>
            <View style={styles.history}>
                {latestHistory ?
                    (<Text
                        style={styles.historyText}
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}>
                            {latestHistory.expression + '=' + latestHistory.result + ' [' + latestHistory.base + ']'}
                    </Text>)
                    : null
                }
            </View>
            <View style={styles.expression}>
                <Text
                    style={styles.expressionText}
                    adjustsFontSizeToFit={true}
                    numberOfLines={2}>
                        {props.expression}
                </Text>
            </View>
            <View style={styles.result}>
                <Text
                    style={styles.resultText}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}>
                        {props.result ? '=' + props.result: null}
                </Text>
            </View>
            <View style={styles.altResult}>
                <Picker
                    selectedValue={altBase}
                    style={styles.altBasePicker}
                    onValueChange={(itemValue, itemIndex) => 
                        setAltBase(itemValue)
                    }
                    dropdownIconColor="#bbbbbb">
                    {baseSelection}
                </Picker>
                <Text
                    style={styles.altResultText}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}>
                        {altResult ? '=' + altResult : null}
                </Text>
            </View>
        </View>
    );
}