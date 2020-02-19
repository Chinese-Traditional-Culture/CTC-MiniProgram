import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import './theme/custom-theme.scss'
import './theme/custom.scss'

class App extends Component {

  config: Config = {
    pages: [
      'pages/index/index',
      'pages/read/read',
      
    ],
    window: {
      navigationBarTitleText: 'CTC 古籍阅读',
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ef5350',
      navigationBarTextStyle: 'white'
    }
  }

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
