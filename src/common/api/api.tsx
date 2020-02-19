import Taro from '@tarojs/taro'

export default {
  get(path){
    const base_url = 'https://ctc.renyuzhuo.cn/'

    return Taro.request({
      url: base_url + path
    }).catch(error=>{
      console.log(error)
    })
  }
}
