/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    propTypes
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        handleAction: React.PropTypes.func
    };

    render() {
        const {handleAction} = this.props;
        return (
            <View style={styles.container}>
                <HandleItem title="饮食分析"
                        imageName={require('./../../Images/ic_home_analyse.png')}
                        onPress={() => handleAction('饮食分析')}
                />
                <View style={styles.line}/>
                <HandleItem title="搜索对比"
                            imageName={require('./../../Images/ic_search_compare.png')}
                            onPress={() => handleAction('搜索对比')}/>
                <View style={styles.line}/>
                <HandleItem title="扫码对比"
                            imageName={require('./../../Images/ic_scan_compare.png')}
                            onPress={() => handleAction('扫码对比')}/>
            </View>
        );
    }
}

const HandleItem = ({
    imageName,
    title,
    onPress
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.handelItem}
            onPress={onPress}
        >
            <Image style={{width: 28, height: 28}} source={imageName}/>
            <Text style={{fontSize: 13, color: 'gray'}}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,  // 记住flex和height不能同时使用,否则高度不能实现
        height: 80,
        backgroundColor: Color.kBgColor,
        width: Space.kScreenWidth - 16 * 2,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 16,
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: -1},
        shadowRadius: 2,
    },
    handelItem: {
        flex: 1,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
});