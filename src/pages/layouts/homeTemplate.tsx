import React, { useMemo } from 'react'

type Props = {
  pageTitle: string
}

const HomeTemplate: React.FC<Props> = (props: Props) => {
  useMemo(() => (document.title = props.pageTitle), [props.pageTitle])
  return (
    <div>homeTemplate</div>
  )
}

export default HomeTemplate