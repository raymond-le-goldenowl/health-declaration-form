import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { Col, Input, Row } from 'antd';
import { SyncOutlined } from '@ant-design/icons/lib/icons';

import { declarationTypes } from 'app/services';

import Footer from 'app/components/Footer';
import SelectOption from 'app/components/SelectOption';
import DatePickerCustom from 'app/components/DatePickerCustom';

import './styles.css';

export default function DeclarationForm() {
	const { TextArea } = Input;

	const [diseaseSymptoms, setDiseaseSymptoms] = useState([]);
	const [epidemiologicalFactors, setEpidemiologicalFactors] = useState([]);
	const [nations, setNations] = useState([]);
	const [provinces, setProvinces] = useState([]);
	const [provinceSelected, setProvinceSelected] = useState(null);
	const [districts, setDistricts] = useState([]);
	const [districtSelected, setDistrictSelected] = useState(null);
	const [wards, setWards] = useState([]);
	const [declarationPlaces, setDeclarationPlaces] = useState([]);
	const [captchaText, setCaptchaText] = useState(null);

	const codeRef = useRef();

	useEffect(() => {
		const diseaseSymptomsUrl = `https://kbyt.khambenh.gov.vn/api/v1/trieuchung?q={%22filters%22:{%22$and%22:[{%22trangthai%22:{%22$eq%22:1}}]},%22order_by%22:[{%22field%22:%22thutu_uutien%22,%22direction%22:%22asc%22}]}`;
		const epidemiologicalFactorsUrl = `https://kbyt.khambenh.gov.vn/api/v1/dichte?q={%22filters%22:{%22$and%22:[{%22trangthai%22:{%22$eq%22:1}}]},%22order_by%22:[{%22field%22:%22thutu_uutien%22,%22direction%22:%22asc%22}]}`;
		const nationUrl = `https://kbyt.khambenh.gov.vn/api/v1/quocgia?results_per_page=1000&q={%22filters%22:{%22$and%22:[{%22deleted%22:{%22$eq%22:false}},{%22active%22:{%22$eq%22:1}}]},%22order_by%22:[{%22field%22:%22ten%22,%22direction%22:%22asc%22}]}`;
		const provincesUrl = `https://kbyt.khambenh.gov.vn/api/v1/tinhthanh?results_per_page=100&q={%22filters%22:{%22$and%22:[{%22deleted%22:{%22$eq%22:false}},{%22active%22:{%22$eq%22:1}}]},%22order_by%22:[{%22field%22:%22ten%22,%22direction%22:%22asc%22}]}`;
		const declarationPlacesUrl = `https://kbyt.khambenh.gov.vn/api/v1/donvi_filter?page=1&results_per_page=25&q={%22filters%22:{%22$and%22:[{%22tuyendonvi_id%22:{%22$neq%22:%227%22}},{%22active%22:{%22$eq%22:true}}]},%22order_by%22:[{%22field%22:%22ten%22,%22direction%22:%22asc%22}]}`;

		axios.get(diseaseSymptomsUrl).then(resp => setDiseaseSymptoms(resp.data?.objects || []));
		axios
			.get(epidemiologicalFactorsUrl)
			.then(resp => setEpidemiologicalFactors(resp.data?.objects || []));
		axios.get(nationUrl).then(resp => {
			const data = resp.data?.objects.map(nation => ({
				id: nation.id,
				key: nation.id,
				value: nation.ten,
				text: nation.ten
			}));
			setNations(data);
		});
		axios.get(provincesUrl).then(resp => {
			const data = resp.data?.objects.map(province => ({
				id: province.id,
				key: province.id,
				value: province.ten,
				text: province.ten
			}));
			setProvinces(data);
		});
		axios.get(declarationPlacesUrl).then(resp => {
			const data = resp.data?.objects.map(province => ({
				id: province.id,
				key: province.id,
				value: province.ten,
				text: province.ten
			}));
			setDeclarationPlaces(data);
		});
	}, []);

	useEffect(() => {
		if (provinceSelected !== null) {
			const provinceId = JSON.parse(provinceSelected)?.id;

			const districtsUrl = `https://kbyt.khambenh.gov.vn/api/v1/quanhuyen?results_per_page=30&q={%22filters%22:{%22$and%22:[{%22deleted%22:{%22$eq%22:false}},{%22active%22:{%22$eq%22:1}},{%22tinhthanh_id%22:{%22$eq%22:%22${provinceId}%22}}]},%22order_by%22:[{%22field%22:%22ten%22,%22direction%22:%22asc%22}]}`;
			axios.get(districtsUrl).then(resp => {
				const data = resp.data?.objects.map(district => ({
					id: district.id,
					key: district.id,
					value: district.ten,
					text: district.ten
				}));
				setDistricts(data);
			});
		}
	}, [provinceSelected]);

	useEffect(() => {
		if (districtSelected !== null) {
			const districtId = JSON.parse(districtSelected)?.id;
			const wardsUrl = `https://kbyt.khambenh.gov.vn/api/v1/xaphuong?results_per_page=50&q={%22filters%22:{%22$and%22:[{%22deleted%22:{%22$eq%22:false}},{%22active%22:{%22$eq%22:1}},{%22quanhuyen_id%22:{%22$eq%22:%22${districtId}%22}}]},%22order_by%22:[{%22field%22:%22ten%22,%22direction%22:%22asc%22}]}`;
			axios.get(wardsUrl).then(resp => {
				const data = resp.data?.objects.map(ward => ({
					id: ward.id,
					key: ward.id,
					value: ward.ten,
					text: ward.ten
				}));
				setWards(data);
			});
		}
	}, [districtSelected]);

	return (
		<div id='declaration-form'>
			<h2 className='title-blue'>SỞ Y TẾ TP. HỒ CHÍ MINH</h2>
			<h3 className='title-red'>
				KHAI BÁO THÔNG TIN SAI LÀ VI PHẠM PHÁP LUẬT VIỆT NAM VÀ CÓ THỂ XỬ LÝ HÌNH SỰ
			</h3>

			<form id='form-container'>
				<div className='list-types-declaration'>
					<div className='list-types-declaration-list-radios'>
						{declarationTypes.map(declarationType => {
							return (
								<label key={declarationType.key}>
									<input type='radio' name='declaration-type' value={declarationType.value} />
									<span className='declaration-type-bold'>{declarationType.text}</span>
								</label>
							);
						})}
					</div>

					<div className='btn-reset-data-wrapper'>
						<button type='reset' className='btn-reset-data'>
							<SyncOutlined />
							Nhập lại
						</button>
					</div>
				</div>
				<div>
					<label>
						<span>
							Nơi khai báo <span className='label-red'> (*)</span>:
						</span>
						<SelectOption
							width={'100%'}
							placeholder={'Nhập và chọn nơi khai báo'}
							options={declarationPlaces}
						/>
					</label>
				</div>

				<div>
					<label>
						<span>
							Số điện thoại <span className='label-red'> (*)</span>:
						</span>
						<Input type='number' />
					</label>
				</div>

				<label>
					<span>
						Họ và tên <span className='label-red'> (*)</span>:
					</span>
					<Input type='text' placeholder='Họ và tên' />
				</label>
				<Row gutter={16}>
					<Col className='gutter-row' span={12}>
						<label>
							<span>
								Ngày sinh <span className='label-red'> (*)</span>:
							</span>
							<DatePickerCustom />
						</label>
					</Col>

					<Col className='gutter-row' span={12}>
						<label>
							<span>
								Giới tính <span className='label-red'> (*)</span>:
							</span>
							<Input type='text' value={'Nam'} />
						</label>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col
						className='gutter-row'
						xl={{ span: 6 }}
						lg={{ span: 6 }}
						md={{ span: 12 }}
						xs={{ span: 24 }}
					>
						<label>
							<span>
								Quốc tịch <span className='label-red'> (*)</span>:
							</span>
							<SelectOption width={'100'} options={nations} defaultValue={'Việt Nam'} />
						</label>
					</Col>
					<Col
						className='gutter-row'
						xl={{ span: 6 }}
						lg={{ span: 6 }}
						md={{ span: 12 }}
						xs={{ span: 24 }}
					>
						<label>
							<span>
								Tỉnh thành <span className='label-red'> (*)</span>:
							</span>
							<SelectOption
								placeholder={'Tỉnh thành'}
								width={'100'}
								options={provinces}
								getValueSelected={setProvinceSelected}
							/>
						</label>
					</Col>
					<Col
						className='gutter-row'
						xl={{ span: 6 }}
						lg={{ span: 6 }}
						md={{ span: 12 }}
						xs={{ span: 24 }}
					>
						<label>
							<span>
								Quận huyện <span className='label-red'> (*)</span>:
							</span>
							<SelectOption
								disabled={provinceSelected !== null ? false : true}
								placeholder={'Quận huyện'}
								width={'100'}
								options={districts}
								getValueSelected={setDistrictSelected}
							/>
						</label>
					</Col>
					<Col
						className='gutter-row'
						xl={{ span: 6 }}
						lg={{ span: 6 }}
						md={{ span: 12 }}
						xs={{ span: 24 }}
					>
						<label>
							<span>
								Xã phường <span className='label-red'> (*)</span>:
							</span>
							<SelectOption
								disabled={districtSelected !== null ? false : true}
								placeholder={'Xã phường'}
								width={'100'}
								options={wards}
							/>
						</label>
					</Col>
				</Row>

				<label>
					<span>
						Số nhà, tên đường <span className='label-red'> (*)</span>:
					</span>
					<Input type='text' placeholder='Số nhà, tên đường' />
				</label>

				<div className='disease-symptoms'>
					<div className='disease-symptoms-title'>
						Ông/bà hiện có những triệu chứng hay biểu hiện nào sau đây không?
						<span className='label-red'> (*)</span>:
					</div>
					<table className='disease-symptoms-table'>
						<thead>
							<tr>
								<th>Dấu hiệu</th>
								<th>Có</th>
								<th>Không</th>
							</tr>
						</thead>
						<tbody>
							{diseaseSymptoms.map(diseaseSymptom => (
								<tr key={diseaseSymptom.id}>
									<td>
										{diseaseSymptom.ten}
										<span className='label-red'> (*)</span>
									</td>
									<td>
										<input type='radio' name={diseaseSymptom.id} />
									</td>
									<td>
										<input type='radio' name={diseaseSymptom.id} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className='epidemiological-factors'>
					<div className='epidemiological-factors-title'>
						Trong thời gian vừa qua <span className='label-red'> (*)</span>:
					</div>

					<table className='epidemiological-factors-table'>
						<thead>
							<tr>
								<th>Yếu tố dịch tễ </th>
								<th>Có</th>
								<th>Không</th>
							</tr>
						</thead>
						<tbody>
							{epidemiologicalFactors.map(epidemiologicalFactor => (
								<tr key={epidemiologicalFactor.id}>
									<td>
										{epidemiologicalFactor.ten}
										<span className='label-red'> (*)</span>
									</td>
									<td>
										<input type='radio' name={epidemiologicalFactor.id} />
									</td>
									<td>
										<input type='radio' name={epidemiologicalFactor.id} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<TextArea
					placeholder='Vui lòng cung cấp thêm thông tin về triệu chứng hay dấu hiệu khác nếu có'
					className='more-info'
					rows={2}
				></TextArea>
				<div className='captcha'>
					<div className='captcha-title'>
						Vui lòng nhập mã xác thực <span className='label-red'> (*)</span>:
					</div>
					<div ref={codeRef} className='captcha-text'>
						{captchaText}
					</div>
					<Input
						type='number'
						className='captcha-code'
						onChange={e => setCaptchaText(e.target.value)}
					/>
				</div>

				<div className='submit-button-center'>
					<button type='submit'>Gửi</button>
				</div>
			</form>

			<Footer />
		</div>
	);
}
