import React, { useRef } from 'react';
import classNames from 'classnames';


export enum AlertType {
  Success = 'success',
  Danger = 'danger',
  Default = 'default',
  Warning = 'warning'
}

interface BaseAlertProps {
  title?: string;
  description?: string;
  className?: string;
  alertType?: AlertType;
  onClose?: () => void;
  closeable?: boolean;
}


export type AlertProps = BaseAlertProps & React.HTMLAttributes<HTMLElement>

const Alert: React.FC<AlertProps> = (props) => {
  const alertRef = useRef<HTMLDivElement>(null)
  const {
    title,
    description,
    alertType,
    className,
    onClose,
    closeable,
    ...restProps
  } = props;

  //btn, btn-lg, btn-primary
  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType,
    'alert-hasDescription': description
  },'zoom-in-top-appear-done','zoom-in-top-enter-done');
  return(
    <div
      ref={alertRef}
      className={classes}
      {...restProps}
    >
      <span className='alert-title'>{title}</span>
      {description && <p className='alert-description'>{description}</p>}
      {closeable && 
      <span 
        onClick={() => {
          if (alertRef.current) {
            alertRef.current.className = alertRef.current.className + ' disapper'
          }
          onClose && onClose();
        }} 
        className='alert-close'
      >
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11 viking-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
      </span>}
    </div>
  )
}

Alert.defaultProps = {
  title: '请指定标题',
  alertType: AlertType.Default,
  closeable: true
}

export default Alert;