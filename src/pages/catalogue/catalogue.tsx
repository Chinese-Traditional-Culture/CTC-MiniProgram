import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './catalogue.scss'

import {CatalogueItem} from './../../common/item/catalogue'
import {AtList} from 'taro-ui'

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
    let that = this
    const { name, book } = this.$router.params
    Taro.setNavigationBarTitle({
      title: name
    })
    api.get(book + '/catalogue.json').then(response=>{
      let json = response.data
      console.log(json)
      that.setState({
        book:json.book,
        list:json.list,
        total:json.total,
        title:json.title
      })
    })
  }

  onClick(item){
    const{ title, book } = this.state
    Taro.navigateTo({
      url: './../read/read?name=' + title + "&book=" + book + "&page=" + item.path
    })
  }

  render () {
    const{list} = this.state

    if(list){
      const itemList = list.map((item)=>{
        return <CatalogueItem item={item} onClick={this.onClick.bind(this, item)}/>
      })
      return (
        <View className='catalogue'>
          <AtList>{itemList}</AtList>
        </View>
      )
    }

    return (
      <View/>
    )
  }
}
