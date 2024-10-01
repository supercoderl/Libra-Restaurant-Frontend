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

export const ServiceContainer = tw.section`py-20 w-[90%]`;

export const RowHeader = tw.div`grid grid-cols-1 md:grid-cols-10 lg:grid-cols-8 gap-4`

export const RowHeaderCol = tw.div`col-span-full md:col-span-10 lg:col-span-8`

export const Grid = tw.div`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

export const ServiceHeader = tw.div`mb-[35px]`;

export const HeaderTitle = tw.h2`relative text-3xl mb-5 text-center pb-5 uppercase font-[700] before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-[140px] before:bg-[#f70037] after:content-[''] after:absolute after:bottom-[-1px] after:left-1/2 after:-translate-x-1/2 after:w-[45px] after:h-[3px] after:bg-[#f70037]`;

export const TitleSpan = tw.span`text-[#f70037]`;

export const Description = tw.p`text-[#6f6f71] text-center`;

export const SingleService = tw.div`shadow-[0_0_10px_0_rgba(0,_0,_0,_0.1)] hover:scale-90 transition duration-500 cursor-pointer`;

export const Part1 = tw.div`pt-[40px] pb-[25px] px-[40px] border-b-2 border-[rgba(0, 0, 0, 0.08)]`;

export const Part1Title = tw.h3`text-[17px] font-[700]`

export const Part2 = tw.div`pt-[30px] pb-[40px] px-[40px]`

export const Part2Description = tw.p`mb-[22px] text-[#6f6f71]`;

export const Part2Link = tw.a`no-underline`;

