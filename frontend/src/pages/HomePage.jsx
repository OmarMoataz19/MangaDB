import React from "react";
import homeImage from "../Assets/Images/HomePage.svg";
import Search from "../components/Search";
import Animate from "react-smooth/lib/Animate";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/Course/CourseCard";
const HomePage = () => {
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [countryCode, setCountryCode] = useState("US");

  
  useEffect(() => {
    axios.get("http://localhost:3000/course/?CC=".concat(countryCode)).then((res) => {
      setDisplayedCourses(res.data.courses);
      setCurrencySymbol(res.data.symbol);
    });
  }, [countryCode]);
  //should handle the catch with error state

  const onChangeHandler = (e) => {
    console.log(e);
  setCountryCode(e)
  }
  console.log(displayedCourses)
  const courses = displayedCourses.map((course) => {
    return (
      
      <CourseCard
        duration={course.totalHours}
        title={course.courseTitle}
        instructorName={course.instructorName}
        subject={course.subject}
        level="Advanced"
        price={course.discountedPrice}
        rating={course.rating}
        currencySymbol={currencySymbol}
      ></CourseCard>
    );
  });
  
  return (
    <Animate to="1" from="0" attributeName="opacity">
      <NavBar onChange={onChangeHandler}></NavBar>
      <div className="">
        <div className="md:flex justify-center items-center md:p-24 p-10">
          <div className="block md:hidden p-10">
            <img className="w-96" src={homeImage} alt="" />
          </div>
          <div className="md:text-5xl text-4xl md:leading-[70px] leading-[50px] md:text-left text-center uppercase tracking-widest font-semibold max-w-2xl">
            <p>
              Learn at the comfort of your own{" "}
              <span className="text-primaryBlue">home</span>
            </p>
          </div>
          <div className="md:block hidden">
            <img className="w-96" src={homeImage} alt="" />
          </div>
        </div>
        <div className="flex justify-center ">
          <Search className="justify-items-center" />
        </div>
        <div className="font-bold text-2xl mt-8 flex justify-start mx-12 w-max">
          Most Popular:
        </div>
        <div className="grid grid-cols-4 justify-start items-center my-8 mx-12 ">{courses}</div>
      </div>
    </Animate>
  );
};
export default HomePage;