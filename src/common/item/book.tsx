import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './book.scss'
import './../../theme/custom-theme.scss'

import { AtCard, AtSwipeAction } from 'taro-ui'

class Book extends Component {

  onClickButton(event){
    if(event.text === '设置'){
      
    }
    if(event.text === '目录'){
      
    }
  }

  render () {
    if(!this.props.item){
      return <View/>
    }

    const{item, onClick} = this.props

    if(item){
      return (
        <View className='card_view'>
          <AtSwipeAction autoClose onClick={this.onClickButton.bind(this)} options={[
            // {
            //   text: '设置',
            //   style: {
            //     backgroundColor: '#6190E8'
            //   }
            // },
            {
              text: '目录',
              style: {
                backgroundColor: '#FF4949'
              }
            }
          ]}>
            <AtCard extra={item.author} title={item.name} onClick={onClick}>{item.description}</AtCard>
          </AtSwipeAction>
        </View>
      )
    }
  }
}
