import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './read.scss'
import "./../../theme/custom-theme.scss";

import { AtPagination, AtCard } from 'taro-ui'

export default class Read extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      name: null,
      book: null,
      page: null,

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

  loadData(book, page){
    let that = this
    
    Taro.request({
      url: 'https://ctc.renyuzhuo.cn/' + book + '/' + page
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
        total: json.total,
        current: json.current
      })
    }).catch(error=>{
      console.log(error)
    })
  }

  componentDidMount(){
    const { name, book, page } = this.$router.params
    Taro.setNavigationBarTitle({
      title:name
    })
    this.setState({
      name: name,
      book: book,
      page: page
    })
    this.loadData(book, page)
  }

  onPageChange(data){
    if(data.type === 'next'){
      this.nextPage()
    }else if(data.type === 'prev'){
      this.prevPage()
    }
  }

  nextPage(){

  }

  prevPage(){

  }

  render () {
    const{ description, next, path, previous, text, title, total, current } = this.state
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
          <AtPagination className='pagination' total={total} pageSize={1} current={current} icon=true onPageChange={this.onPageChange.bind(this)} />
        </View>
      </View>
    )
  }
}
