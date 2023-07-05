import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  slider: {
    height: "70vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    marginBottom: 30,
  },
  slide: {
    height: "100%",
    position: "relative",
  },
  slideImage: {
    height: "70vh",
    objectFit: "cover",
  },
  slideContent: {
    position: "absolute",
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    color: "white",
  },
  slideText: {
    fontWeight: "bold",
    color: "black",
    fontFamily: "Didact Gothic, sans-seri",
    fontSize: 30,
  },
}));

const Slider = () => {
  const classes = useStyles();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image:
        "https://img.freepik.com/free-photo/green-mint-leaves-and-tea-cup-with-teapot-isolated-on-white-backdrop_23-2148091959.jpg",
      text: "Це найкращій магазин чаю",
    },
    {
      image:
        "https://phonoteka.org/uploads/posts/2021-04/1618965652_19-phonoteka_org-p-fon-dlya-prezentatsii-chai-26.jpg",
      text: "Безкоштовна доставка при замовлені від 599 грн",
    },
    {
      image:
        "https://img.freepik.com/free-photo/top-view-composition-for-tea-concept_23-2148107223.jpg",
      text: "При замовлені від 1000 грн на ваш чекає подарунок",
    },
  ];

  const handlePreviousSlide = () => {
    setActiveSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className={classes.slider}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={5000}
        selectedItem={activeSlide}
        onChange={setActiveSlide}
        infiniteLoop={true}
      >
        {slides.map((slide, index) => (
          <div key={index} className={classes.slide}>
            <img
              src={slide.image}
              alt={slide.text}
              className={classes.slideImage}
            />
            <div className={classes.slideContent}>
              <Typography className={classes.slideText}>
                {slide.text}
              </Typography>
            </div>
          </div>
        ))}
      </Carousel>
      <button onClick={handlePreviousSlide}>Previous</button>
      <button onClick={handleNextSlide}>Next</button>
    </div>
  );
};

export default Slider;
