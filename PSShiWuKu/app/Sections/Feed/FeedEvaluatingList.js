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
            <View key = {'cell'+info.index} style={{flex:1,height:200}}>
                <FeedEvaluatingListCell type={info.item.source} imageName={info.item.background} 
                                        title={info.item.title} readCount={info.item.tail}
                                        jumpToDetail={()=>this.jumpToDetail()}>
                </FeedEvaluatingListCell>
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
        fetch('http://food.boohee.com/fb/v1/feeds/category_feed?category=2&page=1')
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

    jumpToDetail() {
        // alert('进入详情');
        // FeedDetailScreen
        this.props.navigation.navigate('FeedDetailScreen');
    }
}

const FeedEvaluatingListCell = ({
    imageName,
    type,
    title,
    readCount,
    jumpToDetail
}) => {
    return (
        <View style={styles.cellStyle}>
            <TouchableOpacity onPress={jumpToDetail}>
                <ImageBackground source={{uri: imageName}}
                style={{height: 230}}
                resizeMode='cover'>
                <Text style={styles.textStyle}>{type}</Text>
                <Text style={[styles.textStyle, {fontSize: 16, marginTop: 50}]}>{title}</Text>
                <Text style={[styles.textStyle, {marginTop: 60}]}>{readCount}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    cellStyle: {
        flex: 1,
        padding: 10
    },
    textStyle: {
        marginTop: 5,
        color: 'white',
        fontSize: 14,
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
});