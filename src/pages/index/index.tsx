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
      url:'https://ctccn.renyuzhuo.cn/index/index.json'
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

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ef5350',
      navigationBarTitleText: '首页',
      navigationBarTextStyle: 'white'
  }

  handleClick(item){
    console.log(item)
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
