import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

import { AtList } from 'taro-ui'
import { BookItem } from '../../common/item/book'

import api from './../../common/api/api'

export default class Index extends Component {

  config: Config = {
    navigationBarTitleText: '首页',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ef5350',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: true
  }
  
  constructor () {
    super(...arguments)
    this.state = {
      list : null
    }
  }

  onShareAppMessage(){
    console.log('Share')
  }

  componentDidMount () {
    this.beginLoadData()
  }

  beginLoadData(){
    Taro.stopPullDownRefresh()
    Taro.showLoading({
      title: '加载中'
    })
    this.loadData()
  }

  onPullDownRefresh(){
    this.beginLoadData()
  }

  loadData(){
    api.get('index/index.json').then(json=>{
      this.setState({
        list: json.data.list
      })
      Taro.hideLoading()
    })
  }

  render () {
    const{list} = this.state
    
    if(list){
      const itemList = list.map((item)=>{
        return <BookItem item={item}/>
      })
      return (
        <View className='index'>
          <AtList hasBorder={false}>
            {itemList}
          </AtList>
          <View className='empty'/>
        </View>
      )
    }

    return (
      <View className='index'></View>
    )
  }
}
