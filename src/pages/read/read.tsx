import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './read.scss'
import "./../../theme/custom-theme.scss";

import api from './../../common/api/api'

import { AtPagination, AtCard } from 'taro-ui'
import { Artical } from './../artical/artical'

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
      current: 0,
      error: false
    }
  }

  onShareAppMessage(){
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
      Taro.getStorage({
        key: book + '_page',
        success: function(res){
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
        current: json.current,
        text_title: json.text_title,
        description_title: json.description_title,
        error: false
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

  onClickError(){
    const{name, book, page} = this.state
    let that = this
    Taro.setClipboardData({
      data: `name: ${name}, book: ${book}, page: ${page}`,
      success: ()=>{
        that.setState({
          error: true
        })
      }
    })
  }

  onClickCallBack(){
    this.setState({
      error: false
    })
  }

  render () {
    const{ description, text, total, current, error, text_title, description_title } = this.state
    return (
      <View className='read'>
        <View className='text'>
          <AtCard title={text_title ? text_title : "原文"} >
            {text}
            {
              !error &&
              <View className='error' onClick={this.onClickError.bind(this)}>报错</View>
            }
            {
              error &&
              <Button className='button' open-type="contact" onClick={this.onClickCallBack.bind(this)}>点击反馈</Button>
            }
          </AtCard>
        </View>
        <View className='text'>
          <AtCard title={description_title ? description_title : "解析"} ><Artical markdown={description}/></AtCard>
        </View>
        <View className='empty'/>
        <View className='page'>
          <AtPagination className='pagination' total={total} pageSize={1} current={current} icon=true onPageChange={this.onPageChange.bind(this)} />
        </View>
      </View>
    )
  }
}
