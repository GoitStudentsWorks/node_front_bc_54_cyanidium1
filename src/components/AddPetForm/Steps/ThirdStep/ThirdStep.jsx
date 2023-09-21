import css from "./ThreeStep.module.css";
import React, { useState } from "react";

const validationSchema = Yup.object().shape({
  photo: Yup.mixed().required("Photo is required"),
  comments: Yup.string().required("Comments are required"),
});

const ThreeStep = ({ handleNext, handlePreviousStep, formData }) => {
  const [photo, setPhoto] = useState("");
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState({});

  const handleDone = () => {
    validationSchemaThree
      .validate({ photo, comments }, { abortEarly: false })
      .then(() => {
        handleNext({ photo, comments });
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  return (
    <>
      <div>
        <div className={css.wrapperPoto}>
          <label className={css.labelAddText}>
            Load the {"\n"} pet`s image:
          </label>
          <div>
            <input
              type="file"
              id="photo"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <label htmlFor="photo">
            <div className={css.labelAdd}>
              {photo && (
                <img
                  className={css.previewPhoto}
                  src={URL.createObjectURL(photo)}
                  alt="Selected img"
                />
              )}
              <img className={css.iconAdd} src={PetAdd} alt="add" />
            </div>
          </label>
          {errors.photo && <p className={css.errorComent}>{errors.photo}</p>}
        </div>
        <div className={css.wrapperTextareaOne}>
          <label className={css.textareaText} htmlFor="comments">
            Comments
          </label>
          <textarea
            className={css.textareaAddOne}
            id="comments"
            value={comments}
            placeholder="Type comment"
            onChange={(e) => setComments(e.target.value)}
          />
          {errors.comments && <p className={css.comments}>{errors.comments}</p>}
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
            <button className={css.ButtonNext} onClick={handleDone}>
              <div className={css.ButtonEl}>
                <span>Done </span>
                {/* <img src={next} alt="Next" /> */}
              </div>
            </button>
          </li>
        </ul>
      </div>

      <Formik
        initialValues={{
          photo: formData.url || "",
          comments: formData.comments || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleNext(values);
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div className={css.wrapperForm}>
              <div className={css.wrapperPotoSell}>
                <div className={css.SexText}>The Sex</div>
                <ul className={css.sexOption}>
                  <li>
                    <button
                      className={`${css.sexElement} ${
                        values.sex === "female" ? css.sexElementActive : ""
                      }`}
                      type="button"
                      onClick={() => setFieldValue("sex", "female")}
                    >
                      Female
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${css.sexElement} ${
                        values.sex === "male" ? css.sexElementActive : ""
                      }`}
                      type="button"
                      onClick={() => setFieldValue("sex", "male")}
                    >
                      Male
                    </button>
                  </li>
                </ul>
                <div className={css.wrapperAddPhoto}>
                  <label className={css.labelAddText}>
                    Load the pet’s image:
                  </label>

                  <input
                    type="file"
                    id="photo"
                    onChange={(e) => setFieldValue("photo", e.target.files[0])}
                    style={{ display: "none" }}
                  />

                  <label htmlFor="photo">
                    <div className={css.labelAdd}>
                      {values.photo && (
                        <img
                          className={css.previewPhoto}
                          src={URL.createObjectURL(values.photo)}
                          alt="Selected img"
                        />
                      )}
                    </div>
                  </label>
                  <ErrorMessage
                    name="photo"
                    component="p"
                    className={css.errorComentSell}
                  />
                </div>
              </div>
              <div className={css.wrapperFormSellInputs}>
                <div className={css.labelInput}>
                  <label className={css.LabelStep} htmlFor="place">
                    Location
                  </label>
                  <Field
                    className={css.Input}
                    type="text"
                    id="place"
                    name="place"
                    placeholder="Type location"
                  />
                  <ErrorMessage
                    name="place"
                    component="p"
                    className={css.ErrorTextLow}
                  />
                </div>
                <div className={css.labelInput}>
                  <label className={css.LabelStep} htmlFor="price">
                    Price
                  </label>
                  <Field
                    className={css.Input}
                    type="text"
                    id="price"
                    name="price"
                    placeholder="Type price"
                  />
                  <ErrorMessage
                    name="price"
                    component="p"
                    className={css.ErrorTextLow}
                  />
                </div>
                <div className={css.wrapperTextarea}>
                  <label className={css.textareaText} htmlFor="comments">
                    Comments
                  </label>
                  <Field
                    className={css.textareaAddOne}
                    component="textarea"
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
              </div>
            </div>
            <div className={css.LinkAddPEt}>
              <button
                className={css.LinkAddPEtLitkCancel}
                onClick={() => handlePreviousStep(formData)}
              >
                <div className={css.ButtonEl}>
                  <span>Back</span>
                </div>
              </button>

              <button
                className={css.ButtonNext}
                type="submit"
                disabled={isSubmitting}
              >
                <div className={css.ButtonEl}>
                  <span>Done</span>
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ThreeStep;
