import Taro from '@tarojs/taro'

export default {
  get(path){
    const base_url = 'https://ctc.renyuzhuo.cn/'

    return Taro.request({
      url: base_url + path
    }).catch(error=>{
      Taro.hideLoading()
      Taro.showToast({
        title: '网络错误',
        icon: "none",
        duration: 1000
      })
      console.log(error)
    })
  }
}
