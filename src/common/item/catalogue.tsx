import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components'

import './catalogue.scss'

import {AtListItem} from 'taro-ui'

class Catalogue extends Component {

  config = {
    navigationBarTitleText: ''
  }

  handleClick(){

  }

  render() {
    const{item} = this.props
    if(item){
      this.state.name = item.name
      return (
        <AtListItem title={item.name} onClick={this.handleClick.bind(this)} />
      );
    }

    return <View/>
  }
}
export default Catalogue;