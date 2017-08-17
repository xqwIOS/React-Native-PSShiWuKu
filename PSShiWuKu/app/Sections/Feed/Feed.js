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
    Platform
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';

import NavigationItem from './../../Common/NavigationItem';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import FeedHomeList from './FeedHomeList';
import FeedEvaluatingList from './FeedEvaluatingList';
import FeedKnowledgeList from './FeedKnowledgeList';
import FeedDelicacyList from './FeedDelicacyList';
import FeedCategoryBar from './FeedsCategoryBar';

const titles = ['首页', '评测', '知识', '美食'];
const controllers = [
    {categoryId: 1, controller: FeedHomeList},
    {categoryId: 2, controller: FeedEvaluatingList},
    {categoryId: 3, controller: FeedKnowledgeList},
    {categoryId: 4, controller: FeedDelicacyList}
]

export default class Feed extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '逛吃', 
        headerTitleStyle: {
            color: 'gray',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
        header: null,
        headerRight:(
        <NavigationItem
            icon={require('./../../Images/ic_feed_camera.png')}
            // 这里注意: static里面不能使用this调用方法,出现clickFinishButton is not function
            // 参考博客: http://www.jianshu.com/p/2f575cc35780
            // onPress={()=>navigation.state.params.navigatePress()}
            onPress={()=>{
                alert('点击了相机');
            }}
        />
    )   
    }); 

    componentDidMount(){

        this.props.navigation.setParams({navigatePress:this.cameraAction})
  }

    render() {
        return (
            <View style={styles.container}>
                <HeaderView cameraAction={this.cameraAction.bind(this)}></HeaderView>
                <ScrollableTabView
                    renderTabBar={() => <FeedCategoryBar tabNames={titles}/>}
                    tabBarPosition='top'
                    scrollWithoutAnimation={false}
                >
                {controllers.map((item, index) => {
                    let Component = item.controller;
                    return (
                            <Component
                                key={'view'+titles[index]}
                                tabLabel={titles[index]}
                                categoryId={item.categoryId}
                                navigator={navigator}
                            />
                        )
                })}
                </ScrollableTabView>
            </View>
        );
    }

    cameraAction() {
        alert('点击相机');
    }
}

 const HeaderView = ({cameraAction}) => {
     return (
         <View style={[styles.header, {borderBottomWidth: StyleSheet.hairlineWidth}]}>
            <Image
                style={{width: 60, height: 30}}
                source={require('../../Images/ic_feed_nav.png')}
                resizeMode="contain"
            />
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.photo}
                onPress={cameraAction}
            >
                <Image
                    style={{width: 20, height: 20}}
                    source={require('../../Images/ic_feed_camera.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
     );
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        height: Space.kiOSNavigationHeight,
        paddingTop: 0,
        alignItems: 'center',
        borderBottomColor: '#d9d9d9',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    photo: {
        width:  Platform.OS === 'ios' ? 44 : 50,
        height: Platform.OS === 'ios' ? 44 : 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: 10
    }
});