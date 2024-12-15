import React from 'react'
import cn from 'classnames';

function Title({ children, className }) {
  return (
    <div className={cn('flex justify-center items-center w-[340px] h-[43px] rounded-[10px] bg-primary text-white font-semibold text-[17px]', className)}>
      { children }
    </div>
  )
}

export default Title
