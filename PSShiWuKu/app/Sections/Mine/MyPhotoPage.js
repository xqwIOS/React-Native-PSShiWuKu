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
import NavigationItem from './../../Common/NavigationItem';

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '我的照片', 
        headerTitleStyle: {
            color: 'gray',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
        headerRight:(
            <NavigationItem
                icon={require('./../../Images/ic_feed_camera.png')}
                // 这里注意: static里面不能使用this调用方法,出现clickFinishButton is not function
                // 参考博客: http://www.jianshu.com/p/2f575cc35780
                // onPress={()=>navigation.state.params.navigatePress()}
                onPress={()=>{
                    // this.props.navigation.navigate('MyReceiveZanPageScreen');
                    alert('进入点赞');
                }}
            />
        )   
        }); 

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    暂无照片
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