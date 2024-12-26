// 单元测试总体分两大类，默认 、 包含属性


import {render, screen, fireEvent} from '@testing-library/react'
import Alert, {AlertProps} from './alert'


// 默认属性
const defaultTitleProps: AlertProps = {
    title: 'first title',
    closable: true
}

// 复杂场景，各种props传入
const testProps: AlertProps = {
    ...defaultTitleProps,
    description: 'second title',
    type: 'danger',
    closable: false,
}

// 显示按钮，然后关闭事件放一起
const closeProps: AlertProps = {
    ...defaultTitleProps,
    closable: true,
    onClose: jest.fn()
}


describe('test alert compoenent', () => {
    // 当只传入title属性时候，存在.viking-alert-default，
    it('should render correct default alert', () => {
        const {container} = render(<Alert {...defaultTitleProps}></Alert>)
        // 判断title对应的dom节点正常渲染，关闭按钮dom正常渲染
        let titleEle = container.querySelector('.viking-alert-title')
        expect(titleEle).toBeInTheDocument()
        // 判断关闭按钮正常显示
        let closeEle = container.querySelector('.viking-alert-close')
        expect(closeEle).toBeInTheDocument()
    })
    it('should render correct different props', () => {
        // 当存在description，该dom渲染，其次title的dom需要加粗
        const {container} = render(<Alert {...testProps}></Alert>)
        // 期望description dom节点存在
        let descriptionEle = container.querySelector('.viking-alert-desc')
        expect(descriptionEle).toBeInTheDocument()
        // 期望title字体加粗,通过判断dom是是否有某个class(通过text获取)，或者通过直接获取该class判断是否存在文档中
        let titleEle = container.querySelector('.bold-title')
        expect(titleEle).toBeInTheDocument();
        // closable=false, 是否close按钮消失
        let closeEle = container.querySelector('.viking-alert-close')
        expect(closeEle).not.toBeInTheDocument()
        // 针对danger而言，根dom上增加.viking-alert-danger属性
        let rootEle = container.querySelector('.viking-alert');
        expect(rootEle).toHaveClass('viking-alert-danger')
    })
    it('should render event props', () => {
        const {container, getByText} = render(<Alert {...closeProps}></Alert>)
         // 判断close按钮存在
         let closeEle = container.querySelector('.viking-alert-close')
         expect(closeEle).toBeInTheDocument()
         // 触发事件
         let closeEleByText = getByText('close')
         fireEvent.click(closeEleByText)
         // 关闭整个alert，执行回调
         let rootEle = container.querySelector('.viking-alert');
         expect(rootEle).not.toBeInTheDocument();
         expect(closeProps.onClose).toHaveBeenCalled()
    })

})