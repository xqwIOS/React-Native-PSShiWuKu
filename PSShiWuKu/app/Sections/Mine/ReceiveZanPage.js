/**
 * Created by 思思 on 17/8/20.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '我收到的赞', 
        headerTitleStyle: {
            color: 'gray',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    暂无点赞
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});