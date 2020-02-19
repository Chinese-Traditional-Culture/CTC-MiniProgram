import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './read.scss'
import "./../../theme/custom-theme.scss";

import { AtPagination, AtCard } from 'taro-ui'

export default class Read extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      description: '加载中',
      next: null,
      path: null,
      prev: null,
      text: '加载中',
      title: '加载中',
      total: 0,
      current: 0
    }
  }

  config: Config = {
    navigationBarTitleText: '阅读',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ef5350',
    navigationBarTextStyle: 'white'
  }

  componentDidMount(){
    let that = this
    const { name, path, page } = this.$router.params
    console.log(name)
    console.log(path)
    Taro.setNavigationBarTitle({
      title:name
    })
    Taro.request({
      url: 'https://ctc.renyuzhuo.cn/' + path + '/' + page
    }).then(response=>{
      let json = response.data
      Taro.setNavigationBarTitle({
        title: json.title
      })
      console.log(json)
      that.setState({
        description: json.description,
        next: json.next,
        path: json.path,
        previous: json.previous,
        text: json.text,
        title: json.title,
        total: json.total
      })
    }).catch(error=>{
      console.log(error)
    })
  }

  onPageChange(data){
    if(data.type === 'next'){
      nextPage()
    }else if(data.type === 'prev'){
      prevPage()
    }
  }

  render () {
    const{ description, next, path, previous, text, title, total } = this.state
    return (
      <View className='read'>
        <View className='text'>
          <AtCard title='原文' >{text}</AtCard>
        </View>
        <View className='text'>
          <AtCard title='解析' >{description}</AtCard>
        </View>
        <View className='empty'/>
        <View className='page'>
          <AtPagination className='pagination' total={total} pageSize={1} current={1} icon=true onPageChange={this.onPageChange.bind(this)} />
        </View>
      </View>
    )
  }
}
