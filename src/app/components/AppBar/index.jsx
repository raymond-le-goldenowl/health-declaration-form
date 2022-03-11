import React from 'react';

import { Dropdown, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons/lib/icons';

import { routes } from 'app/config/router';

import textLogoBoYTe from 'app/assets/images/textLogoBoYTe.png';
import imageLogoBoYTe from 'app/assets/images/imageLogoBoYTe.png';

import './styles.scss';
import { Link } from 'react-router-dom';

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
								{Object.values(routes).map(
									route =>
										route.content && (
											<Menu.Item key={route.id}>
												<Link to={route.path}>
													{route.icon}
													<span className='link-text'>{route.content}</span>
												</Link>
											</Menu.Item>
										)
								)}
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
