/**
 * Created by 思思 on 17/8/15.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    ImageBackground
} from 'react-native';

import Space from './../../Config/Space';
import Color from './../../Config/Color';

export default class MineHeaderView extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static propTypes = {

    }

    static defaultProps = {

    }

    render() {
        let {settingAction, loginAction} = this.props;
        return (
            // 如果Image 里包含了内容 就用ImageBackground组件,如果只是张图片就直接用Image
                <ImageBackground style={styles.bgImageStyle} source={require('./../../Images/img_my_head.png')}>
                <View style={styles.headerStyle}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>我的</Text>
                    <TouchableOpacity onPress={settingAction}>
                        <Image style={styles.settingIconStyle} source={require('./../../Images/ic_my_setting.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom: 10}}>
                    <Image style={styles.avaterStyle} source={require('./../../Images/img_default_avatar.png')}></Image>
                </View>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.loginContainer}
                    onPress={loginAction}
                >
                    <Text style={{color: 'white'}}>点击登录</Text>
                </TouchableOpacity>
            </ImageBackground>
            // </View>
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
    bgImageStyle: {
        width: Space.kScreenWidth,
        height: 230,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    settingIconStyle: {
        width: 20,
        height: 20,
        marginLeft: 100
    },
    headerStyle: {
        width: Space.kScreenWidth,
        height: Platform.OS === 'ios' ? 44 : 50,
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 130,
        marginTop: 10
    },
    avaterStyle: {
        width: 80,
        height: 80,
    },
    avaterContainerStyle: {

    },
    loginContainer: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 2
    },
});