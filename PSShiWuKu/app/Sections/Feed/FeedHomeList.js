/**
 * Created by 思思 on 17/5/7.
 */
import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import ImageButton from './../../Common/ImageButton';

var dataArr = [];
var temp = 0

const itemSpace = 10;
const itemWidth = (Space.kScreenWidth - itemSpace * 3) / 2;
const itemHeight = 200;

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: [
                ["1", "2"],
                ["3", "4"],
                ["5", "6"]
            ],
            refreshing: false,
        }

        this.keyExtractor = this.keyExtractor.bind(this);
        this.renderCell = this.renderCell.bind(this);
        this.requestData = this.requestData.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    onRefresh={this.requestData}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderCell}
                    ItemSeparatorComponent = {() =>{
                        return(
                        <View style={{flex:1,height:10}}/>
                        );
                    }}
                />
            </View>
        );
    }

    renderCell(info) {
        console.log(info.index);
        temp++;
        return (
            <View key = {'cell'+info.index} style={{flex:1,height:itemHeight}}>
                {
                <FeedHomeListCell
                    itemList = {info}
                     />}
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
        fetch('http://food.boohee.com/fb/v1/feeds/category_feed?category=1&page=1')
            .then((response) => response.json())
            .then((json) => {
                let data = this.handleDataSource(json.feeds);
                this.setState({ dataList: data })
                // console.log(json);
            })
            .catch((error) => {
                alert(error)
            })
    }

    // 处理数据,将数组分割成两个一组
    handleDataSource(feeds) {
        console.log(feeds);
        for (var i in feeds) {
            var element = feeds[i];
            if (i % 2 == 0) {
               let data = [];
               for(var j=0;j<2;j++) {  // 次数
                data.push(feeds[j]);
               }
                dataArr.push(data);
                i=i+2;
            }
        }
        console.log('---dataArr---'+dataArr);
        return dataArr;
    }
}

const FeedHomeListCell = ({
    imageName,
    tipTitle,
    subTitle,
    nickImageName,
    nickName,
    zanCount,
    itemList
}) => {
    console.log(itemList);
    console.log('itemList.item = '+ itemList.item);
    let views = [];
    for(let i=0;i<itemList.item.length;i++){
        views.push(
            <View key = {'item'+i} style={{marginLeft:10,backgroundColor:Color.kBgColor,width:itemWidth,height:itemHeight}}>
                <Image source={{uri: 'http://one.boohee.cn/food/2017/7/11/938C4D36-E264-428C-87A7-CA08F766221E.jpg?imageView2/2/320/640'}} style={styles.imageStyle}></Image>
                    <View>
                        <Text style={styles.titleStyle}>{itemList.item[i].title}</Text>
                        <Text style={styles.subTitleStyle} numberOfLines={2}>{itemList.item[i].description}</Text>
                    </View>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.bottomViewStyle}>
                        <View style={styles.leftViewStyle}>
                            <Image style={{width: 20, height: 20}} source={{uri: itemList.item[i].publisher_avatar}}> </Image>
                            <Text style={{color: 'gray', fontSize: 13}}>{ itemList.item[i].publisher }</Text>
                        </View>
                        <View style={styles.rightViewStyle}>
                            <Image style={{width: 20, height: 20}} source={require('./../../Images/ic_feed_like.png')}>{itemList.item[i].publisher_avatar}</Image>
                            <Text style={{color: 'gray', fontSize: 13}}>{ itemList.item[i].like_ct } </Text>
                        </View>
                    </View>
            </View>

        )
    }
    return (
        <View style={styles.cellStyle}>
            {views}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cellStyle: {
        flex: 1,
        height: itemHeight + 2 * itemSpace,
        flexDirection: 'row'
    },
    imageStyle: {
        flex: 1,
        height: 200
    },
    lineStyle: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Color.kSeparatorColor
    },
    bottomViewStyle: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftViewStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightViewStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subTitleStyle: {
        marginTop: 5,
        color: 'gray',
        fontSize: 13
    },
    titleStyle: {
        marginTop: 5,
        color: 'black',
        fontSize: 14
    }
});