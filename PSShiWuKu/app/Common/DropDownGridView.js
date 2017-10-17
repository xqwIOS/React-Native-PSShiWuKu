/**
 * 数据请求前显示"加载中..."
 */
import React, { PureComponent, PropTypes } from 'react';

import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    Image
} from 'react-native';

import { Grid } from 'antd-mobile';
import Color from './../Config/Color';

// grid的数据源只要包含icon和text字段即可,多字段没关系
const data = Array.from(new Array(10)).map((_val, i) => ({
    icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
    text: `名字${i}`,
  }));

export default class DropDownGridView extends React.Component {

     // 构造函数  
  constructor(props) {  
    super(props);  
    this.state = {  
      show:false,  
    };  
  }  

  static propTypes = {
    isShow: React.PropTypes.bool,
    title: PropTypes.string,
    // imageName: PropTypes.string
}

static defaultProps = {
    onPress:() => {},
    title: '',
    imageName: ''
}
  
  // 加载完成  
  componentDidMount(){  
    //  
  }  
  
  // view卸载  
  componentWillUnmount(){  
    //  
  }  

    render() {
        if (!this.props.isShow) return null;        
        return (
            <View style={styles.container}>
                <Modal  
                animationType='fade'  
                transparent={false}  
                visible={this.props.isShow}  
                onShow={() => {}}  
                onRequestClose={() => {}} >  
                <View style={styles.modalStyle}>  
            </View>
                <View style={styles.subView}>
                    {/*注意蚂蚁的这个onClick参数都要写,否则index出不来回事object*/}
                    <Grid data={data} hasLine={false} columnNum={3} onClick={(el, index) => this.onClick(el, index)}
                        //   renderItem={(item)=> {
                        //       <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        //         <Image source={{uri: item.icon}} style={{width: 40, height: 40}}></Image>
                        //         <Text></Text>
                        //       </View>
                        //   }}
                        />
                    </View>
            </Modal>  
            </View>
        )
    }

    onClick(el, index) {
        if(this.props.onPress) {
            this.props.onPress(el, index);
        }
    }
}

const styles = StyleSheet.create({
    container:{  
        // flex:1,  
        backgroundColor: '#ECECF0',  
      },  
      // modal的样式  
      modalStyle: {  
        backgroundColor:'#ECECF0',  
        // alignItems: 'center',  
        // justifyContent:'center',  
        // flex:1,  
        width: 375,
        height: 500
      },  
      // modal上子View的样式  
      subView:{  
        // marginLeft:60,  
        // marginRight:60,  
        backgroundColor:'#fff',  
        // alignSelf: 'stretch',  
        // alignItems:'center',
        justifyContent:'center',  
      },  
      gridViewStyle: {
        // padding: 10
    }
})