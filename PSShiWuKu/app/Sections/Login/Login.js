/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';

var accounts = [
        {name: 'QQ', icon: require('./../../Images/ic_account_qq.png')},
        {name: '微信', icon: require('./../../Images/ic_account_wechat.png')},
        {name: '微博', icon: require('./../../Images/ic_account_weibo.png')},
        {name: '薄荷', icon: require('./../../Images/ic_account_boohee.png')}
    ];

export default class extends PureComponent {
    
     static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '登录', 
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
            {
                /*
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                */
            }
                <Text style={{textAlign: 'center', marginTop: 40}}>不用注册，用以下账号直接登录</Text>
                <View style={styles.accountContainerStyle}>
                    {
                    /**
                     * map对于数组不用this,否则出现报错: 没有定义map
                     */
                    }
                    {accounts.map((item, i)=> this.renderAccountView(item, i))}              
                </View>
                 <Text style={{textAlign: 'center', marginTop: 20}}>没有以上账号？</Text>
                 <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.registerBtnStyle}
                    onPress={this.registerAction.bind(this)}>
                    <Text style={{fontSize: 16, color: 'red'}}>注册</Text>
                 </TouchableOpacity>
            </View>
        );
    }

    renderAccountView = (account, key) => {
        const {name, icon} = account;
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                key={`${name}-${key}`}
                onPress={()=>this.clickAccountItem(name)}
                style={styles.accountItem}>
                <Image style={{width: 50, height: 50, marginBottom: 5}} source={icon}></Image>
                <Text style={{color: '#999999', fontSize: 13, textAlign: 'center'}}>{name}</Text>
            </TouchableOpacity>
        );
    }

    // 第三方登录点击
    clickAccountItem(name) {
        switch (name) {
            case 'QQ':
                alert('QQ');
                break;
            case '微信':
                alert('微信');
                break;
            case '微博':
                alert('微博');
                break;
            case '薄荷':
                alert('薄荷');
                break;
            default:
                break;
        }
    }

    // 注册跳转
    registerAction() {
        // this.props.navigation.navigate('RegisterScreen');
        alert('333');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
    },
    accountContainerStyle: {
        flexDirection: 'row',
        // 注意: space-between必须和width一起使用,否则没效果
        width: Space.kScreenWidth - 40,
        paddingTop: 15,
        paddingBottom: 30,
        justifyContent: 'space-between',
    },
    registerBtnStyle: {
        width: Space.kScreenWidth * 0.4,
        marginTop: 20,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
});