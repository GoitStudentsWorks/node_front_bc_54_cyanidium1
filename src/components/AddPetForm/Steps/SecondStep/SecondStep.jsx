import React from "react";
import css from "./SecondStep.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  prevStep,
} from "../../../../redux/adddPetForm/addPetFormSlice";
import {
  selectMyPetBirthDate,
  selectMyPetType,
  selectMyPetID,
  selectMyPetName,
  selectMyPetTitle,
} from "../../../../redux/myPets/addPetSelectors";
import { updatePetInfo } from "../../../../redux/myPets/addPetOperations";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title of add is required")
    .min(6, "Title must be at least 6 characters")
    .max(64, "Title must be at most 64 characters"),
  name: Yup.string().required("Name pet is required"),
  birthDate: Yup.date()
    .default(() => new Date())
    .required("Birth date is required"),
  type: Yup.string().required("Type is required"),
});

const SecondStepSell = () => {
  const dispatch = useDispatch();
  const title = useSelector(selectMyPetTitle);
  const name = useSelector(selectMyPetName);
  const birthDate = useSelector(selectMyPetBirthDate);
  const type = useSelector(selectMyPetType);

  const petId = useSelector(selectMyPetID);

  const handleNext = (values) => {
    const pet = {
      id: petId,
      ...values,
    };
    dispatch(updatePetInfo(pet));
    dispatch(nextStep());
    console.log(birthDate);
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  return (
    <div className="container">
      <Formik
        initialValues={{
          title,
          name,
          birthDate,
          type,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleNext(values);
        }}
      >
        <Form>
          <div className={css.FormWrapper}>
            <div className={css.WrapperLabelInput}>
              <label className={css.LabelStep} htmlFor="title">
                Title of add
              </label>
              <Field
                className={css.Input}
                type="text"
                id="title"
                name="title"
                placeholder="Type add title"
              />
              <ErrorMessage
                name="title"
                component="p"
                className={css.ErrorTextLow}
              />
            </div>
            <div className={css.WrapperLabelInput}>
              <label className={css.LabelStep} htmlFor="name">
                Name pet
              </label>
              <Field
                className={css.Input}
                type="text"
                id="name"
                name="name"
                placeholder="Type pet name"
              />
              <ErrorMessage
                name="name"
                component="p"
                className={css.ErrorTextLow}
              />
            </div>
            <div className={css.WrapperLabelInput}>
              <label className={css.LabelStep} htmlFor="birthDate">
                Date of birth
              </label>
              <Field
                type="date"
                id="Date"
                name="birthDate"
                className={css.Input}
              />
              <ErrorMessage
                name="birthDate"
                component="p"
                className={css.ErrorText}
              />
            </div>
            <div className={css.WrapperLabelInput}>
              <label className={css.LabelStep} htmlFor="type">
                Type
              </label>
              <Field
                className={css.Input}
                type="text"
                id="type"
                name="type"
                placeholder="Type of pet"
              />
              <ErrorMessage
                name="type"
                component="p"
                className={css.ErrorTextLow}
              />
            </div>
            <ul className={css.LinkAddPEt}>
              <li>
                <button
                  className={css.LinkAddPEtLitkCancel}
                  onClick={() => handleBack()}
                >
                  <div className={css.ButtonEl}>
                    <span>Back</span>
                  </div>
                </button>
              </li>
              <li>
                <button className={css.ButtonNext} type="submit">
                  <div className={css.ButtonEl}>
                    <span>Next</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SecondStepSell;
