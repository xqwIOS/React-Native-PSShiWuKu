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
    TouchableOpacity,
ImageBackground
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import ImageButton from './../../Common/ImageButton';

const itemSpace = 10;
const itemWidth = (Space.kScreenWidth - itemSpace * 3) / 2;
const itemHeight = 200;

export default class extends Component {

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
        return (
            <View key = {'cell'+info.index} style={{flex:1,height:itemHeight}}>
                {
                    <FeedHomeListCell
                    itemList = {info.item}
                    onPress={(index)=>{this.onpress.bind(this)}}
                    />
                }
            </View>
        )
    }

    onpress(index) {
        alert(index);
    }

    // 跳转到详情页
    jumpToDetail() {
        alert('详情页');
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
                console.log(error);
                alert(error)
            })
    }

    // 处理数据,将数组分割成两个一组
    handleDataSource(feeds) {
        var data = [];
        for(var i=0,len=feeds.length;i<len;i+=2){
            data.push(feeds.slice(i,i+2));
        }
        return data;
    }
}

const FeedHomeListCell = ({
    itemList,
    onPress
}) => {
    let views = [];
    console.log(itemList);
    // 这里需要处理下图片
    return (
        <View style={styles.cellStyle}>
        {/**
            <Image source={{uri: (item[index].card_image).replace('/w/', '/100/')}} style={styles.imageStyle}/>
         * "http://one.boohee.cn/food/2017/7/11/38880AC1-7D64-4E0B-9A82-801127C30BFA.jpg?imageView2/2/w/640"
         */}
            {itemList.map((item,index) =>(
                <TouchableOpacity onPress={onPress(index)}>
                    <View key = {'item'+index} style={{marginLeft:10,backgroundColor:Color.kBgColor,width:itemWidth,height:itemHeight}}>
                    <Image source={{uri: 'http://one.boohee.cn/food/2017/7/11/38880AC1-7D64-4E0B-9A82-801127C30BFA.jpg?imageView2/2/100/640'}} style={styles.imageStyle}/>
                    <View>
                        <Text style={styles.titleStyle}>{item.title}</Text>
                        <Text style={styles.subTitleStyle} numberOfLines={2}>{item.description}</Text>
                    </View>

                    <View style={styles.lineStyle}/>
                    <View style={styles.bottomViewStyle}>
                        <View style={styles.leftViewStyle}>
                            {item.publisher_avatar === null ? null : <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: item.publisher_avatar}}/>}
                            <Text style={{color: 'gray', fontSize: 13}}>{ item.publisher }</Text>
                        </View>
                        <View style={styles.rightViewStyle}>
                            <Image style={{width: 20, height: 20}} source={require('./../../Images/ic_feed_like.png')}/>
                            <Text style={{color: 'gray', fontSize: 13}}>{ item.like_ct } </Text>
                        </View>
                    </View>

                </View>
                </TouchableOpacity>
            ))}
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