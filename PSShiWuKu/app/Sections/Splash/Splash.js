/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import { NavigationActions } from 'react-navigation'

export default class extends Component {
   componentDidMount() {
        const { navigator } = this.props
        this.timer = setTimeout(() => {
           const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Tab'})
                ]
                })
                this.props.navigation.dispatch(resetAction)
        }, 2000)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <Image
                style={{width: gScreen.width, height: gScreen.height}}
                source={require('../../Images/img_intro_4.png')}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});