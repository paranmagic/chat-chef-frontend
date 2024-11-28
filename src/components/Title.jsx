import React from 'react'

const Title = ({mainMsg, subMsg}) => {
  return (
    <div className="px-2 pt-6">
        <h1 className="text-4.5xl font-black text-white">{mainMsg}</h1>
        { subMsg && <span className="block text-sm mt-3 text-white break-keep pr-9">
        {subMsg}
        </span>}
    </div>
  )
}

export default Title