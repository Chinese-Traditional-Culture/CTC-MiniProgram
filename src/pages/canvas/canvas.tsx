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
    this.generatePoster('../../assets/images/code.png')
  }

  generatePoster() {
    let name = '道德经'
    let author = '老子'
    let description = '《道德经》，又称《老子》，是中国历史上最伟大的名著之一，是道家哲学思想的重要来源。共81章，论述修身、治国、用兵、养生之道，而多以政治为旨归，是中国历史上最伟大的名著之一，是除了《圣经》以外被译成外国文字发布量最多的文化名著。'

    let goodsWords = [
      'Stay hungry. Stay foolish.',
      'Talk is cheap. Show me the code.',
      '生活除了工作，还有诗和远方',
      '愿你出走半生，归来仍是少年',
      'E=mc²'
    ]
    const data = {
      background: '#f7f7f7',
      width: '750rpx',
      height: '900rpx',
      borderRadius: '0rpx',
      views: [
        {
          type: 'rect',
          css: {
            left: '50rpx',
            width: '650rpx',
            top: '50rpx',
            color: '#ffffff',
            height: '700rpx',
            borderRadius: '20rpx',
            shadow: '10rpx 10rpx 5rpx #888888',
          }
        },
        {
          type: 'rect',
          css: {
            left: '50rpx',
            width: '650rpx',
            height: '440rpx',
            top: '50rpx',
            color: '#ef5350',
            borderRadius: '20rpx',
          }
        },
        {
          type: 'text',
          text: `${name}`,
          css: {
            top: '80rpx',
            left: '375rpx',
            align: 'center',
            fontSize: '38rpx',
            color: '#ffffff',
            width: '550rpx',
            maxLines: '1',
          }
        },
        {
          type: 'text',
          text: `作者：${author}`,
          css: {
            top: '150rpx',
            left: '80rpx',
            width: '550rpx',
            maxLines: '1',
            fontSize: '28rpx',
            color: '#ffffff'
          }
        },
        {
          type: 'text',
          text: `简介: ${description}`,
          css: {
            top: '200rpx',
            left: '80rpx',
            width: '550rpx',
            fontSize: '28rpx',
            maxLines: '7',
            color: '#ffffff',
            lineHeight: '36rpx'
          }
        },
        {
          type: 'image',
          url: '../../common/img/DaoDeJing.png',
          css: {
            bottom: '180rpx',
            left: '120rpx',
            width: '200rpx',
            height: '200rpx',
          },
        },
        {
          type: 'text',
          text: '长按识别，开始阅读',
          css: {
            bottom: '290rpx',
            left: '350rpx',
            fontSize: '28rpx',
            color: '#666666'
          }
        },
        {
          type: 'text',
          text: '分享自「 CTC古籍阅读 」',
          css: {
            bottom: '230rpx',
            left: '350rpx',
            fontSize: '28rpx',
            color: '#666666',
          }
        },
        {
          type: 'text',
          text: goodsWords[Math.floor((Math.random() * 5))],
          css: {
            bottom: '60rpx',
            left: '375rpx',
            align: 'center',
            fontSize: '28rpx',
            color: '#666666',
          }
        }
      ],
    }
    this.setState({
      posterData: data
    })
  }

  onPainterFinished() {
    this.setState({
      posterData: null
    })
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
