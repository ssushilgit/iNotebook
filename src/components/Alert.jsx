import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {
        if (word ==='danger'){
            word = 'error'
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice()
            ;
    }
    return (
        <div style={{ height: '40px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong> {capitalize(props.alert.type)} </strong> : {props.alert.msg}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        </div>
    )
}