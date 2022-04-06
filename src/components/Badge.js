import React from 'react'

const Badge = ({children}) => {

    const colorKey = {
        Fashion : '#0d6efd',
        Travel : '#198754',
        Fitness : '#dc3545',
        Food : '#ffc107',
        Tech : '#0DCAF0',
        Sports : '#212529'
    }
  return (
    <div>
        <h5 href="#" className="btn btn-primary btn-sm align-center" style={{backgroundColor : colorKey[children]}}>{children}</h5>
    </div>
  )
}

export default Badge

// #0d6efd primary
// #6c757d secondary
// #198754 success
// #dc3545 Danger
// #ffc107 warning
// #0DCAF0 info
// #212529 dark