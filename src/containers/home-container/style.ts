import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

type foodProps ={
  isReservation?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Container = tw.div`flex w-full justify-between`

export const BodyContainer = tw.div`flex flex-col w-full items-center `

export const CenterContainer = tw.div`flex flex-col w-11/12 h-full pb-10 items-center justify-center`

export const CartContainer = styled.div`
${tw`absolute w-full top-0 right-0 bg-secondary shadow-2xl sm:max-w-cart 2xl:(relative shadow-none bg-secondary)`}
`

export const MidContainer = tw.div`flex justify-between w-[90%] my-14 sm:(flex justify-between)`

export const ScrollableContainer = styled.div`${tw`flex overflow-scroll w-full h-auto lg:justify-center`}   
  -ms-overflow-style: none;  
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display:none;
  } 
`
export const FoodCategoriesContainer = tw.div`flex w-[90%] justify-around`

export const FoodContainer = styled.div<foodProps>`
${({isReservation}) => isReservation ? tw`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 col-span-3 w-full pt-4 gap-y-8 md:max-h-[800px]` : tw`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[90%] gap-8`}
${tw`grid place-items-center md:place-items-start mt-4 overflow-x-hidden overflow-y-scroll`}
`


