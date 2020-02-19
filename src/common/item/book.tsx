import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './book.scss'
import './../../theme/custom-theme.scss'

import { AtCard } from 'taro-ui'

class Book extends Component {
  render () {
    if(!this.props.item){
      return <View/>
    }

    const{item, onClick} = this.props

    if(item){
      return (
        <View>
        <View className='card_view'>
          <AtCard extra={item.author} title={item.name} onClick={onClick}>{item.description}</AtCard>
        </View>
        </View>
      )
    }
  }
}
