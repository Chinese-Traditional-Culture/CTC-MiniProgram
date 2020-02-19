import Taro, { Component } from '@tarojs/taro'

export default class Api extends Component {
  get(path){
    const base_url = 'https://ctc.renyuzhuo.cn'

    Taro.request({
      url: base_url + path
    }).then(response=>{

    }).catch(error=>{
      console.log(error)
    })
  }
}
