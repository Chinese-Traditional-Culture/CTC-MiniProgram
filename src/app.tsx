import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

import 'taro-ui/dist/style/index.scss'

import './theme/custom-theme.scss'
import './theme/custom.scss'

class App extends Component {

  config: Config = {
    pages: [
      'pages/read/read',
      'pages/index/index',
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
