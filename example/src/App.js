/*
 * @Author: devfpy
 * @Date: 2021-08-17 18:48:58
 * @LastEditTime: 2021-08-17 19:43:52
 * @LastEditors: devfpy
 * @Description:
 */
import React, { Component } from 'react'
import { ModalComponent } from 'anchor-components-modal-fusion'
import { Button } from '@alifd/next'

export default class App extends Component {
  handleButtonOnClick = () => {
    this.modalComponent.openModal()
  }
  render() {
    return (
      <div style={{ padding: 15 }}>
        <Button type={'primary'} onClick={this.handleButtonOnClick}>
          打开Modal
        </Button>
        <ModalComponent
          ref={(node) => (this.modalComponent = node)}
          title='demo'
          width={'460'}
          height={'320'}
        >
          <div style={{ textAlign: 'center' }}>我是弹窗内容</div>
        </ModalComponent>
      </div>
    )
  }
}
