/**
 * Created by 思思 on 17/10/18.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    WebView
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import NavigationItem from './../../Common/NavigationItem';

export default class FeedDetail extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '资讯详情', 
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
            <WebView
                ref={this.webView}
                automaticallyAdjustContentInsets={false}
                style={styles.webView}
                source={{uri: "http://jingxuan.guokr.com/pick/75627/?app_version=2.7.3&os_version=11.0.1&token=UoxF6TfBFTKKyGvxKU6a&app_device=iOS"}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                // onNavigationStateChange={this.onNavigationStateChange}
                // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                // startInLoadingState={true}
                // scalesPageToFit={this.state.scalesPageToFit}
            />
              {this.renderBottomView()}
            </View>
        );
    }

    // 底部点赞View
    renderBottomView() {
        return (
            <View style={{height: 54, flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', width: Space.kScreenWidth / 2, height: 44, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('./../../Images/ic_news_share.png')} style={{width: 20, height: 20}}></Image>
                    <Text>分享</Text>
                </View>
                <View style={{flexDirection: 'row', width: Space.kScreenWidth / 2, height: 44, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('./../../Images/ic_collect.png')} style={{width: 20, height: 20}}></Image>
                    <Text>收藏</Text>
                </View>
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
    avaterImgStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.kSeparatorColor
    },
    webView: {
        width: Space.kScreenWidth,
        height: Space.kScreenHeight - 54
    }
});