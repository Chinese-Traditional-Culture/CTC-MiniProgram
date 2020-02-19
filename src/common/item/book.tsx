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
    const name = this.props.item.name
    const onClick = this.props.onClick
    if(this.props.item){
      return (
        <View>
        <View className='card_view'>
          <AtCard extra={name} title={name}>这也是内容区 可以随意定义功能</AtCard>
        </View>
        </View>
      )
    }
  }
}
