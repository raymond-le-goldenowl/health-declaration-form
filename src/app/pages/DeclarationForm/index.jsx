import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import moment from 'moment';
import { useFormik } from 'formik';
import { Col, Input, Row } from 'antd';
import { SyncOutlined } from '@ant-design/icons/lib/icons';

import { declarationTypes } from 'app/services';
import { notificationCustom } from 'app/utils/notificationCustom';
import { DATE_FORMAT } from 'app/components/DatePickerCustom/constants';

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
	const [declarationTypesState, setDeclarationTypesState] = useState(() => declarationTypes || []);
	const [displayType, setDisplayType] = useState(undefined);
	const [typeOfTestObject, setTypeOfTestObject] = useState('no');
	const [backgroundDisease, setBackgroundDisease] = useState('no');
	const [isUsedMolnupiravir, setIsUsedMolnupiravir] = useState('no');
	const [isError, setIsError] = useState(false);
	const codeRef = useRef();

	useEffect(() => {
		const diseaseSymptomsUrl = `https://kbyt.khambenh.gov.vn/api/v1/trieuchung?q={%22filters%22:{%22$and%22:[{%22trangthai%22:{%22$eq%22:1}}]},%22order_by%22:[{%22field%22:%22thutu_uutien%22,%22direction%22:%22asc%22}]}`;
		const epidemiologicalFactorsUrl = `https://kbyt.khambenh.gov.vn/api/v1/dichte?q={%22filters%22:{%22$and%22:[{%22trangthai%22:{%22$eq%22:1}}]},%22order_by%22:[{%22field%22:%22thutu_uutien%22,%22direction%22:%22asc%22}]}`;
		const nationUrl = `https://kbyt.khambenh.gov.vn/api/v1/quocgia?results_per_page=1000&q={%22filters%22:{%22$and%22:[{%22deleted%22:{%22$eq%22:false}},{%22active%22:{%22$eq%22:1}}]},%22order_by%22:[{%22field%22:%22ten%22,%22direction%22:%22asc%22}]}`;
		const provincesUrl = `https://kbyt.khambenh.gov.vn/api/v1/tinhthanh?results_per_page=100&q={%22filters%22:{%22$and%22:[{%22deleted%22:{%22$eq%22:false}},{%22active%22:{%22$eq%22:1}}]},%22order_by%22:[{%22field%22:%22ten%22,%22direction%22:%22asc%22}]}`;

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

	useEffect(() => {
		if (displayType === declarationTypes[3].value) {
			const declarationPlacesUrl = `https://kbyt.khambenh.gov.vn/api/v1/donvi_filter?page=1&results_per_page=25&q={%22filters%22:{%22$and%22:[{%22tuyendonvi_id%22:{%22$neq%22:%227%22}},{%22active%22:{%22$eq%22:true}},{%22tiemchung_vacxin%22:{%22$eq%22:true}}]},%22order_by%22:[{%22field%22:%22ten%22,%22direction%22:%22asc%22}]}`;

			axios.get(declarationPlacesUrl).then(resp => {
				const data = resp.data?.objects.map(province => ({
					id: province.id,
					key: province.id,
					value: province.ten,
					text: province.ten
				}));
				setDeclarationPlaces(data);
			});
		} else {
			const declarationPlacesUrl = `https://kbyt.khambenh.gov.vn/api/v1/donvi_filter?page=1&results_per_page=25&q={%22filters%22:{%22$and%22:[{%22tuyendonvi_id%22:{%22$neq%22:%227%22}},{%22active%22:{%22$eq%22:true}}]},%22order_by%22:[{%22field%22:%22ten%22,%22direction%22:%22asc%22}]}`;

			axios.get(declarationPlacesUrl).then(resp => {
				const data = resp.data?.objects.map(province => ({
					id: province.id,
					key: province.id,
					value: province.ten,
					text: province.ten
				}));
				setDeclarationPlaces(data);
			});
		}
	}, [displayType]);

	const onDeclarationTypeChange = event => {
		const targetValue = event.target.value;
		setDeclarationTypesState(() => {
			return declarationTypes.map(dt => {
				if (targetValue !== dt.value) {
					return { ...dt, checked: false };
				}

				setDisplayType(dt.value);
				return { ...dt, checked: true };
			});
		});
	};

	const validate = values => {
		if (values.diaChi) {
			notificationCustom({ type: 'warning', message: 'Chưa nhập địa chỉ.' });
			setIsError(true);
		} else if (values.gioiTinh) {
			notificationCustom({ type: 'warning', message: 'Chưa chọn giới tính.' });
			setIsError(true);
		} else if (values.namSinh) {
			notificationCustom({ type: 'warning', message: 'Chưa chọn năm sinh.' });
			setIsError(true);
		} else if (values.quanHuyen) {
			notificationCustom({ type: 'warning', message: 'Chưa chọn quận huyện.' });
			setIsError(true);
		} else if (values.soDienThoai) {
			notificationCustom({ type: 'warning', message: 'Chưa nhập số điện thoại.' });
			setIsError(true);
		} else if (values.ten) {
			notificationCustom({ type: 'warning', message: 'Chưa nhập tên.' });
			setIsError(true);
		} else if (values.tinhThanh) {
			notificationCustom({ type: 'warning', message: 'Chưa chọn tỉnh thành.' });
			setIsError(true);
		} else if (values.xaPhuong) {
			notificationCustom({ type: 'warning', message: 'Chưa chọn xã phường.' });
			setIsError(true);
		} else {
			setIsError(false);
		}
	};
	const formik = useFormik({
		initialValues: {
			diaChi: '',
			gioiTinh: 'Nam',
			khoaPhong: '',
			maBenhNhan: '',
			maSinhVien: '',
			namSinh: moment(moment(moment()._d).format(DATE_FORMAT), DATE_FORMAT),
			noiTru: '',
			quanHuyen: null,
			quocTichID: '',
			soDienThoai: '',
			ten: '',
			tinhThanh: null,
			xaPhuong: null
		},
		onSubmit: values => {
			validate(values);
			if (isError === false) {
				console.log(values);
				localStorage.setItem('info', JSON.stringify(values));
				localStorage.setItem(values.soDienThoai, values);
			}
		}
	});

	return (
		<div id='declaration-form'>
			<h2 className='title-blue'>SỞ Y TẾ TP. HỒ CHÍ MINH</h2>
			<h3 className='title-red'>
				KHAI BÁO THÔNG TIN SAI LÀ VI PHẠM PHÁP LUẬT VIỆT NAM VÀ CÓ THỂ XỬ LÝ HÌNH SỰ
			</h3>

			<form id='form-container' onSubmit={formik.handleSubmit}>
				<div className='list-types-declaration'>
					<div className='list-types-declaration-list-radios'>
						{declarationTypesState.map(declarationType => {
							return (
								<label key={declarationType?.id}>
									<input
										type='radio'
										name='declaration-type'
										defaultValue={declarationType?.value || ''}
										onChange={onDeclarationTypeChange}
										checked={declarationType?.checked ?? false}
									/>
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
						<Input
							type='number'
							// value={soDienThoai}
							// onChange={({ target }) => setSoDienThoai(target.value)}
							{...formik.getFieldProps('soDienThoai')}
						/>
					</label>
				</div>

				<label>
					<span>
						Họ và tên <span className='label-red'> (*)</span>:
					</span>
					<Input
						type='text'
						placeholder='Họ và tên'
						// value={ten}
						// onChange={({ target }) => setTen(target.value)}
						{...formik.getFieldProps('ten')}
					/>
				</label>
				<Row gutter={16}>
					<Col className='gutter-row' span={12}>
						<label>
							<span>
								Ngày sinh <span className='label-red'> (*)</span>:
							</span>
							<DatePickerCustom
								getValueSelected={value => {
									formik.setFieldValue('namSinh', value);
								}}
								// formik={formik}
								// fieldName={'namSinh'}
							/>
						</label>
					</Col>

					<Col className='gutter-row' span={12}>
						<label>
							<span>
								Giới tính <span className='label-red'> (*)</span>:
							</span>
							<Input
								type='text'
								// value={gioiTinh}
								// onChange={({ target }) => setGioiTinh(target.value)}
								{...formik.getFieldProps('gioiTinh')}
							/>
						</label>
					</Col>
				</Row>

				{/* display if type is 'Nhân viên bệnh viện' */}
				{displayType && displayType === declarationTypes[1].value ? (
					<>
						<label>
							<span>Mã nhân viên:</span>
							<Input
								type='number'
								placeholder='Mã nhân viên'
								// value={maBenhNhan}
								// onChange={({ target }) => setMaBenhNhan(target.value)}
								{...formik.getFieldProps('maBenhNhan')}
							/>
						</label>

						<label>
							<span>Khoa/phòng:</span>
							<Input
								type='text'
								placeholder='Khoa/phòng'
								// value={khoaPhong}
								// onChange={({ target }) => setKhoaPhong(target.value)}
								{...formik.getFieldProps('khoaPhong')}
							/>
						</label>
					</>
				) : null}

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
							<SelectOption
								width={'100'}
								options={nations}
								defaultValue={'Việt Nam'}
								// getValueSelected={setQuocTichID}
								getValueSelected={value => {
									formik.setFieldValue('quocTichID', value);
								}}
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
								Tỉnh thành <span className='label-red'> (*)</span>:
							</span>
							<SelectOption
								placeholder={'Tỉnh thành'}
								width={'100'}
								options={provinces}
								// getValueSelected={setProvinceSelected}
								getValueSelected={value => {
									setProvinceSelected(value);
									formik.setFieldValue('tinhThanh', value);
								}}
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
								disabled={formik.values.tinhThanh !== null ? false : true}
								placeholder={'Quận huyện'}
								width={'100'}
								options={districts}
								// getValueSelected={setDistrictSelected}
								getValueSelected={value => {
									setDistrictSelected(value);
									formik.setFieldValue('quanHuyen', value);
								}}
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
						Nam
						<label>
							<span>
								Xã phường <span className='label-red'> (*)</span>:
							</span>
							<SelectOption
								disabled={formik.values.quanHuyen !== null ? false : true}
								placeholder={'Xã phường'}
								width={'100'}
								options={wards}
								// getValueSelected={setXaPhuong}
								getValueSelected={value => {
									formik.setFieldValue('xaPhuong', value);
								}}
							/>
						</label>
					</Col>
				</Row>

				<label>
					<span>
						Số nhà, tên đường <span className='label-red'> (*)</span>:
					</span>
					<Input
						type='text'
						placeholder='Số nhà, tên đường'
						// value={diaChi}
						// onChange={({ target }) => setDiaChi(target.value)}
						{...formik.getFieldProps('diaChi')}
					/>
				</label>

				{/* display if type is 'Tiêm chủng vắc xin' hoặc 'Xét nghiệm Covid-19 */}
				{displayType &&
				(displayType === declarationTypes[3].value || displayType === declarationTypes[4].value) ? (
					<label>
						<span>
							CMND/CCCD
							{displayType === declarationTypes[4].value ? (
								<span className='label-red'> (*)</span>
							) : null}
							:
						</span>
						<Input
							type='text'
							placeholder='Nhập chính xác CMND/CCCD'
							// value={maSinhVien}
							// onChange={({ target }) => setMaSinhVien(target.value)}
							{...formik.getFieldProps('maSinhVien')}
						/>
					</label>
				) : null}
				{/* display if type is 'Xét nghiệm Covid-19' */}
				{displayType &&
				(displayType === declarationTypes[4].value || displayType === declarationTypes[5].value) ? (
					<>
						<p className='type-of-test-object-title'>
							Ông/Bà hiện có mắc Covid-19 hoặc các trường hợp theo dõi sau đây không?:
						</p>
						<div className='type-of-test-object'>
							<label>
								<input
									type='radio'
									name='type-of-test-object'
									onChange={() => setTypeOfTestObject('no')}
								/>
								<span>Không</span>
							</label>

							<label>
								<input
									type='radio'
									name='type-of-test-object'
									onChange={() => setTypeOfTestObject('yes')}
								/>
								<span>Có</span>
							</label>

							<label>
								<input
									type='radio'
									name='type-of-test-object'
									onChange={() => setTypeOfTestObject('F1')}
								/>
								<span>F1</span>
							</label>
						</div>
					</>
				) : null}

				{(displayType === declarationTypes[4].value || displayType === declarationTypes[5].value) &&
				typeOfTestObject === 'yes' ? (
					<>
						<p className='place-of-test-object-title'>Nơi xét nghiệm:</p>
						<div className='place-of-test-object'>
							<label>
								<input type='radio' name='place-of-test-object' />
								<span>Bệnh viện</span>
							</label>
							<label>
								<input type='radio' name='place-of-test-object' />
								<span>Phòng khám tư nhâm</span>
							</label>
							<label>
								<input type='radio' name='place-of-test-object' />
								<span>Khu phong tỏa</span>
							</label>
							<label>
								<input type='radio' name='place-of-test-object' />
								<span>Tự làm xét nghiệm tại nhà</span>
							</label>
						</div>
					</>
				) : null}

				{displayType && displayType === declarationTypes[5].value ? (
					<>
						<p className='background-disease-title'>Ông/Bà có mắc bệnh nền hay không?:</p>
						<div className='background-disease'>
							<label>
								<input
									type='radio'
									name='background-disease'
									onChange={() => setBackgroundDisease('no')}
								/>
								<span>Không</span>
							</label>

							<label>
								<input
									type='radio'
									name='background-disease'
									onChange={() => setBackgroundDisease('yes')}
								/>
								<span>Có</span>
							</label>
						</div>
					</>
				) : null}
				{displayType &&
				displayType === declarationTypes[5].value &&
				backgroundDisease &&
				backgroundDisease === 'yes' ? (
					<>
						<p className='type-of-background-disease-title'>Chọn bệnh nền: </p>
						<div className='type-of-background-disease'>
							<label>
								<input type='checkbox' />
								<span>Thận mạn tính</span>
							</label>
							<label>
								<input type='checkbox' />
								<span>Tăng huyết áp</span>
							</label>
							<label>
								<input type='checkbox' />
								<span>Đái tháo đường</span>
							</label>
							<label>
								<input type='checkbox' />
								<span>Bệnh phổi tắc nghẽn mạn tính</span>
							</label>
							<label>
								<input type='checkbox' />
								<span>Có tình trạng béo phì</span>
							</label>
						</div>
					</>
				) : null}

				{displayType && displayType === declarationTypes[5].value ? (
					<>
						<p className='is-used-molnupiravir-title'>Ông/Bà có sử dụng thuốc Molnupiravir?:</p>
						<div className='is-used-molnupiravir'>
							<label>
								<input
									type='radio'
									name='is-used-molnupiravir'
									onChange={() => setIsUsedMolnupiravir('no')}
								/>
								<span>Không</span>
							</label>

							<label>
								<input
									type='radio'
									name='is-used-molnupiravir'
									onChange={() => setIsUsedMolnupiravir('yes')}
								/>
								<span>Có</span>
							</label>
						</div>
					</>
				) : null}

				{displayType &&
				displayType === declarationTypes[5].value &&
				isUsedMolnupiravir &&
				isUsedMolnupiravir === 'yes' ? (
					<div className='used-molnupiravir'>
						<div className='used-molnupiravir-title'>
							Ông/bà có triệu chứng nào hay dấu hiệu sau khi sử dụng thuốc Molnupiravir?
							<span className='label-red'> (*)</span>:
						</div>
						<div className='list-symptom-after-used-molnupiravir'>
							{[
								'Không',
								'Nôn',
								'Chóng mặt',
								'Đau bụng',
								'Đau tay chân',
								'Buồn nôn',
								'Tê tay chân',
								'Nổi sần ngứa',
								'Đau đầu',
								'Đau lưng',
								'Sổ mũi',
								'Tiêu chảy',
								'Yếu liệt tay chân',
								'Triệu chứng khác'
							].map((item, index, oldArray) => {
								if (oldArray.length - 1 === index) {
									return (
										<label>
											<span>Triệu chứng khác:</span>
											<Input type='text' />
										</label>
									);
								} else {
									return (
										<label>
											<input type='checkbox' value={item} />
											<span>{item}</span>
										</label>
									);
								}
							})}
						</div>
					</div>
				) : null}
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
										<input defaultChecked type='radio' name={diseaseSymptom.id} />
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
										<input defaultChecked type='radio' name={epidemiologicalFactor.id} />
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
