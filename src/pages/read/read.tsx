import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './read.scss'

export default class Read extends Component {

  config: Config = {
    navigationBarTitleText: '阅读',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ef5350',
    navigationBarTextStyle: 'white'
  }

  render () {
    return (
      <View className='read'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
