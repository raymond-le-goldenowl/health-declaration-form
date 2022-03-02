import React from 'react';

import { Dropdown, Menu } from 'antd';
import { ClockCircleOutlined, FileAddOutlined, MenuOutlined } from '@ant-design/icons/lib/icons';

import textLogoBoYTe from 'app/assets/images/textLogoBoYTe.png';
import imageLogoBoYTe from 'app/assets/images/imageLogoBoYTe.png';

import './styles.scss';

export default function AppBar() {
	return (
		<div className='app-bar-wrapper'>
			<div className='app-bar'>
				<div className='logo-box'>
					<a href='#!'>
						<img src={imageLogoBoYTe} alt={`Logo`} height={45} />
					</a>
					<a href='#!' className='logo-lg'>
						<span>Khai báo y tế điện tử tại bệnh viện</span>
					</a>
				</div>

				<div className='logo-sm'>
					<img src={textLogoBoYTe} alt={`Khai báo y tế điện tử tại bệnh viện`} />
				</div>

				<div className='topnav-menu'>
					<Dropdown
						placement='bottomRight'
						overlay={
							<Menu className='menu-links'>
								<Menu.Item key='0'>
									<a href='#!'>
										<FileAddOutlined />
										<span className='link-text'>Khai báo y tế</span>
									</a>
								</Menu.Item>
								<Menu.Item key='1'>
									<a href='#!'>
										<ClockCircleOutlined />
										<span className='link-text'>Lịch sử khai báo</span>
									</a>
								</Menu.Item>
							</Menu>
						}
						trigger={['click']}
					>
						<MenuOutlined />
					</Dropdown>
				</div>
			</div>
		</div>
	);
}
