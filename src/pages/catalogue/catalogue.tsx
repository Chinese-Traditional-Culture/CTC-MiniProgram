import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './catalogue.scss'

import api from './../../common/api/api'

export default class Catalogue extends Component {
  config: Config = {
    navigationBarTitleText: '目录',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ef5350',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: true
  }

  componentDidMount(){
    const { name, book } = this.$router.params
    Taro.setNavigationBarTitle(name)
    api.get(book + '/catalogue.json').then(response=>{
      let json = response.data
      console.log(json)
    })
  }

  render () {
    return (
      <View className='catalogue'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
