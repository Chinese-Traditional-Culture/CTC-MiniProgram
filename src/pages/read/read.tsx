import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './read.scss'
import "./../../theme/custom-theme.scss";

import api from './../../common/api/api'

import { AtPagination, AtCard } from 'taro-ui'

export default class Read extends Component {

  config: Config = {
    navigationBarTitleText: '阅读',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ef5350',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: true
  }

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

  onShareAppMessage(){
    console.log('Share')
  }

  componentDidMount(){
    let that = this
    let { name, book, page, isLoadSave } = this.$router.params

    Taro.setNavigationBarTitle({
      title:name
    })
    Taro.showLoading({
      title: '加载中'
    })

    if(isLoadSave){
      console.log(isLoadSave)
      Taro.getStorage({
        key: book + '_page',
        success: function(res){
          console.log('res', res)
          console.log(res.data)
          page = res.data
        },
        complete: function(){
          that.setState({
            name: name,
            book: book,
            page: page
          })
          that.loadData(book, page)
        }
      })
    }else{
      that.setState({
        name: name,
        book: book,
        page: page
      })
      that.loadData(book, page)
    }
  }

  beginLoadData(){
    const{book, page} = this.state
    Taro.stopPullDownRefresh()
    Taro.showLoading({
      title: '加载中'
    })
    this.loadData(book, page)
  }

  onPullDownRefresh(){
    this.beginLoadData()
  }

  loadData(book, page){
    let that = this

    api.get(book + '/' + page).then(response=>{
      Taro.setStorage({
        key: book + '_page',
        data: page
      })

      let json = response.data
      Taro.setNavigationBarTitle({
        title: json.title
      })
      that.setState({
        description: json.description,
        next: json.next,
        path: json.path,
        prev: json.prev,
        text: json.text,
        title: json.title,
        total: json.total,
        current: json.current
      })

      Taro.hideLoading()
    })
  }
  
  onPageChange(data){
    if(data.type === 'next'){
      this.nextPage()
    }else if(data.type === 'prev'){
      this.prevPage()
    }
  }

  nextPage(){
    const{book, next} = this.state
    this.state.page = next
    this.loadData(book, next)
  }

  prevPage(){
    const{book, prev} = this.state
    this.state.page = prev
    this.loadData(book, prev)
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
