import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Message } from '@alifd/next';
import './index.scss';

export default class index extends Component {
    static propTypes = {
        hasMask: PropTypes.bool,
        title: PropTypes.string,
        className: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
        footerAlign: PropTypes.string,
        footerActions: PropTypes.array,
        okButtonLoading: PropTypes.bool, //当okButtonLoading属性设置后，okButton的loading状态通过该属性管理
        onClose: PropTypes.func,
        onClosed: PropTypes.func,
        onOk: PropTypes.func, //parent component return a promise, success后 关闭modal
        okText: PropTypes.string, //确定按钮显示的文字
        cancelText: PropTypes.string, //取消按钮显示的文字
        bodyStyle: PropTypes.object,
        children: PropTypes.any,
        footer: PropTypes.any
    };

    static defaultProps = {
        hasMask: true,
        title: '',
        width: '400',
        height: '320',
        footerAlign: 'right',
        footerActions: ['cancel', 'ok']
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false
        };
    }

    openModal = () => {
        this.setState({
            visible: true
        });
    };

    closeModal = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
        this.setState({
            visible: false,
            loading: false
        });
    };

    handleCloseButtonOnClick = () => {
        this.closeModal();
    };

    handleOnAfterClose = () => {
        if (this.props.onClosed) {
            this.props.onClosed();
        }
    };

    handleOkButtonOnClick = () => {
        if (this.props.onOk) {
            if (typeof this.props.okButtonLoading == 'undefined') {
                this.setState({
                    loading: true
                });
                this.props
                    .onOk()
                    .then((data) => {
                        if (data) {
                            let { message } = data;
                            if (message && message != '') {
                                Message.success(data.message);
                            }
                        }
                        this.setState(
                            {
                                loading: false
                            },
                            () => {
                                this.handleCloseButtonOnClick();
                            }
                        );
                    })
                    .catch((error) => {
                        if (error) {
                            let { message } = error;
                            if (message && message != '') {
                                Message.error(error.message);
                            }
                        }

                        this.setState({
                            loading: false
                        });
                    });
            } else {
                this.props.onOk();
            }
        }
    };

    render() {
        let modalWidth = '';
        let modalHeight = '';

        if (
            this.props.width.indexOf('%') > 0 ||
            this.props.width.indexOf('px') > 0 ||
            this.props.width.indexOf('PX') > 0
        ) {
            modalWidth = this.props.width;
        } else {
            modalWidth = this.props.width + 'px';
        }

        if (
            this.props.height.indexOf('%') > 0 ||
            this.props.height.indexOf('px') > 0 ||
            this.props.height.indexOf('PX') > 0
        ) {
            modalHeight = this.props.height;
        } else {
            modalHeight = this.props.height + 'px';
        }

        const okProps = {
            loading: this.state.loading,
            children: this.props.okText ? this.props.okText : '确定'
        };

        const cancelProps = {
            disabled: this.state.loading,
            children: this.props.cancelText ? this.props.cancelText : '取消'
        };

        let closeable = '';
        if (this.state.loading) {
            closeable = false;
        } else {
            closeable = 'close';
        }

        return (
            <Dialog
                className={this.props.className ? this.props.className : ''}
                title={this.props.title}
                visible={this.state.visible}
                okProps={okProps}
                cancelProps={cancelProps}
                closeable={closeable}
                hasMask={this.props.hasMask}
                footer={this.props.footer}
                footerActions={this.props.footerActions}
                onClose={this.handleCloseButtonOnClick}
                onCancel={this.handleCloseButtonOnClick}
                afterClose={this.handleOnAfterClose}
                onOk={this.handleOkButtonOnClick}
                shouldUpdatePosition={true}
            >
                <div
                    style={{
                        width: modalWidth,
                        height: modalHeight,
                        // overflow: 'auto',
                        // overflowY: 'auto',
                        // overflowX: 'hidden',
                        // overflowY: 'hidden',
                        paddingLeft: 12,
                        paddingRight: 12,
                        overflow: 'auto',
                        ...this.props.bodyStyle
                    }}
                    className="scrollbar"
                >
                    {this.props.children}
                </div>

                <style>
                    {`
                        .next-dialog-body {
                            padding-left: 4px !important;
                            padding-right: 4px !important;
                        }
                        `}
                </style>
            </Dialog>
        );
    }
}
