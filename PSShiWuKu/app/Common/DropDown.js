/**
 * Created by sisi on 17/7/19.
 * 下拉选择: https://github.com/sohobloo/react-native-modal-dropdown
 */

'use strict';

import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ListView,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ActivityIndicator,
} from 'react-native';

import { Grid } from 'antd-mobile';
const PropTypes = require('prop-types');

const TOUCHABLE_ELEMENTS = ['TouchableHighlight', 'TouchableOpacity', 'TouchableWithoutFeedback', 'TouchableNativeFeedback'];

export default class ModalDropdown extends Component {

  static defaultProps = {
    disabled: false,
    defaultIndex: -1,
    defaultValue: 'Please select...',
    options: null,
    animated: true,
    showsVerticalScrollIndicator: true,
    keyboardShouldPersistTaps: 'never'
  };

  constructor(props) {
    super(props);

    this.state = {
      disabled: props.disabled,
      accessible: !!props.accessible,
      loading: props.options === null || props.options === undefined,
      showDropdown: false,
      buttonText: props.defaultValue,
      selectedIndex: props.defaultIndex
    };
  }

  render() {
    return (
      <View {...this.props}>
        {this._renderButton()}
        {this._renderModal()}
      </View>
    );
  }

  _updatePosition(callback) {
    if (this._button && this._button.measure) {
      this._button.measure((fx, fy, width, height, px, py) => {
        this._buttonFrame = {x: px, y: py, w: width, h: height};
        callback && callback();
      });
    }
  }

  show() {
    this._updatePosition(() => {
      this.setState({
        showDropdown: true
      });
    });
  }

  hide() {
    this.setState({
      showDropdown: false
    });
  }

  _renderButton() {
    return (
      <TouchableOpacity ref={button => this._button = button}
                        disabled={this.props.disabled}
                        accessible={this.props.accessible}
                        onPress={this._onButtonPress.bind(this)}>
        {
          this.props.children ||
          (
            <View style={styles.button}>
              <Text style={[styles.buttonText, this.props.textStyle]}
                    numberOfLines={1}>
                {this.state.buttonText}
              </Text>
            </View>
          )
        }
      </TouchableOpacity>
    );
  }

  _onButtonPress() {
    if (!this.props.onDropdownWillShow ||
      this.props.onDropdownWillShow() !== false) {
      this.show();
    }
  }

  _renderModal() {
    if (this.state.showDropdown && this._buttonFrame) {
      let frameStyle = this._calcPosition();
      let animationType = this.props.animated ? 'fade' : 'none';
      return (
        <Modal animationType={animationType}
               transparent={true}
               onRequestClose={this._onRequestClose.bind(this)}
               supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
          <TouchableWithoutFeedback accessible={this.props.accessible}
                                    disabled={!this.state.showDropdown}
                                    onPress={this._onModalPress.bind(this)}>
            <View style={styles.modal}>
              <View style={{marginTop: 100, flex: 1}}>
                {this.state.loading ? this._renderLoading() : this._renderDropdown()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      );
    }
  }

  _calcPosition() {
    let dimensions = Dimensions.get('window');
    let windowWidth = dimensions.width;
    let windowHeight = dimensions.height;

    let dropdownHeight = (this.props.dropdownStyle && StyleSheet.flatten(this.props.dropdownStyle).height) ||
      StyleSheet.flatten(styles.dropdown).height;

    let bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
    let rightSpace = windowWidth - this._buttonFrame.x;
    let showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
    let showInLeft = rightSpace >= this._buttonFrame.x;

    var style = {
      height: dropdownHeight,
      top: showInBottom ? this._buttonFrame.y + this._buttonFrame.h : Math.max(0, this._buttonFrame.y - dropdownHeight),
    };

    if (showInLeft) {
      style.left = this._buttonFrame.x;
    } else {
      let dropdownWidth = (this.props.dropdownStyle && StyleSheet.flatten(this.props.dropdownStyle).width) ||
        (this.props.style && StyleSheet.flatten(this.props.style).width) || -1;
      if (dropdownWidth !== -1) {
        style.width = dropdownWidth;
      }
      style.right = rightSpace - this._buttonFrame.w;
    }

    if (this.props.adjustFrame) {
      style = this.props.adjustFrame(style) || style;
    }

    return style;
  }

  _onRequestClose() {
    if (!this.props.onDropdownWillHide ||
      this.props.onDropdownWillHide() !== false) {
      this.hide();
    }
  }

  _onModalPress() {
    if (!this.props.onDropdownWillHide ||
      this.props.onDropdownWillHide() !== false) {
      this.hide();
    }
  }

  _renderLoading() {
    return (
      <ActivityIndicator size='small'/>
    );
  }

  _renderDropdown() {
    return (
      <View style={{flex: 1}}>
      <View style={styles.gridViewStyle}>
      {/*注意蚂蚁的这个onClick参数都要写,否则index出不来回事object*/}
      <Grid data={this.props.options} hasLine={false} columnNum={3} onClick={(el, index) => this.dropdownOnSelect(el,index)}
          //   renderItem={(item)=> {
          //       <View style={{justifyContent: 'center', alignItems: 'center'}}>
          //         <Image source={{uri: item.icon}} style={{width: 40, height: 40}}></Image>
          //         <Text></Text>
          //       </View>
          //   }}
          />
      </View>
      </View>
    );
  }

  dropdownOnSelect(el, index) {
    console.log(el+ ''+index);
    this.setState({
      selectedIndex: index
    });
    if(this.props.onSelect) {
        this.props.onSelect(el, index);
    }
    if (!this.props.onDropdownWillHide ||
      this.props.onDropdownWillHide() !== false) {
      this.setState({
        showDropdown: false
      });
    }
}
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 12
  },
  modal: {
    flexGrow: 1
  },
  dropdown: {
    position: 'absolute',
    height: (33 + StyleSheet.hairlineWidth) * 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    borderRadius: 2,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  loading: {
    alignSelf: 'center'
  },
  gridViewStyle: {
    // padding: 10
    flex: 1
}
});
