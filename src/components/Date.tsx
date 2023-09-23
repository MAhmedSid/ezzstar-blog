"use client"
import React from "react";
import Moment from "react-moment";

const Date = ({date}:{date:string}) => {

    const toUpperCaseFilter = (d:any) => {
        return d.toUpperCase();
    };

  return <div className="flex flex-col items-center justify-center text-xs lp:text-sm text-pri_yellow">
  <Moment filter={toUpperCaseFilter} format="hh:mm A, ddd" >{date}</Moment>
  <Moment filter={toUpperCaseFilter} format="DD MMM YYYY" >{date}</Moment>
</div>;
};

export default Date;
