import tw from "twin.macro";

export const Container = tw.div`flex w-full flex-col justify-between items-center`

export const CenterContainer = tw.div`flex flex-col w-11/12 h-full pb-10 items-center justify-center`

export const FluidContainer = tw.div`py-14 w-full`;

export const HeaderContainer = tw.div`flex justify-start items-start space-y-2 flex-col`;

export const HeaderText = tw.h1`text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800`;

export const HeaderTime = tw.p`text-base dark:text-gray-300 font-medium leading-6 text-gray-600`

export const BodyContainer = tw.div`mt-10 grid grid-cols-3 justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0`;

export const LeftContainer = tw.div`col-span-2 flex flex-col justify-start items-start space-y-4 md:space-y-6 xl:space-y-8`;

export const RightContainer = tw.div`col-span-1 bg-gray-50 dark:bg-gray-800 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col`

export const CartContainer = tw.div`flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full`;

export const PriceContainer = tw.div`flex justify-between flex-col flex-col items-stretch w-full h-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8`

export const CustomerCartText = tw.p`text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800`;

export const CustomerText = tw.h3`text-xl dark:text-white font-semibold leading-5 text-gray-800`;

export const CustomerContainer = tw.div`flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0`;

export const InformationContainer = tw.div`flex flex-col justify-start items-start flex-shrink-0`;

export const Email = tw.div`flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full`;

export const EmailText= tw.p`cursor-pointer text-sm leading-5`;

export const Information = tw.div`flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200`;

export const InformationText = tw.div`flex justify-start items-start flex-col space-y-2`;

export const InformationName = tw.p`text-base dark:text-white font-semibold leading-4 text-left text-gray-800`;

export const InformationPhone = tw.p`text-sm dark:text-gray-300 leading-5 text-gray-600`;

export const BottomContainer = tw.div`flex justify-end xl:h-full items-stretch w-full flex-col mt-6 md:mt-0`;

export const Bottom = tw.div`flex w-full justify-center items-center md:justify-start md:items-start`;

export const Button = tw.button`m-0! flex items-center justify-center gap-1.5 dark:border-white dark:hover:bg-white dark:bg-main dark:text-white py-4 hover:bg-main hover:text-white border border-main font-medium w-full text-base font-medium leading-4 text-gray-800 duration-500 transition`;

export const Price = tw.div`flex flex-col w-full h-full bg-gray-50 dark:bg-gray-800 space-y-6`;

export const ShippingText = tw.h3`text-xl dark:text-white font-semibold leading-5 text-gray-800`;

export const PriceCalculate = tw.div`flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4`;

export const PriceTotal = tw.div`flex justify-between items-center w-full`;

export const PriceCalculateContainer = tw.div`flex justify-between items-center w-full`;

export const PriceCalculateText = tw.p`text-base dark:text-white leading-4 text-gray-800`;

export const PriceCalculateTotal = tw.p`text-base dark:text-gray-300 leading-4 text-gray-600 font-semibold`;

export const PriceTotalText = tw.p`text-base dark:text-white font-semibold leading-4 text-gray-800`;

export const PriceTotalNumber = tw.p`text-base dark:text-gray-300 font-semibold leading-4 text-gray-600`;

export const ImageItemContainer = tw.div`w-full md:w-40`;

export const ImageDesktop = tw.img`w-full hidden md:block`;

export const ImageMobile = tw.img`w-full md:hidden`;

export const ItemInfoContainer = tw.div`md:flex-row flex-col flex justify-between items-start w-full px-4 space-y-4 md:space-y-0`;

export const ItemInfoTextContainer = tw.div`w-full flex flex-col justify-start items-start space-y-4`;

export const ItemInfoTitle = tw.h3`text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800`;

export const ItemInfoMoreContainer = tw.div`flex justify-start items-start flex-col space-y-2`;

export const ItemInfoPriceContainer = tw.div`flex justify-between space-x-8 items-start w-full`;

export const ItemInfoMoreText = tw.p`dark:text-white leading-none text-gray-800`;

export const ItemInfoPriceText = tw.p`dark:text-white leading-6`;

export const ItemInfoPriceTotal = tw.p`dark:text-white font-semibold leading-6 text-gray-800`;

export const ItemInfoPriceDiscount = tw.span`text-red-300 line-through`;

export const ItemContainer = tw.div`flex justify-between items-center space-y-4 md:space-y-0 w-full py-5 border-b-[1px]`

export const ButtonContainer = tw.div`flex gap-3 w-full m-0!`