/**
 * Created by 思思 on 17/6/17.
 * 
 */

import React, { PureComponent } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Keyboard, propTypes } from 'react-native'

import Color from './../Config/Color';

class SearchBar extends PureComponent {

    static propTypes = {
        onSubmitEditing: React.PropTypes.func,
        text: React.PropTypes.string,
        onChangeText: React.PropTypes.func,
        onSubmit: React.PropTypes.func,
        style: View.propTypes.style
    };

   static defaultProps = {
        onSubmitEditing: null,
        text: '搜索',
        onChangeText: null,
        onSubmit: null,
        style: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
        };
    }

    onChangeText(text) {
        this.setState({ text: text });
        this.props.onChangeText && this.props.onChangeText()
    }

    onSubmitEditing() {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.text);
        }
    }

    click() {
        // if (system.isIOS) {
        //     //取消

        // } else {
        //     //搜索
        //     this.onSubmitEditing();
        // }
        // 键盘收起
        Keyboard.dismiss();
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.inputContainer}>
                    <Image
                        style={[styles.icon, {marginLeft: 10}]}
                        source={require('./../Images/ic_feed_search.png')}
                    />
                    <TextInput
                        ref='input'
                        style={styles.input}
                        placeholder={this.props.text}
                        placeholderTextColor={Color.kMainColor}
                        returnKeyType='search'
                        onSubmitEditing={this.onSubmitEditing.bind(this)}
                        onChangeText={(text) => { this.onChangeText(text) }}
                        underlineColorAndroid='transparent'
                    />
                    <Image
                        style={styles.icon}
                        source={require('./../Images/ic_libary_scan.png')}
                    />
                </View>
                {
                /**
                 * <TouchableOpacity
                    onPress={this.click.bind(this)}
                    style={styles.cancelBtn}>
                    <Text style={styles.cancelText}>
                        取消
                    </Text>
                </TouchableOpacity>
                 * 
                 */
                } 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 7,
        // backgroundColor: 'white'
    },
    inputContainer: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e4e4e4',
        borderRadius: 8,
    },
    icon: {
        // marginLeft: 10,
        width: 21,
        height: 21,
        marginRight: 10
    },
    cancelBtn: {
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        color: '#4683ca',
        fontSize: 14,
    },
    input: {
        flex: 1,
        // marginHorizontal: 2,
        fontSize: 14,
    }
});

export default SearchBar;	