import React from 'react'
import classnames from 'classnames'

export const enum ButtonSize {
    Large = 'lg',
    Small = 'sl',
}

export const enum ButtonType {
    Primary = "primary",
    Default = "defalut",
    Danger = 'danger',
    link = 'link'
}
/**
 *  button按钮 type属性，autofocus属性，onclick属性等
 *  a标签，target='_blank'属性等
 *  不可能全部一一列举，样式库主要解决ui问题，对于默认属性以及事件是不处理
 */
interface ButtonBaseProps  {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children?: React.ReactNode,
    url?: string
}
// 且 => NativeButtonProps既要有ButtonBaseProps属性，也要有React.ButtonHTMLAttributes<HTMLElement>
type NativeButtonProps = ButtonBaseProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = ButtonBaseProps & React.AnchorHTMLAttributes<HTMLElement>
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

// 当使用该组件时，传入的props会被ButtonProps接受
const Button: React.FC<ButtonProps> = (props) => {
    const {btnType, size, disabled, children, url,className,  ...restProps} = props;
    // btnType, size, disabled这三个要转换到样式，体现在classname上，所有button需要一个.btn基类
    // 对于类型，尺寸，转换成.btn-lg, .btn-dange类，防止与其他组件样式冲突
    const classes = classnames('btn', {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        [`${className}`]: className,
        // 对于disable属性，a标签可以添加classname，但是button需要直接加在标签上
        // 如果条件是false，就不会有该classname，就不会影响button的样式类
        'disabled': (btnType === ButtonType.link) && disabled
    })
    // herf 属性不应该放入classes中，因为button不需要，需要单独a使用
    if(btnType === ButtonType.link){
        return <a {...restProps} className={classes}  href={url}>{children}</a>
    }else{
        return <button {...restProps} className={classes} disabled={disabled}>{children}</button>
    }
}

// .btn 包括了默认大小
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button