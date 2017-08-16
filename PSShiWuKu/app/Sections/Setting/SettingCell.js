/**
 * Created by 思思 on 17/8/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';

export default class SettingCell extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {title, content, contentColor} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.titleStyle}>
                    {title}
                </Text>
                <View style={styles.rightViewStyle}>
                    <Text style={{alignSelf: 'center', color: 'gray'}}>{content}</Text>
                    <Image source={require('./../../Images/ic_my_right.png')}
                           style={styles.rightItemStyle}>
                    </Image>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 44,
        padding: 10
    },
    titleStyle: {
        width: Space * 0.3,
    },
    rightViewStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rightItemStyle: {
        width: 20,
        height: 20,
        alignSelf: 'center'
    }
});