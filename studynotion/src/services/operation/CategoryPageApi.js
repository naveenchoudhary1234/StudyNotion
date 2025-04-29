import React from 'react';
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';

export const CategoryPageApi = async(categoryId) => {
  let result=[];
  const toastId=toast.loading("Loading...");
  try{
  const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});
  if(!response?.data?.success){
    throw new Error("could not fetch category data");


  }

  result=response?.data;

  }

  catch(error){
console.log("Catalog page api error");
toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
}
