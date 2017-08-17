/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
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

var dataArr = [];

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
                />
            </View>
        );
    }

    renderCell(info) {
        return(
            <FeedHomeListCell key='1' tipTitle={info.title} subTitle={info.description}>
            </FeedHomeListCell>
        )
    }

    keyExtractor(item, index) {
        return item.id;
    }

    componentDidMount() {
        // 视图一进来就进行刷新
        this.setState({ refreshing: true })
        // this.requestData()
    }

    // 数据请求
    requestData() {
        fetch('http://food.boohee.com/fb/v1/feeds/category_feed?category=1&page=1')
            .then((response) => response.json())
            .then((json) => {
                this.handleDataSource(json.feeds);
                // this.setState({ dataList: json.feeds })
                // console.log(json);
            })
            .catch((error) => {
                alert(error)
            })
    }

    // 处理数据
    handleDataSource(feeds) {
        console.log(feeds);
        for (var i in feeds) {
            var element = feeds[i];
            if (i % 2 == 0) {
                let data = [];
                data.push(element);
            }
        }
    }
}

const FeedHomeListCell = ({
    imageName,
    tipTitle,
    subTitle,
    nickImageName,
    nickName,
    zanCount
}) => {
    return (
        <View style={styles.cellStyle}>
            <Image source={{uri: 'http://one.boohee.cn/food/2017/7/11/938C4D36-E264-428C-87A7-CA08F766221E.jpg?imageView2/2/320/640'}} style={styles.imageStyle}></Image>
            <View>
                <Text>{tipTitle}</Text>
                <Text>{subTitle}</Text>
            </View>
            <View style={styles.lineStyle}></View>
            <View style={styles.bottomViewStyle}>
                <View style={styles.leftViewStyle}></View>
                <View style={styles.rightViewStyle}></View>
            </View>
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
        padding: 10,
        width: (Space.kScreenWidth - 20) / 2,
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
    rightViewStyle:{
         flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});