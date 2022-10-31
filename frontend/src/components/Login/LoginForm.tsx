import './Login.scss';
import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';

export interface LoginFormProps {
    onSubmit: (e: React.FormEvent) => void,
    title: string,
    children: JSX.Element
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmit, title, children}) => {

    return (
        <div className="Auth-form-container wc-logo">
          <form className="Auth-form" onSubmit={onSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">{title}</h3>
              {children}
            </div>
          </form>
        </div>
    )
  }
export default LoginForm