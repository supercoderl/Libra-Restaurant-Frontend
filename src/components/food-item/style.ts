import styled from "styled-components";
import tw, { theme } from "twin.macro";
import StarIcon from '../../../public/assets/icons/star-icon.svg';


type textProps ={
  isAlternativeColor?:boolean;
  color?:string;
  isEnd?: boolean;
}

export const Container = tw.div`flex relative flex-col h-72 md:h-64 w-full md:w-72 cursor-pointer transform transition duration-300 hover:scale-105`

export const ImageContainer = tw.div`w-full h-2/3 rounded-xl relative overflow-hidden`

export const TimeContainer = tw.div`flex items-center justify-center absolute transition duration-300 left-0 top-0 w-24 h-10 rounded-br-xl bg-secondary group-hover:scale-105`

export const TimeText = tw.p`text-sm text-primary`

export const Title = tw.p`text-lg font-semibold text-primary`

export const DetailContainer = tw.div`w-full h-1/3 mt-4`;

export const RowContainer = tw.div`flex w-full h-1/2 items-center justify-between`;

export const Text = styled.p<textProps>`
${tw`text-sm mr-2`};
${({isAlternativeColor})=> isAlternativeColor? tw`text-gray-400`:tw`text-primary`}
${({isEnd})=> isEnd && tw`ml-auto`}
`
export const PlusContainer = tw.div`absolute h-full w-full bg-secondary z-10 brightness-75 opacity-0 rounded-md flex flex-col gap-2 items-center justify-center hover:opacity-90 transition duration-500`

export const StyledStarIcon = tw(StarIcon)`
mr-1.5
mb-0.5
`