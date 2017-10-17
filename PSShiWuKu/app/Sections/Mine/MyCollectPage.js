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
import MyCollectListPage from './MyCollectListpage';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '我的收藏', 
        headerTitleStyle: {
            color: 'gray',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    render() {
        let titles = ['文章', '食物']        
        return (
            <View style={styles.container}>
            <ScrollableTabView
            style={styles.container}
            tabBarBackgroundColor='white'
            tabBarActiveTextColor='#FE566D'
            tabBarInactiveTextColor='#555555'
            tabBarTextStyle={styles.tabBarText}
            tabBarUnderlineStyle={styles.tabBarUnderline}
        // renderTabBar={() => <DefaultTabBar style={styles.tabBar}/>}
        >
            {titles.map((title, i) => (
                <MyCollectListPage
                    tabLabel={titles[i]}
                    key={i}
                    navigation={this.props.navigation} />
            ))}
        </ScrollableTabView>
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
    tabBarText: {
        fontSize: 14,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: '#FE566D',
        height:2
    },
});