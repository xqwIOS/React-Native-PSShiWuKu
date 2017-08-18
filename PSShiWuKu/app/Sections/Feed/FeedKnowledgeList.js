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
            <View key = {'cell'+info.index} style={{flex:1}}>
                <FeedKnowledgeCell type={info.item.source} imageName={info.item.images[0]} title={info.item.title} readCount={info.item.tail}>
                </FeedKnowledgeCell>
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
        fetch('http://food.boohee.com/fb/v1/feeds/category_feed?category=3&page=1')
            .then((response) => response.json())
            .then((json) => {
                // let data = this.handleDataSource(json.feeds);
                this.setState({ dataList: json.feeds })
                // console.log(json);
            })
            .catch((error) => {
                alert(error)
            })
    }
}

const FeedKnowledgeCell = ({
    imageName,
    type,
    title,
    readCount,
}) => {
    console.log('imageName---'+ imageName);
    return (
        <View style={styles.cellStyle}>
            <View style={styles.leftViewStyle}>
                <Text style={[styles.textStyle, {fontSize: 16, color: 'black', marginTop: 5, textAlign: 'left'}]}>{title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/*注意: 两个都要设置marginTop,否则不能对齐显示*/}
                    <Text style={[styles.textStyle, {fontSize: 14, marginTop: 10,alignSelf: 'center',textAlign: 'left'}]}>{type}</Text>
                    <Text style={[styles.textStyle, {fontSize: 14,alignSelf: 'center', marginTop: 10}]}>{readCount}</Text>
                </View>
            </View>
            <View style={styles.rightViewStyle}>
                <Image source={{uri: imageName}} style={{justifyContent: 'center', alignItems: 'center',flex: 1}}></Image>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
        color: 'gray',
        fontSize: 14,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});