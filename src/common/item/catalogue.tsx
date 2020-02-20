import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components'

import './catalogue.scss'

import {AtListItem} from 'taro-ui'

class Catalogue extends Component {
  render() {
    const{item, onClick} = this.props
    if(item){
      this.state.item = item
      return (
        <AtListItem title={item.name} onClick={onClick} />
      );
    }

    return <View/>
  }
}

export default Catalogue;
