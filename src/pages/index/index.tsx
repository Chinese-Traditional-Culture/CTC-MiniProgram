import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

import { AtList, AtListItem } from 'taro-ui'
import { BookItem } from '../../common/item/book'

export default class Index extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      list : null
    }
  }

  componentWillMount () { }

  componentDidMount () { 
    Taro.request({
      url:'https://ctc.renyuzhuo.cn/index/index.json'
    }).then(json=>{
      console.log(json)
      console.log(json.data.list)
      this.setState({
        list: json.data.list
      })
    }).catch(error=>{
      console.log(error)
    })
  }

  config: Config = {
    navigationBarTitleText: '首页',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ef5350',
    navigationBarTextStyle: 'white'
  }

  handleClick(item){
    console.log(item)
    Taro.navigateTo({
      url: './../read/read'
    })
  }

  render () {
    const{list} = this.state
    
    if(list){
      const itemList = list.map((item, index)=>{
        return <BookItem item={item} onClick={this.handleClick.bind(this, item)} />
      })
      return (
        <View className='index'>
          <AtList>
            {itemList}
          </AtList>
          <View className='empty'/>
        </View>
      )
    }

    return (
      <View className='index'>
      </View>
    )
  }
}
