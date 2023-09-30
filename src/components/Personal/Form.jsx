import { Formik, Field, Form } from 'formik';
import scss from './personal.module.scss';
import defualtPhoto from '../../images/icons.svg';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { selectUser } from 'redux/auth/authSelectors';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { userUpdate } from 'redux/user/userOperations';

const validationSchema = Yup.object().shape({
  photo: Yup.mixed().required('Please upload a photo'),
  firstName: Yup.string(),
  email: Yup.string().required(),
  birthday: Yup.string().optional(),
  phone: Yup.string().optional(),
  city: Yup.string().optional(),
});

export const PersonalForm = ({ mode }) => {
  const [file, setFile] = useState('');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSubmit = values => {
    dispatch(userUpdate(values));
  };
  return (
    <Formik
      // enctype="multipart/form-data"
      // method="patch"
      initialValues={{
        photo: '',
        firstName: user?.user.name,
        email: user?.user.email,
        birthday: user?.user.birthday || '',
        phone: user?.user.phone,
        city: user?.user.city,
      }}
      // validationSchema={validationSchema}
      onSubmit={values => handleSubmit(values)}
    >
      {({ values, handleChange, isValid }) => (
        <Form className={scss.form}>
          <label className={scss.editPhotoBlock}>
            {console.log(file)}
            <div>
              {file ? (
                <img
                  src={file}
                  alt="Selected img"
                  className={scss.editPhotoBlock}
                />
              ) : (
                <svg className={scss.personalPhoto}>
                  <use href={`${defualtPhoto}#icon-Photo-default`}></use>
                </svg>
              )}
            </div>
            <Field
              onChange={e => {
                setFile(URL.createObjectURL(e.target.files[0]));
                handleChange(e);
              }}
              accept="image/*,image/jpeg"
              className={scss.fileField}
              type="file"
              name="photo"
              disabled={!mode}
              // value={file}
            ></Field>

            {mode &&
              (file === '' ? (
                <div className={scss.editPhotoLabel}>
                  <svg className={scss.editPhoto}>
                    <use href={`${defualtPhoto}#icon-camera`}></use>
                  </svg>
                  <span>Edit photo</span>
                </div>
              ) : (
                <div className={scss.editPhotoLabel}>
                  <svg className={scss.editPhoto}>
                    <use href={`${defualtPhoto}#icon-check`}></use>
                  </svg>
                  <span>Confirm</span>
                  <svg className={scss.editPhoto}>
                    <use href={`${defualtPhoto}#icon-cross-small`}></use>
                  </svg>
                </div>
              ))}
          </label>

          <label htmlFor="firstName" className={scss.label}>
            Name:
            <Field
              className={scss.input}
              id="firstName"
              name="firstName"
              placeholder="Anna"
              disabled={!mode}
              // value={values.firstName}
            />
          </label>

          <label htmlFor="email" className={scss.label}>
            Email:
            <Field
              id="email"
              name="email"
              placeholder="anna@gmail.com"
              type="email"
              className={scss.input}
              disabled={!mode}
            />
          </label>
          <label htmlFor="birthday" className={scss.label}>
            Birthday:
            <Field
              id="birthday"
              name="birthday"
              placeholder="25.09.2023"
              // type="date"
              className={scss.input}
              disabled={!mode}
              onChange={handleChange}
              // onChange={e => {
              //   console.log(e.currentTarget.value);
              //   console.log(values.birthday);
              //   handleChange(e);
              // }}
            />
          </label>
          <label htmlFor="phone" className={scss.label}>
            Phone:
            <Field
              id="phone"
              name="phone"
              placeholder="+38000000000"
              // type="number"
              className={scss.input}
              disabled={!mode}
            />
          </label>
          <label htmlFor="city" className={scss.label}>
            City:
            <Field
              id="city"
              name="city"
              placeholder="Kiev"
              className={scss.input}
              disabled={!mode}
            />
          </label>
          {mode && (
            <button className={scss.button} type="submit">
              Save
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};
