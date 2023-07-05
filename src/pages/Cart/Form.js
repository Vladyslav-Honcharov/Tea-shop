import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { TextField, Container } from "@mui/material";
import React, { useContext } from "react";
import Spinner from "./Spinner";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import { PRODUCTS } from "../../products";

const BuyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, totalCartAmount, clearCart } = useContext(ShopContext);

  const BuyButton = styled("button")(({ theme }) => ({
    background: `linear-gradient(to right, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
    color: theme.palette.common.white,
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    "&:hover": {
      background: `linear-gradient(to right, ${theme.palette.success.light}, ${theme.palette.success.main})`,
    },
  }));

  const sendCartData = async (data, products) => {
    try {
      const TOKEN = "5347978233:AAHvtXwjvqX4vp2C4crq-sbjqnjDOzrnM48";
      const CHAT_ID = "-1001722621027";
      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

      const formattedData = Object.entries(data)
        .map(([key, value]) => {
          if (key === "Товары") {
            const productDetails = value
              .map((product) => {
                console.log(product);
                console.log(products);

                const productInfo = products.find(
                  (p) => p.id === parseInt(product["ID товара"])
                );
                const productName = productInfo
                  ? productInfo.productName
                  : "Название не найдено";
                return `${productName} (${product["Количество"]})`;
              })
              .join(", ");
            return `<b>${key}:</b> ${productDetails}`;
          }
          return `<b>${key}:</b> ${value}`;
        })
        .join("\n");

      await axios.post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: formattedData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);

    const totalAmount = totalCartAmount();

    const data = {
      Товары: Object.entries(cartItems)
        .filter(([productName, quantity]) => quantity > 0)
        .map(([productName, quantity]) => ({
          "ID товара": productName,
          Количество: quantity,
        })),
      "Общая сумма": totalAmount,
      Имя: values.firstName,
      Фамилия: values.lastName,
      Возраст: values.age,
      "Адрес доставки": values.address,
      Телефон: values.phone,
    };

    try {
      await sendCartData(data, PRODUCTS);
      setTimeout(() => {
        setIsLoading(false);
        setSubmitting(false);
        alert("Дякуємо за покупку, наш менеджер зв'яжеться з вами");
        clearCart();
      }, 3000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          age: "",
          address: "",
          phone: "+380",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Максимально 15 символів")
            .min(2, "Мінімум 2 символи")
            .required("Обов'язкове поле"),
          lastName: Yup.string()
            .max(20, "Максимально 20 символів")
            .min(3, "Мінімум 3 символи")
            .required("Обов'язкове поле"),
          age: Yup.number()
            .max(100, "Введіть правильний вік")
            .required("Обов'язкове поле"),
          address: Yup.string()
            .max(25, "Максимально 25 символів")
            .min(5, "Мінімум 5 символів")
            .required("Обов'язкове поле"),
          phone: Yup.string()
            .max(13, "Введіть правильний номер")
            .min(13, "Введіть правильний номер")
            .matches(/^[^#]*$/, "Неправильний номер телефону")
            .required("Обов'язкове поле"),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              label="Ім'я"
              name="firstName"
              type="text"
              fullWidth
              margin="normal"
              error={Boolean(errors.firstName && touched.firstName)}
              helperText={
                errors.firstName && touched.firstName && errors.firstName
              }
            />

            <Field
              as={TextField}
              label="Прізвище"
              name="lastName"
              type="text"
              fullWidth
              margin="normal"
              error={Boolean(errors.lastName && touched.lastName)}
              helperText={
                errors.lastName && touched.lastName && errors.lastName
              }
            />

            <Field
              as={TextField}
              label="Ваш вік"
              name="age"
              type="number"
              fullWidth
              margin="normal"
              error={Boolean(errors.age && touched.age)}
              helperText={errors.age && touched.age && errors.age}
            />

            <Field
              as={TextField}
              label="Адреса доставки"
              name="address"
              type="text"
              fullWidth
              margin="normal"
              error={Boolean(errors.address && touched.address)}
              helperText={errors.address && touched.address && errors.address}
            />
            <Field
              as={TextField}
              label="Телефон"
              name="phone"
              type="tel"
              margin="normal"
              fullWidth
              error={Boolean(errors.phone && touched.phone)}
              helperText={errors.phone && touched.phone && errors.phone}
              InputProps={{
                style: {
                  font: "inherit",

                  lineHeight: 1.5,
                  borderRadius: "4px",

                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                },
                classes: {
                  focused: {
                    outline: 0,
                    borderColor: "#80bdff",
                    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
                  },
                },
              }}
            />

            {isLoading ? (
              <Spinner />
            ) : (
              <BuyButton disabled={isSubmitting} type="submit">
                {" "}
                Оформити замовлення
              </BuyButton>
            )}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default BuyForm;
