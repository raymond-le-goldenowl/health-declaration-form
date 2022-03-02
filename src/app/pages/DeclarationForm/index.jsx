import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { nanoid } from 'nanoid';
import { useFormik } from 'formik';
import { Col, Input, Row } from 'antd';
import { SyncOutlined } from '@ant-design/icons/lib/icons';

import { declarationTypes } from 'app/services';
import { notificationCustom } from 'app/utils/notificationCustom';

import Footer from 'app/components/Footer';
import SelectOption from 'app/components/Select';
import DatePickerCustom from 'app/components/DatePickerCustom';

import './styles.scss';

const makeCaptchaNumbers = (min = 1000, max = 99999) => {
	return Math.floor(Math.random() * (max - min) + min);
};

export default function DeclarationForm() {
	const { TextArea } = Input;

	// Loại khai báo.
	const [declarationTypesState, setDeclarationTypesState] = useState(() => declarationTypes || []);

	// Noi khai báo.
	const [declarationPlaces, setDeclarationPlaces] = useState([]);

	// Quốc tịch, tỉnh, huyện, phường.
	const [nations, setNations] = useState([]);
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);

	// các triệu chứng bệnh.
	const [diseaseSymptoms, setDiseaseSymptoms] = useState([]);
	// các dấu hiệu dịch tễ.
	const [epidemiologicalFactors, setEpidemiologicalFactors] = useState([]);

	// symptom-after-used-molnupiravir
	const symptomAfterUsedMolnupiravir = useRef([
		{ id: nanoid(3), content: 'Không', isChecked: false },
		{ id: nanoid(3), content: 'Nôn', isChecked: false },
		{ id: nanoid(3), content: 'Chóng mặt', isChecked: false },
		{ id: nanoid(3), content: 'Đau bụng', isChecked: false },
		{ id: nanoid(3), content: 'Đau tay chân', isChecked: false },
		{ id: nanoid(3), content: 'Buồn nôn', isChecked: false },
		{ id: nanoid(3), content: 'Tê tay chân', isChecked: false },
		{ id: nanoid(3), content: 'Nổi sần ngứa', isChecked: false },
		{ id: nanoid(3), content: 'Đau đầu', isChecked: false },
		{ id: nanoid(3), content: 'Đau lưng', isChecked: false },
		{ id: nanoid(3), content: 'Sổ mũi', isChecked: false },
		{ id: nanoid(3), content: 'Tiêu chảy', isChecked: false },
		{ id: nanoid(3), content: 'Yếu liệt tay chân', isChecked: false }
	]);
	const [isBackgroundDisease, setIsBackgroundDisease] = useState('Không');
	const [isUsedMolnupiravir, setIsUsedMolnupiravir] = useState('Không');
	const [isDisableSymptomsAfterUsedMolnupiravir, setIsDisableSymptomsAfterUsedMolnupiravir] =
		useState(false);

	// Lưu giữ liệu captcha text do người dùng nhập vào.
	const [captchaText, setCaptchaText] = useState(null);
	// Tạo mã captcha, không bị thay đổi khi bất kỳ component nào được render..
	const codeRef = useRef(makeCaptchaNumbers());

	const validate = values => {
		if (values.noiKhaiBao === null) {
			notificationCustom({ type: 'danger', message: 'Chưa chọn nơi khai báo.' });
			return false;
		} else if (values.soDienThoai === null) {
			notificationCustom({ type: 'danger', message: 'Chưa nhập số điện thoại.' });
			return false;
		} else if (values.ten === null) {
			notificationCustom({ type: 'danger', message: 'Chưa nhập tên.' });
			return false;
		} else if (values.namSinh === null) {
			notificationCustom({ type: 'danger', message: 'Chưa chọn năm sinh.' });
			return false;
		} else if (values.gioiTinh === null) {
			notificationCustom({ type: 'danger', message: 'Chưa chọn giới tính.' });
			return false;
		} else if (values.tinhThanh === null) {
			notificationCustom({ type: 'danger', message: 'Chưa chọn tỉnh thành.' });
			return false;
		} else if (values.quanHuyen === null) {
			notificationCustom({ type: 'danger', message: 'Chưa chọn quận huyện.' });
			return false;
		} else if (values.xaPhuong === null) {
			notificationCustom({ type: 'danger', message: 'Chưa chọn xã phường.' });
			return false;
		} else if (values.diaChi === null) {
			notificationCustom({ type: 'danger', message: 'Chưa nhập địa chỉ.' });
			return false;
		} else if (
			values.maSinhVien === null &&
			formik.values.loaiKhaiBao === declarationTypes[5].value
		) {
			notificationCustom({ type: 'danger', message: 'Chưa nhập CMND/CCCD.' });
			return false;
		} else if (codeRef.current !== captchaText) {
			notificationCustom({ type: 'danger', message: 'Mã xác thực không đúng.' });
			return false;
		}
		return true;
	};

	const formik = useFormik({
		initialValues: {
			diaChi: null,
			gioiTinh: 'Nam',
			khoaPhong: null,
			maBenhNhan: null,
			maSinhVien: null,
			namSinh: null,
			noiTru: null,
			quanHuyen: null,
			quocTich: null,
			soDienThoai: null,
			ten: null,
			tinhThanh: null,
			xaPhuong: null,

			noiKhaiBao: null,
			loaiKhaiBao: null,

			// Chỉnh dành cho loại khai báo cuối và khai báo gần cuối.
			typeOfTestObject: 'Không',
			declarationPlace: null,

			// Chỉnh dành cho loại khai báo cuối.
			backgroundDisease: [],

			SymptomsAfterUsedMolnupiravir: [],
			anotherSymptoms: null,

			bodyTemperature: null,
			bloodOxygenLevel: null
		},
		onSubmit: values => {
			// if (validate(values)) {
			delete values.noiKhaiBao;
			delete values.loaiKhaiBao;

			console.log(values);

			// Save on localStorage
			localStorage.setItem('info', JSON.stringify(values));
			localStorage.setItem(values.soDienThoai, JSON.stringify(values));
			// }
		}
	});

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
			const data = resp.data?.objects.map(nation => {
				if (nation.ma === 'VN' && nation.tenkhongdau === 'viet nam') {
					formik.setFieldValue(
						'quocTich',
						JSON.stringify({
							id: nation.id,
							key: nation.id,
							value: nation.ten,
							text: nation.ten
						})
					);
				}
				return {
					id: nation.id,
					key: nation.id,
					value: nation.ten,
					text: nation.ten
				};
			});
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

	// Lấy thông tin quận huyện dựa theo id tỉnh thành.
	useEffect(() => {
		const provinceSelected = formik.values.tinhThanh;
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
	}, [formik.values.tinhThanh]);

	useEffect(() => {
		const districtSelected = formik.values.quanHuyen;

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
	}, [formik.values.quanHuyen]);

	useEffect(() => {
		const displayType = formik.values.loaiKhaiBao;

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
	}, [formik.values.loaiKhaiBao]);

	const onDeclarationTypeChange = event => {
		const targetValue = event.target.value;
		setDeclarationTypesState(() => {
			return declarationTypes.map(dt => {
				if (targetValue !== dt.value) {
					return { ...dt, checked: false };
				}

				formik.setFieldValue('loaiKhaiBao', dt.value);
				return { ...dt, checked: true };
			});
		});
	};

	const onChangeSymptomAfterUsedMolnupiravir = ({ target }) => {
		if (target.value.trim().toLowerCase() === 'không') {
			formik.values.SymptomsAfterUsedMolnupiravir = [];
			setIsDisableSymptomsAfterUsedMolnupiravir(target.checked);
		} else {
			formik.values.SymptomsAfterUsedMolnupiravir.push(target.value);
		}
	};

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
				{formik.values.loaiKhaiBao && formik.values.loaiKhaiBao === declarationTypes[5].value ? (
					<div className='label-red' style={{ textAlign: 'center' }}>
						Sử dụng cho F0 khai báo sức khoẻ và cách ly tại nhà
					</div>
				) : null}
				<div>
					<label>
						<span>
							Nơi khai báo <span className='label-red'> (*)</span>:
						</span>
						<SelectOption
							width={'100%'}
							placeholder={'Nhập và chọn nơi khai báo'}
							options={declarationPlaces}
							getValueSelected={value => {
								formik.setFieldValue('noiKhaiBao', value);
							}}
						/>
					</label>
				</div>

				<div>
					<label>
						<span>
							Số điện thoại <span className='label-red'> (*)</span>:
						</span>
						<Input type='number' {...formik.getFieldProps('soDienThoai')} />
					</label>
				</div>

				<label>
					<span>
						Họ và tên <span className='label-red'> (*)</span>:
					</span>
					<Input type='text' placeholder='Họ và tên' {...formik.getFieldProps('ten')} />
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
							/>
						</label>
					</Col>

					<Col className='gutter-row' span={12}>
						<label>
							<span>
								Giới tính <span className='label-red'> (*)</span>:
							</span>
							<Input type='text' {...formik.getFieldProps('gioiTinh')} />
						</label>
					</Col>
				</Row>

				{/* display if type is 'Nhân viên bệnh viện' */}
				{formik.values.loaiKhaiBao && formik.values.loaiKhaiBao === declarationTypes[1].value ? (
					<>
						<label>
							<span>Mã nhân viên:</span>
							<Input
								type='number'
								placeholder='Mã nhân viên'
								{...formik.getFieldProps('maBenhNhan')}
							/>
						</label>

						<label>
							<span>Khoa/phòng:</span>
							<Input type='text' placeholder='Khoa/phòng' {...formik.getFieldProps('khoaPhong')} />
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
								getValueSelected={value => {
									formik.setFieldValue('quocTich', value);
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
								getValueSelected={value => {
									formik.setFieldValue('tinhThanh', value);
									formik.setFieldValue('quanHuyen', null);
									formik.setFieldValue('xaPhuong', null);
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
								value={formik.values.quanHuyen}
								getValueSelected={value => {
									formik.setFieldValue('quanHuyen', value);
									formik.setFieldValue('xaPhuong', null);
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
								Xã phường <span className='label-red'> (*)</span>:
							</span>
							<SelectOption
								disabled={formik.values.quanHuyen !== null ? false : true}
								placeholder={'Xã phường'}
								width={'100'}
								options={wards}
								value={formik.values.xaPhuong}
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
					<Input type='text' placeholder='Số nhà, tên đường' {...formik.getFieldProps('diaChi')} />
				</label>

				{/* display if type is 'Tiêm chủng vắc xin' hoặc 'Xét nghiệm Covid-19 */}
				{formik.values.loaiKhaiBao &&
				(formik.values.loaiKhaiBao === declarationTypes[3].value ||
					formik.values.loaiKhaiBao === declarationTypes[4].value) ? (
					<label>
						<span>
							CMND/CCCD
							{formik.values.loaiKhaiBao === declarationTypes[4].value ? (
								<span className='label-red'> (*)</span>
							) : null}
							:
						</span>
						<Input
							type='text'
							placeholder='Nhập chính xác CMND/CCCD'
							{...formik.getFieldProps('maSinhVien')}
						/>
					</label>
				) : null}
				{/* display if type is 'Xét nghiệm Covid-19' */}
				{formik.values.loaiKhaiBao &&
				(formik.values.loaiKhaiBao === declarationTypes[4].value ||
					formik.values.loaiKhaiBao === declarationTypes[5].value) ? (
					<>
						<p className='type-of-test-object-title'>
							Ông/Bà hiện có mắc Covid-19 hoặc các trường hợp theo dõi sau đây không?:
						</p>
						<div className='type-of-test-object'>
							<label>
								<input
									type='radio'
									name='type-of-test-object'
									onChange={() => formik.setFieldValue('typeOfTestObject', 'Không')}
								/>
								<span>Không</span>
							</label>

							<label>
								<input
									type='radio'
									name='type-of-test-object'
									onChange={() => formik.setFieldValue('typeOfTestObject', 'Có')}
								/>
								<span>Có</span>
							</label>

							<label>
								<input
									type='radio'
									name='type-of-test-object'
									onChange={() => formik.setFieldValue('typeOfTestObject', 'F1')}
								/>
								<span>F1</span>
							</label>
						</div>
					</>
				) : null}

				{(formik.values.loaiKhaiBao === declarationTypes[4].value ||
					formik.values.loaiKhaiBao === declarationTypes[5].value) &&
				formik.values.typeOfTestObject.trim().toLowerCase() === 'có' ? (
					<>
						<p className='place-of-test-object-title'>Nơi xét nghiệm:</p>
						<div className='place-of-test-object'>
							<label>
								<input
									type='radio'
									name='declarationPlace'
									checked={formik.values.declarationPlace === 'Bệnh viện'}
									onChange={() => formik.setFieldValue('declarationPlace', 'Bệnh viện')}
								/>
								<span>Bệnh viện</span>
							</label>
							<label>
								<input
									type='radio'
									name='declarationPlace'
									checked={formik.values.declarationPlace === 'Phòng khám tư nhân'}
									onChange={() => formik.setFieldValue('declarationPlace', 'Phòng khám tư nhân')}
								/>
								<span>Phòng khám tư nhân</span>
							</label>
							<label>
								<input
									type='radio'
									name='declarationPlace'
									checked={formik.values.declarationPlace === 'Khu phong tỏa'}
									onChange={() => formik.setFieldValue('declarationPlace', 'Khu phong tỏa')}
								/>
								<span>Khu phong tỏa</span>
							</label>
							<label>
								<input
									type='radio'
									name='declarationPlace'
									checked={formik.values.declarationPlace === 'Tự làm xét nghiệm tại nhà'}
									onChange={() =>
										formik.setFieldValue('declarationPlace', 'Tự làm xét nghiệm tại nhà')
									}
								/>
								<span>Tự làm xét nghiệm tại nhà</span>
							</label>
						</div>
					</>
				) : null}

				{formik.values.loaiKhaiBao && formik.values.loaiKhaiBao === declarationTypes[5].value ? (
					<>
						<p className='background-disease-title'>Ông/Bà có mắc bệnh nền hay không?:</p>
						<div className='background-disease'>
							<label>
								<input
									type='radio'
									name='background-disease'
									onChange={() => setIsBackgroundDisease('Không')}
								/>
								<span>Không</span>
							</label>

							<label>
								<input
									type='radio'
									name='background-disease'
									onChange={() => setIsBackgroundDisease('Có')}
								/>
								<span>Có</span>
							</label>
						</div>
					</>
				) : null}
				{formik.values.loaiKhaiBao &&
				formik.values.loaiKhaiBao === declarationTypes[5].value &&
				isBackgroundDisease &&
				isBackgroundDisease === 'Có' ? (
					<>
						<p className='type-of-background-disease-title'>Chọn bệnh nền: </p>
						<div className='type-of-background-disease'>
							<label>
								<input
									type='checkbox'
									onChange={({ target }) => {
										formik.values.backgroundDisease.push(target.value);
									}}
									value='Thận mạn tính'
								/>
								<span>Thận mạn tính</span>
							</label>
							<label>
								<input
									type='checkbox'
									onChange={({ target }) => {
										formik.values.backgroundDisease.push(target.value);
									}}
									value='Tăng huyết áp'
								/>
								<span>Tăng huyết áp</span>
							</label>
							<label>
								<input
									type='checkbox'
									onChange={({ target }) => {
										formik.values.backgroundDisease.push(target.value);
									}}
									value='Đái tháo đường'
								/>
								<span>Đái tháo đường</span>
							</label>
							<label>
								<input
									type='checkbox'
									onChange={({ target }) => {
										formik.values.backgroundDisease.push(target.value);
									}}
									value='Bệnh phổi tắc nghẽn mạn tính'
								/>
								<span>Bệnh phổi tắc nghẽn mạn tính</span>
							</label>
							<label>
								<input
									type='checkbox'
									onChange={({ target }) => {
										formik.values.backgroundDisease.push(target.value);
									}}
									value='Có tình trạng béo phì'
								/>
								<span>Có tình trạng béo phì</span>
							</label>
						</div>
					</>
				) : null}

				{formik.values.loaiKhaiBao && formik.values.loaiKhaiBao === declarationTypes[5].value ? (
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

				{formik.values.loaiKhaiBao &&
				formik.values.loaiKhaiBao === declarationTypes[5].value &&
				isUsedMolnupiravir &&
				isUsedMolnupiravir === 'yes' ? (
					<div className='used-molnupiravir'>
						<div className='used-molnupiravir-title'>
							Ông/bà có triệu chứng nào hay dấu hiệu sau khi sử dụng thuốc Molnupiravir?
							<span className='label-red'> (*)</span>:
						</div>
						<div className='list-symptom-after-used-molnupiravir'>
							{symptomAfterUsedMolnupiravir.current.map((item, index, oldArray) => {
								return (
									<label key={item.id}>
										<input
											type='checkbox'
											value={item.content}
											onChange={onChangeSymptomAfterUsedMolnupiravir}
											disabled={
												item.content === 'Không' ? false : isDisableSymptomsAfterUsedMolnupiravir
											}
											checked={
												isDisableSymptomsAfterUsedMolnupiravir && item.content === 'Không'
													? isDisableSymptomsAfterUsedMolnupiravir
													: null
											}
										/>
										<span>{item.content}</span>
									</label>
								);
							})}
							<label>
								<span>Triệu chứng khác:</span>
								<Input
									type='text'
									disabled={isDisableSymptomsAfterUsedMolnupiravir}
									{...formik.getFieldProps('anotherSymptoms')}
								/>
							</label>
						</div>
					</div>
				) : null}

				{formik.values.loaiKhaiBao && formik.values.loaiKhaiBao === declarationTypes[5].value ? (
					<>
						<Row gutter={16}>
							<Col className='gutter-row' span={12}>
								<label>
									<span>Nhiệt độ cơ thể(ºC) :</span>
									<Input
										type='text'
										placeholder='VD: 38.5'
										{...formik.getFieldProps('bodyTemperature')}
									/>
								</label>
							</Col>

							<Col className='gutter-row' span={12}>
								<label>
									<span>Nồng độ oxy trong máu SPO2 (%) :</span>
									<Input
										type='text'
										placeholder='Nhập giá trị từ 30 -> 100 '
										{...formik.getFieldProps('bloodOxygenLevel')}
									/>
								</label>
							</Col>
						</Row>
					</>
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
					<div className='captcha-text'>{codeRef.current}</div>
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
