/**
 * 1. 支持关闭事件回调 afterClose
 * 2. 支持type 不用主题颜色区分 type类型 success 、default、danger、warning
 * 3. 支持二级标题description 
 * 4. 支持关闭按钮可配置 closable 
 */
import React, { useState } from 'react'
import classNames from 'classnames';

// 定义类型，对于字面量也就是指定可选的字面量，通过type定义，interface中使用
type AlertType = 'success' | 'default' | 'danger' | 'warning'

// 这个interface才是定义props接受的数据格式
export interface AlertProps {
    title: string; // must provide
    description?: string;
    type?: AlertType;
    onClose?: () => void;
    closable?: boolean;
}

const Alert: React.FC<AlertProps> = (props) =>{
    const [hide, setHide] = useState(false)
    // 解析props
    const {title, description, type='default', onClose, closable=true} = props
    // type类型不同，整个容器修改背景色 + 字体颜色需要全局
    const classes = classNames('viking-alert', {
        [`viking-alert-${type}`]: type
    })
    // title 需要加粗显示,如果传入descript则title需要加粗
    const titleclass = classNames('viking-alert-title', {
        [`bold-title`]: description
    })

    const handClose = () => {
        debugger
        setHide(true)
        // 然后回调判断是否存在,兼容性在内部包裹，而不是让使用者处理
        if(onClose){
            onClose()
        }
    }

    return (
        !hide ? <div className={classes}>
        <span className={titleclass}>{title}</span>
        {description && <p className="viking-alert-desc">{description}</p>}
        {/* 对于组件内部事件而言，点击是组件内部触发，但是函数由用户传入 */}
        {/* 如果closeable存在，那么就会存在点击事件 */}
        {/* 这里需要判断用户是否传入onClose函数，onclick在antd官网中叫做关闭之后的回调，先触发关闭，再触发回调 */}
        {closable && <span className="viking-alert-close" onClick={handClose}>close</span>}
    </div> : null
    )
}

export default Alert
