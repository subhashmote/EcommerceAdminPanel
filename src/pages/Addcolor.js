import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColor,
  getAColor,
  resetState,
  updateAColor,
} from "../features/color/colorSlice";

const schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];

  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;

  useEffect(() => {
    if (getColorId) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully!");
      formik.resetForm();
      navigate("/admin/list-color");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfully!");
      navigate("/admin/list-color");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
    dispatch(resetState());
  }, [isSuccess, isError, isLoading, createdColor, updatedColor, navigate, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
      } else {
        dispatch(createColor(values));
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getColorId ? "Edit" : "Add"} Color
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Product Color"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getColorId ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
