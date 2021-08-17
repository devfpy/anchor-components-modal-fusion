<!--
 * @Author: devfpy
 * @Date: 2021-08-17 18:48:58
 * @LastEditTime: 2021-08-17 19:49:45
 * @LastEditors: devfpy
 * @Description:
-->

# anchor-components-modal-fusion

> anchoremc component libs modal

[![NPM](https://img.shields.io/npm/v/anchor-components-modal-fusion.svg)](https://www.npmjs.com/package/anchor-components-modal-fusion) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save anchor-components-modal-fusion
```

## Usage

```jsx
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
```

## License

MIT © [https://github.com/devfpy](https://github.com/https://github.com/devfpy)
