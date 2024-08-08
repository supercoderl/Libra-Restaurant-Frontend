import { GithubOutlined } from '@ant-design/icons'
import React from 'react'

export default function DashboardFooter() {
  return (
    <div className="footer">
      <GithubOutlined />
      <a href='https://github.com/h2oiswater/nextjs-ts-antd-starter' style={{ margin: 5 }}>Github</a>
    </div>
  )
}