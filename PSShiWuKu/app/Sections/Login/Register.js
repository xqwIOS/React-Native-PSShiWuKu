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
    TextInput,
    TouchableOpacity
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';

export default class Register extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '注册', 
        headerTitleStyle: {
            color: 'gray',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    constructor(props) {
        super(props);
        this.state = {
            telephone: '', // 手机号
            verifyCode: '' // 验证码
        }
    }

    render() {
        return (
            <View style={styles.container}>
               <View style={{width: Space.kScreenWidth * 0.9, marginBottom: 20, marginTop: 30}}>
                    <TextInput
                        style={styles.TextInputStyle}
                        // onChangeText={(text) => this.setState({telephone: text})}
                        // value={this.state.telephone}
                        // 这两个属性只有android能用
                        inlineImageLeft={require('./../../Images/ic_template_default.png')}
                        inlineImagePadding={10}
                        placeholder='手机号'>
                    </TextInput>
               </View>
               <View style={{width: Space.kScreenWidth * 0.9}}>
                    <TextInput
                        style={styles.TextInputStyle}
                        // onChangeText={(text) => this.setState({telephone: text})}
                        // value={this.state.telephone}
                        inlineImageLeft={require('./../../Images/ic_template_default.png')}
                        placeholder='验证码'>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            style={styles.fetchVerifyCodeStyle}
                            onPress={this.fetchVerifyCodeAction.bind(this)}>
                            <Text style={{fontSize: 16, color: 'white'}}>获取验证码</Text>
                        </TouchableOpacity>
                    </TextInput>
               </View>
               <View style={{marginTop: 20}}>
                 <Text style={{textAlign: 'center', fontSize: 13, color: 'gray'}}>仅支持中国大陆手机号注册,港,澳,台及海外用户请使用邮箱</Text>
               </View>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.registerBtnStyle}
                    onPress={this.nextAction.bind(this)}>
                    <Text style={{fontSize: 16, color: 'white'}}>下一步</Text>
                 </TouchableOpacity>
            </View>
        );
    }

    nextAction() {

    }

    fetchVerifyCodeAction() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
    },
    registerBtnStyle: {
        backgroundColor: '#fc5c63',
        width: Space.kScreenWidth * 0.7,
        marginTop: 20,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    TextInputStyle: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 0.5,
        borderRadius: 20,
        backgroundColor: 'white',
        fontSize: 13
    },
    fetchVerifyCodeStyle: {
        backgroundColor: '#53d769',
        width: 100,
        height: 40,
        borderRadius: 20,
        // justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute'
    }
});