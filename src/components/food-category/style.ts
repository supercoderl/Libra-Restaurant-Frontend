import styled from "styled-components";
import tw from "twin.macro";
import Image from 'next/image';


type textType = {
  color: string
}

type imageType = {
  isDarkTheme?: boolean
}

export const Container = styled.div`
${tw`bg-no-repeat border-4 bg-cover cursor-pointer relative bg-center opacity-100 transition duration-300 delay-0 rounded-md pt-5 px-5 pb-10 bg-catagoryBackground hover:bg-main`}
`

export const CategoryImageContainer = tw.div`relative z-10 h-[145px] md:h-[245px] mb-[30px] flex justify-center w-full`

export const CategoryContentContainer = tw.div`text-center relative before:absolute before:top-[2.4rem] before:content-[""] before:left-[40%] before:w-[54px] before:h-[2px] before:bg-productQuantity group-hover:before:bg-white before:transition before:duration-500`

export const Text = styled.p<textType>`
 ${tw`text-3xl mt-[-40px] mb-2 font-bold group-hover:text-white transition duration-500`}
  color:${({ color }: any) => color} 
`

export const TextQuantity = styled.p<textType>`
 ${tw`text-lg font-semibold text-productQuantity group-hover:text-white transition duration-500`}
  color:${({ color }: any) => color} 
`

export const StyledImage = styled(Image) <imageType>`
  filter:${({ isDarkTheme }: any) => isDarkTheme ? 'invert(1);' : ' invert(0)'}
  ${tw`border-0 opacity-100 transition duration-300 delay-0 object-contain`}
  
`

export const SecondaryContainer = tw.div`w-full md:w-fit md:px-20 mb-10 bg-[rgba(255,_255,_255,_0.75)] rounded-md border-2 border-[rgba(255, 255, 255, 0.3)] shadow-secondaryCategory`;

export const CategoryFood = tw.ul`list-none grid grid-cols-3 md:flex md:flex-nowrap justify-center p-0`;

export const CategoryFoodItem = tw.li`relative flex flex-col items-center px-[10px] py-3`;

export const CategoryFoodItemLink = tw.a`flex flex-col justify-center items-center w-auto px-[10px] transition duration-500 hover:scale-110`

export const CategoryFoodItemText = tw.span`text-center whitespace-nowrap`

export const CategoryFoodItemImage = tw.img`w-[40px] mb-[5px]`