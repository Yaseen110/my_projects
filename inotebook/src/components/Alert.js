import React from 'react'

function Alert(props) {
    const {alert}=props
    return (
        alert && <div className="fixed-top">
            <div className={`alert alert-${alert.type}`} role="alert">
            {alert.msg}
            </div>
        </div>
    )
}

export default Alert