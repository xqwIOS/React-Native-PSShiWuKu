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
    TouchableOpacity
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import { Grid } from 'antd-mobile';

// grid的数据源只要包含icon和text字段即可,多字段没关系
const data = Array.from(new Array(10)).map((_val, i) => ({
    icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
    text: `名字${i}`,
  }));

export default class extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const {titleName,categories,onClickGrid} = this.props;
        // 处理数据
        let dataItemArr = this.handleGridDataSource(categories);
        return (
            <View style={styles.container}>
                <View style={styles.titleViewStyle}>
                    <Text style={styles.titleStyle}>{titleName}</Text>
                </View>
                <View style={{height: 1, flex: 1, backgroundColor: Color.kSeparatorColor}}></View>
                <View style={styles.gridViewStyle}>
                {/*注意蚂蚁的这个onClick参数都要写,否则index出不来回事object*/}
                <Grid data={dataItemArr} hasLine={false} columnNum={3} onClick={(el, index) => this.onClick(index)}
                    //   renderItem={(item)=> {
                    //       <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    //         <Image source={{uri: item.icon}} style={{width: 40, height: 40}}></Image>
                    //         <Text></Text>
                    //       </View>
                    //   }}
                    />
                </View>
                <View style={{backgroundColor: Color.kBgColor, height: 10}}></View>
            </View>
        );
    }  

    // 注意: 另起方法写点击item事件,否则不能拿到index
    onClick(index) {
        // alert(index);
        this.props.onClickGrid(index);
    }
    
    componentWillReceiveProps(nextProps) {
    }

    // 处理数据
    handleGridDataSource(categories) {
        let dataItemArr = [];
        for (var key in categories) {
            var categorieItem = {};
            var item = categories[key];
            categorieItem.id = item.id;
            categorieItem.text = item.name;
            categorieItem.icon = item.image_url;
            // categorieItem.sub_category_count = item.sub_category_count;
            // categorieItem.sub_categories = item.sub_categories;
            dataItemArr.push(categorieItem);
        }
        return dataItemArr;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },
    titleViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        textAlign: 'center',
        margin: 10
    },
    gridViewStyle: {
        padding: 10
    }
});