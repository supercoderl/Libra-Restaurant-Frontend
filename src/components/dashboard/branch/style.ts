import tw from "twin.macro";

export const CardContainer = tw.div`flex flex-col gap-5`

export const Card = tw.div`bg-white shadow-md p-5 flex gap-3 items-center`;

export const CardTextContainer = tw.div`flex flex-col max-w-[75%]`

export const CardText = tw.h4`font-semibold text-lg`;

export const CardAddress = tw.p`text-secondary text-sm truncate`;