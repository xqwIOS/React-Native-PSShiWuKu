/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import MineHeaderView from './MineHeaderView';

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '我的', 
        header: null,
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    render() {
        return (
                <View style={styles.cellContainerStyle}> 
                <MineHeaderView
                    settingAction={this.settingAction.bind(this)}
                    loginAction={this.loginAction.bind(this)}></MineHeaderView>              
                <MineCell
                        title='我的照片'
                        style={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        imageName={require('./../../Images/ic_my_photos.png')}
                        onPress={this.onPressCell.bind(this)}>
                    </MineCell>
                    <MineCell
                        title='我的收藏'
                        style={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        imageName={require('./../../Images/ic_my_collect.png')}
                        onPress={this.onPressCell.bind(this)}>
                    </MineCell>
                    <MineCell
                        title='上传食物数据'
                        style={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        imageName={require('./../../Images/ic_my_upload.png')}
                        onPress={this.onPressCell.bind(this)}>
                    </MineCell>
                </View>
        );
    }

    settingAction() {
        // alert('设置');
        this.props.navigation.navigate('SettingScreen');
    }

    loginAction() {
        alert('登录');
        // this.props.navigation.navigate('LoginScreen');
    }

    onPressCell() {
        alert('点击cell');
    }
}

const MineCell = ({title, imageName, style, onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.cellStyle}
            onPress={()=>onPress(title)}>
            <Image style={{width: 20, height: 20, marginHorizontal: 15}} source={imageName}></Image>
            <View style={[styles.rightViewStyle, style]}>
                <Text style={{color: 'gray'}}>{title}</Text>
                <Image style={{width: 20, height: 20}} source={require('./../../Images/ic_my_right.png')}></Image>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    cellStyle: {
        flexDirection: 'row',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightViewStyle: {
        flex: 1,
        height: 46,
        borderColor: '#d9d9d9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15
    },
    cellContainerStyle: {
        borderColor: Color.kSeparatorColor,
        backgroundColor: 'white'
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
        height: 20
    },
    headerStyle: {
        width: Space.kScreenWidth,
        height: Platform.OS === 'ios' ? 44 : 50,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avaterStyle: {
        width: 80,
        height: 80,
    },
    avaterContainerStyle: {

    }
});