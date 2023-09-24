import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ThirdStep.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMyPetComments,
  selectMyPetID,
  selectMyPetImage,
} from "redux/myPets/addPetSelectors";
import { updatePetInfo } from "redux/myPets/addPetOperations";
import { resetSteps } from "redux/adddPetForm/addPetFormSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  photo: Yup.mixed().required("Please upload a photo"),
  comments: Yup.string().required("Comments are required"),
});

const ThirdStep = ({ handleNext, handlePreviousStep, formData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const petId = useSelector(selectMyPetID);
  const photo = useSelector(selectMyPetImage);
  const comments = useSelector(selectMyPetComments);

  const handleSubmit = (values) => {
    const pet = {
      id: petId,
      ...values,
    };
    dispatch(updatePetInfo(pet));
    // navigate(-1);
    dispatch(resetSteps());
  };

  return (
    <>
      <h2>Add your pet</h2>
      <Formik
        initialValues={{ photo, comments }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <div className={css.wrapperPoto}>
                <label className={css.labelAddText}>
                  Load the pet`s image:
                </label>
                <div>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={(e) => {
                      setFieldValue("photo", e.currentTarget.files[0]);
                    }}
                    style={{ display: "none" }}
                  />
                </div>
                <label htmlFor="photo">
                  <div className={css.labelAdd}>
                    <Field name="photo">
                      {({ field }) => (
                        <>
                          {field.value && (
                            <img
                              className={css.previewPhoto}
                              src={URL.createObjectURL(field.value)}
                              alt="Selected img"
                            />
                          )}
                          <img
                            className={css.iconAdd}
                            src="https://cataas.com/cat/says/hello%20world!"
                            alt="add"
                          />
                        </>
                      )}
                    </Field>
                  </div>
                </label>
                <ErrorMessage
                  name="photo"
                  component="p"
                  className={css.errorComent}
                />
              </div>
              <div className={css.wrapperTextareaOne}>
                <label className={css.textareaText} htmlFor="comments">
                  Comments
                </label>
                <Field
                  as="textarea"
                  className={css.textareaAddOne}
                  id="comments"
                  name="comments"
                  placeholder="Type comment"
                />
                <ErrorMessage
                  name="comments"
                  component="p"
                  className={css.comments}
                />
              </div>
              <ul className={css.LinkAddPEt}>
                <li>
                  <button
                    className={css.LinkAddPEtLitkCancel}
                    onClick={() => handlePreviousStep(formData)}
                  >
                    <div className={css.ButtonEl}>
                      {/* <img src={cancel} alt="Next" /> */}
                      <span>Back</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button type="submit" className={css.ButtonNext}>
                    <div className={css.ButtonEl}>
                      <span>Done</span>
                      {/* <img src={next} alt="Next" /> */}
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ThirdStep;
