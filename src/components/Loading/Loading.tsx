import React from 'react'

import css from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={css.loadingContainer}>
      <div className={css.loading}/>
      <div className={css.text}>Loading</div>
    </div>
  )
}

export default Loading
