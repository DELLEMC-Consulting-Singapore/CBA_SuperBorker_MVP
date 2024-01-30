import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import { Avatar, Card, Skeleton, Switch, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Meta } = Card
const { Paragraph } = Typography

export const DevBox = () => {
  return (
    <>
      <Card
        style={{
          width: '100%',
          'min-height': '11rem',
          padding: '0',
          'background-color': '#f7f7f7',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '30px',
          }}
        >
          <div class="dds__icon--round">
            <i class="dds__icon dds__icon--hyper-converged-infrastructure dds__icon--round-color"></i>
          </div>

          <Paragraph
            style={{
              'font-weight': 'normal',
              'font-size': '42px',
              margin: '10px 0px 0px 50px',
            }}
          >
            DevBox
          </Paragraph>
        </div>
      </Card>

      <Card
        style={{ width: 300, marginTop: 16 }}
        cover={
          <img
            alt="example"
            src={window.location.origin + '/products/LibShelf.png'}
            style={{ padding: '25px' }}
          />
        }
        actions={[
          <Link to={'/devbox/request-vm'}>
            <a className="anchor-tag">
              Explore
              <i
                class="dds__icon--arrow-right"
                style={{
                  cursor: 'pointer',
                  'font-size': '20px',
                }}
              ></i>
            </a>
          </Link>,
        ]}
      >
        {/* <Meta
    //   avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="VM"
      description="Assigns a pre-provisioned VM with root/admin to the user for 48 hours"
    /> */}
        <h5
          style={{
            color: '#0e0e0e',
            'font-size': '20px',
            'font-weight': '600',
            margin: 0,
          }}
        >
          VM
        </h5>
        <Paragraph
          style={{
            color: '#0e0e0e',
            'font-size': '16px',
            margin: 0,
          }}
        >
          Assigns a pre-provisioned VM with root/admin to the user for 48 hours
        </Paragraph>
      </Card>
    </>
  )
}
