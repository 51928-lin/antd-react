// import { act } from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button, {ButtonProps, ButtonType, ButtonSize} from './button'
import exp from 'constants'

const defaultProps = {
    onClick: jest.fn()
}

// props的取值可能性很多，应该使用ButtonProps这个类型
const testProps: ButtonProps = {
    btnType: ButtonType.Danger,
    size: ButtonSize.Large,
    className: 'k___class'
}

const disabledProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test button component', () => {
    it('should render default component', () => {
        render(<Button {...defaultProps}>hello button</Button>)
        let element = screen.getByText('hello button')
        // 验证该dom节点存在文档中
        expect(element).toBeInTheDocument()
        // 验证按钮类型是button
        expect(element.tagName).toEqual('BUTTON')
        // 默认组件是否具备 btn btn-default样式类
        expect(element).toHaveClass('btn btn-default')
        // 模拟用户点击事件触发
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    // 传入props后的样式
    it('should render props component', () => {
        // 需要引用枚举类型 传入三个属性值，该button应该输出元素上带有classname的标志
        render(<Button {...testProps}>props button</Button>)
        let element = screen.getByText('props button')
        expect(element).toBeInTheDocument;
        // 期望dom节点上有三个classname
        expect(element).toHaveClass('btn btn-danger btn-lg k___class')
    })
    // link单独测试
    it('should render a-link component', () => {
        render(<Button btnType={ButtonType.link}>link</Button>)
        let element = screen.getByText('link');
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        // a标签样式需要 btn btn-link
        expect(element).toHaveClass('btn btn-link')
    })
    // 禁用状态测试, 需要样式有disabled属性，且鼠标无法点击操作
    // 单元测试主要目的是js逻辑，或者是dom是是否有对应的class属性，
    it('when disabled is true, the component should not click', () => {
        render(<Button {...disabledProps}>disabled</Button>)
        let element = screen.getByText('disabled');
        if(element.tagName === 'BUTTON'){
            expect((element as HTMLButtonElement).disabled).toBeTruthy()
        }
        if(element.tagName === 'A'){
            expect(element as HTMLAnchorElement).toHaveClass('disabled')
        }
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled()
        
    })
})