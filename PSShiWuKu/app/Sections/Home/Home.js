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
    ImageBackground,
    ScrollView
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import SearchBar from './../../Common/SearchBar';
import HomeTipView from './HomeTipView';
import { Grid } from 'antd-mobile';

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
  text: `名字${i}`,
}));

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '食物百科', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
        header: null
    }); 

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <ImageBackground source={require('./../../Images/img_home_bg.png')}
                       style={{height: 230}}
                       resizeMode='cover'>
                       {
                           /*<Image require={require('./../../Images/ic_feed_nav.png')}
                        style={{marginLeft: 120 ,width: 60, height: 30,backgroundColor: 'red', alignItems: 'center'}}>
                    </Image>*/
                       }
                    <View style={{marginTop: 120}}>
                        <Text style={{textAlign: 'center', backgroundColor:'transparent', width: 200, marginLeft: 70, fontSize: 15, color: 'white'}}>查 询 食 物 信 息</Text>
                        <SearchBar text={'请输入食品名称'} style={{marginTop: 20, width: Space.kScreenWidth - 30, marginLeft: 15}}></SearchBar>
                    </View>
                    </ImageBackground>
                    <HomeTipView style={styles.homeTipStyle} handleAction={(text) => this.handleAction(text)}>
                    </HomeTipView>
                    <View style={[{ padding: 10 }]}>
                        <Grid data={data} hasLine={false} columnNum={3} />
                    </View>
                    </ScrollView>
            </View>
        );
    }

    handleAction(text) {
        alert(text);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'white',
    },
    homeTipStyle: {
        height: 50,
        backgroundColor: Color.kBgColor
    }
});