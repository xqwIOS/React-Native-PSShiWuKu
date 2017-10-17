/**
 * Created by 思思 on 17/8/18.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import NavigationItem from './../../Common/NavigationItem';

export default class FeedDetail extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '查看详情', 
        headerTitleStyle: {
            color: 'gray',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
        headerRight:(
        <NavigationItem
            icon={require('./../../Images/ic_news_share.png')}
            // 这里注意: static里面不能使用this调用方法,出现clickFinishButton is not function
            // 参考博客: http://www.jianshu.com/p/2f575cc35780
            // onPress={()=>navigation.state.params.navigatePress()}
            onPress={()=>{
                alert('点击了分享');
            }}
        />
    )   
    }); 

    render() {
        return (
            <View style={styles.container}>
              <ScrollView>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                    <Image source={{uri:'http://one.boohee.cn/food/2017/7/11/938C4D36-E264-428C-87A7-CA08F766221E.jpg?"'}}
                           style={styles.avaterImgStyle}></Image>
                    <View style={{marginLeft: 10}}>
                        <Text>sisi</Text>
                        <Text>2017-12-30</Text>
                    </View>
                </View>
                <Image style={{flex: 1, height: 250}} source={{uri: 'http://one.boohee.cn/food/2017/7/11/938C4D36-E264-428C-87A7-CA08F766221E.jpg?"'}}>
                </Image>
                <View style={{flex:1, height: 44, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{width: Space.kScreenWidth, textAlign: 'right', padding: 10}} 
                            numberOfLines={1}>减肥餐</Text>
                </View>
                <View style={{backgroundColor: Color.kSeparatorColor, height: StyleSheet.hairlineWidth}}>
                </View>
                <View style={{flex:1, height: 44, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{width: Space.kScreenWidth, textAlign: 'left'}} numberOfLines={0}>减肥餐</Text>
                </View>
                
              </ScrollView>
              <View style={{backgroundColor: Color.kBgColor, height: 10}}>
              </View>
              {this.renderBottomView()}
            </View>
        );
    }

    // 底部点赞View
    renderBottomView() {
        return (
            <View style={{height: 54}}>
                <View style={{backgroundColor: Color.kBgColor, height: 10}}>
                </View>
                <View style={{flexDirection: 'row', width: Space.kScreenWidth, height: 44, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('./../../Images/ic_feed_like.png')} style={{width: 20, height: 20}}></Image>
                    <Text>1223</Text>
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
    }
});