import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './canvas.scss'

import {Painter} from './../painter/painter'

export default class Canvas extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posterData: null
    }
  }

  componentDidMount () {
    this.loadWXACode()
  }

  loadWXACode() {
    this.generatePoster()
  }

  

  render () {
    const { posterData } = this.state
    return (
      <View className='content'>
        {
          posterData && <Painter style='position:fixed;top:-9999rpx' data={posterData} save onPainterFinished={this.onPainterFinished.bind(this)} />
        }
      </View>
    )
  }
}
