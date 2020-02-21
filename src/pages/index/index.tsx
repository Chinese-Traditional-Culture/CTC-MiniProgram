import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

import { AtList } from 'taro-ui'
import { BookItem } from '../../common/item/book'
import {Painter} from './../painter/painter'

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
      list : null,
      posterData: null
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

  saveCallBack(item){
    let that = this
    if(item.ercode){
      that.generatePoster(item, `../../common/img/${item.ercode}`)
    }else{
      that.generatePoster(item, '../../common/img/CTC.png')
    }
  }

  render () {
    const{list, posterData} = this.state
    
    if(list){
      const itemList = list.map((item)=>{
        return <BookItem item={item} saveCallBack={this.saveCallBack.bind(this, item)}/>
      })
      return (
        <View className='index'>
          <AtList hasBorder={false}>
            {itemList}
          </AtList>
          <View className='empty'/>
          {
            posterData && <Painter style='position:fixed;top:-9999rpx' data={posterData} save onPainterFinished={this.onPainterFinished.bind(this)} />
          }
        </View>
      )
    }

    return (
      <View className='index'></View>
    )
  }

  generatePoster(item, path) {
    let name = item.name
    let author = item.author
    let description = item.description

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
          url: `${path}`,
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
}
