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
    FlatList
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
// import { Popover } from 'teaset';

let data = ['', '', ''];
let blackStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
  };
  let shadowStyle = {
    shadowColor: '#777',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  };

export default class HomeTypeList extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '主食类', 
        headerTitleStyle: {
            color: 'gray',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
        headerRight:(
            <View style={{width: 40, height: 40}}>
                <Text style={{color: 'gray', marginTop: 15}}  
                      onPress={()=> {
                          alert('点击了全部')
                        }}
                >全部</Text>
            </View>
        )   
    }); 

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            refreshing: false,
        }

        this.keyExtractor = this.keyExtractor.bind(this);
        this.renderCell = this.renderCell.bind(this);
        this.requestData = this.requestData.bind(this);
    }

    componentWillMount() {
        
    }
        
    componentDidMount(){
        this.props.navigation.setParams({navigatePress:this.allAction})
    }

    allAction() {
        alert('点击了全部');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerViewStyle}>
                    <Text style={{padding: 13}} onPress={this.commonAction.bind(this)}>
                        常见
                    </Text>
                </View>
                <FlatList
                data={this.state.dataList}
                keyExtractor={this.keyExtractor}
                // onRefresh={this.requestData}
                refreshing={this.state.refreshing}
                ListHeaderComponent={this.renderHeader}
                renderItem={this.renderCell}
                ItemSeparatorComponent = {() =>{
                    return(
                    <View style={{flex:1,height:10, backgroundColor: Color.kBgColor}}/>
                    );
                }}
            />
            </View>
        );
    }

    renderCell(info) {
        console.log(info);
        return (
            <View key = {'cell'+info.index} style={{flex:1,height:60}}>
                <HomeTypeListCell imageName={info.item.thumb_image_url} title={info.item.name} subTitle={info.item.calory}>
                </HomeTypeListCell>
            </View>
        )
    }

    keyExtractor(item, index) {

        return 'flat'+index;
    }

    componentDidMount() {
        // 视图一进来就进行刷新
        this.setState({
            refreshing: false
        })
        this.requestData()
    }

    // 数据请求
    requestData() {
        fetch('http://food.boohee.com/fb/v1/foods?value=2&order_by=1&kind=group&order_asc=0')
            .then((response) => response.json())
            .then((json) => {
                // let data = this.handleDataSource(json.feeds);
                this.setState({ dataList: json.foods })
                // console.log(json);
            })
            .catch((error) => {
                alert(error)
            })
    }

    commonAction() {
        alert('常见');
        
    }
}

const HomeTypeListCell = ({
    imageName,
    title,
    subTitle,
}) => {
    return (
        <View style={styles.cellStyle}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image style={styles.imageStyle} source={{uri: imageName}}></Image>
                <View style={styles.textContainerStyle}>
                    <Text style={[styles.textStyle, {fontSize: 16, marginTop: 5, textAlign: 'left'}]}>{title}</Text>
                    <Text style={[styles.textStyle, {marginTop: 5}]}>455千焦/100克</Text>
                </View>
            </View> 
            <View style={{justifyContent: 'center', alignItems: 'center', width: Space.kScreenWidth * 0.2, marginLeft: 120}}>
               <View style={{width: 10, height:10, borderRadius: 5, backgroundColor: 'green'}}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    headerViewStyle: {
        height: 44,
        width: Space.kScreenWidth,
        backgroundColor: 'white',
    },
    imageStyle: {
        width: 40,
        height: 40,
        // margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    textContainerStyle: {
        margin: 10,
        justifyContent: 'center',
        width: Space.kScreenWidth * 0.3
        // alignItems: 'center'
    },
    cellStyle: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    leftViewStyle: {
        width: Space.kScreenWidth * 0.6,
    },
    rightViewStyle: {
        marginLeft: 10,
        width: Space.kScreenWidth * 0.3,
        // backgroundColor: 'red'
    },
    textStyle: {
        marginTop: 5,
        color: 'black',
        fontSize: 13,
        backgroundColor: 'transparent',
    },
});