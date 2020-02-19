import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

import { AtList, AtButton } from 'taro-ui'
import { BookItem } from '../../common/item/book'

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
    Taro.request({
      url:'https://ctc.renyuzhuo.cn/index/index.json'
    }).then(json=>{
      this.setState({
        list: json.data.list
      })
      Taro.hideLoading()
    }).catch(error=>{
      console.log(error)
    })
  }

  handleClick(item){
    console.log(item)
    Taro.navigateTo({
      url: './../read/read?name=' + item.name + "&book=" + item.book + "&page=index.json"
    }).then(json=>{
      console.log(json)
    })
  }

  render () {
    const{list} = this.state
    
    if(list){
      const itemList = list.map((item)=>{
        return <BookItem item={item} onClick={this.handleClick.bind(this, item)} />
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
      <View className='index'>
      </View>
    )
  }
}
