/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import SettingCell from './SettingCell';

var dataArr = ['', '', '', '给我们评个分吧', '将食物库分享给朋友们', 'HealthKit设置'];
var contentArr = [];

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '设置', 
        headerTitleStyle: {
            color: 'gray',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.renderRow = this.renderRow.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
    }

   compennetDidUnmount(){  
   }  

   compennetWillUnmount() {
       console.log('compennetWillUnmount');
   }
   
   componentDidMount(){
       let dataArr = this.getDataList();
       this.setState({
           data: dataArr
       });
    }

   getDataList() {
    //    alert('哈哈');
        return ([
            { title: '账号安全', subtitle: '未验证', color: 'red'},
            { title: '清除缓存', subtitle: '10.9M' },
            { title: '给我们提个建议'},
            { title: '给我们评个分吧'},
            { title: '将食物库分享给朋友们'},
            { title: 'HealthKit设置'}
        ]
    )
 }

    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={ds.cloneWithRows(this.state.data)}
                    renderRow={this.renderRow}
                    style={{flex: 1}}
                    renderFooter={this.renderFooter}
                    renderHeader={this.renderHeader}
                    enableEmptySections
                    initialListSize={3}
                    onScroll={this._onScroll}
                    // onEndReached={this.loadMore}
                    onEndReachedThreshold={30}
                />
            </View>
        );
    }

// 具体的每行
    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <View style={{backgroundColor: 'white'}}>
                <SettingCell 
                title={rowData.title}
                content={rowData.subtitle}
                style={styles.cellStyle}
                contentColor={rowData.color}
            >
            </SettingCell>
            </View>
        );
    }

    renderHeader() {

    }

    renderFooter() {
        return (
            <Text style={{textAlign: 'center', marginTop: 10}}>食物库V1.0.0</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        // padding: 10,
        backgroundColor: Color.kBgColor
    },
    cellStyle: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.kSeparatorColor,
        // padding: 10
    }
});