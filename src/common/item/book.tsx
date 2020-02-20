import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './book.scss'
import './../../theme/custom-theme.scss'

import { AtCard, AtSwipeAction } from 'taro-ui'

class Book extends Component {

  onClickButton(event){
    let that = this
    if(event.text === '设置'){
      
    }
    if(event.text === '目录'){
      Taro.navigateTo({
        url: './../../pages/catalogue/catalogue?name=' + that.state.item.name + '&book=' + that.state.item.book
      })
    }
  }

  onClick(){
    const{item} = this.state
    console.log(this.state)
    Taro.navigateTo({
      url: './../../pages/read/read?name=' + item.name + "&book=" + item.book + "&page=index.json"
    })
  }

  render () {
    if(!this.props.item){
      return <View/>
    }

    const{item, onClick} = this.props

    this.state.item = item

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
            <AtCard extra={item.author} title={item.name} onClick={this.onClick.bind(this)}>{item.description}</AtCard>
          </AtSwipeAction>
        </View>
      )
    }
  }
}
export default Book;
