import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import './painter.scss'

export default class Painter extends Component {

  config = {
    usingComponents: {
      'painter': './../../common/painter/painter'
    }
  }

  static propTypes = {
    data: PropTypes.object,
    save: PropTypes.bool,
    onPainterFinished: PropTypes.func
  }

  static defaultProps = {
    data: null,
    save: false,
    onPainterFinished: ()=>{}
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  onImgOK(e) {
    const { save } = this.props
    if (save) {
      this.saveImageToPhotos(e.detail.path)
    }
    Taro.hideLoading()
    this.props.onPainterFinished()
  }

  onImgErr(e) {
    Taro.hideLoading()
    this.props.onPainterFinished()
  }

  saveImageToPhotos (filePath) {
    let that = this
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success () {
              that.saveImage(filePath)
            },
            fail() {
              Taro.showModal({
                title: '提示',
                content: '保存图片需要您的授权',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#7f7f7f',
                confirmText: '去设置',
                confirmColor: '#ef5350',
                success(modalRes) {
                  if (modalRes.confirm) {
                    Taro.openSetting()
                  }
                }
              })
            }
          })
        } else {
          that.saveImage(filePath)
        }
      }
    })
  }

  saveImage (filePath) {
    Taro.saveImageToPhotosAlbum({
      filePath: filePath,
      success: () => {
        Taro.showToast({
          title:'图片已保存',
          icon: 'none',
          duration: 2500
        })
      },
      fail: () => {
        Taro.showToast({
          title:'图片保存失败',
          icon: 'none',
          duration: 2500
        })
      }
    })
  }

  render() {
    const { data } = this.props
    if (!data) return <View />
    return (
      <View>
        <painter palette={data} onImgOK={this.onImgOK} onImgErr={this.onImgErr} />
      </View>
    )
  }
}
