import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './artical.scss'

export default class artical extends Component {
  render () {
    const{markdown} = this.props

    if(!markdown){
      return <View/>
    }

    let lines = markdown.split('\n')

    let arti = lines.map((item)=>{
      if(item.indexOf('###') == 0){
        return <View className='at-article__h3'>{item.replace('###', '')}</View>
      } else if(item.indexOf('##') == 0){
        return <View className='at-article__h2'>{item.replace('##', '')}</View>
      } else if(item.indexOf('#') == 0){
        return <View className='at-article__h1'>{item.replace('#', '')}</View>
      } else if(item.indexOf('info:') == 0){
        return <View className='at-article__info'>{item.replace('info:', '')}</View>
      } else if(item.indexOf('p:') == 0){
        return <View className='at-article__p'>{item.replace('p:', '')}</View>
      } else if(item.indexOf('item:') == 0){
        return <View className='at-article__p'>· {item.replace('item:', '')}</View>
      } else if(item.indexOf('check:') == 0){
        return <View>□ {item.replace('check:', '')}</View>
      } else if(item.indexOf('title:') == 0){
        return <View className='article__h1'>{item.replace('title:', '')}</View>
      } else if(item.indexOf('author:') == 0){
        return <View className='at-article__info'>{item.replace('author:', '')}</View>
      } else if(item.indexOf('button:') == 0){
        return <Button className='button' open-type="contact" >{item.replace('button:', '')}</Button>
      } else if(item.indexOf('img:') === 0){
        return <Image className='at-article__img' src={item.replace('img:', '')} mode='widthFix' />
      }
      return <View className='at-article__p'>{item}</View>
    })

    return (
      <View className='.at-article'>
        {arti}
      </View>
    )
  }
}
