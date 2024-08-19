import styled from "styled-components";
import tw from "twin.macro";

export const Container = tw.div`flex w-full flex-col justify-between items-center`

export const CenterContainer = tw.div`flex flex-col w-11/12 h-full pb-10 items-center justify-center`

export const FluidContainer = tw.div`py-4 md:py-14 w-full`;

export const HeaderContainer = tw.div`flex justify-start items-start space-y-2 flex-col`;

export const HeaderText = tw.h1`text-3xl dark:text-white lg:text-4xl font-semibold md:leading-7 lg:leading-9 text-gray-800 leading-10`;

export const HeaderTime = tw.p`text-base dark:text-gray-300 font-medium leading-6 text-gray-600`

export const BodyContainer = tw.div`mt-10 md:grid md:grid-cols-3 justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0`;

export const LeftContainer = tw.div`col-span-2 flex flex-col justify-start items-start space-y-4 md:space-y-6 xl:space-y-8`;

export const RightContainer = tw.div`col-span-1 bg-gray-50 dark:bg-gray-800 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col`

export const CartContainer = tw.div`flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full`;

export const PriceContainer = tw.div`flex justify-between flex-col flex-col gap-6 md:gap-0 items-stretch w-full h-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8`

export const CustomerCartText = tw.p`text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800`;

export const CustomerText = tw.h3`text-xl dark:text-white font-semibold leading-5 text-gray-800`;

export const CustomerContainer = tw.div`flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0`;

export const InformationContainer = tw.div`flex flex-col justify-start items-start flex-shrink-0`;

export const Email = tw.div`flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full`;

export const EmailText = tw.p`cursor-pointer text-sm leading-5`;

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

export const ImageItemContainer = tw.div`w-[45%] rounded-xl md:w-40`;

export const ImageDesktop = tw.img`w-full hidden md:block`;

export const ImageMobile = tw.img`w-full object-none rounded-xl md:hidden`;

export const ItemInfoContainer = tw.div`md:flex-row flex-col flex justify-between items-start w-full pl-4 md:px-4 space-y-4 md:space-y-0`;

export const ItemInfoTextContainer = tw.div`w-full flex flex-col justify-start items-start space-y-4`;

export const ItemInfoTitle = tw.h3`text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800`;

export const ItemInfoMoreContainer = tw.div`hidden md:flex justify-start items-start flex-col space-y-2`;

export const ItemInfoPriceContainer = tw.div`hidden md:flex justify-between space-x-8 items-start w-full`;

export const ItemInfoPriceContainerMobile = tw.div`flex md:hidden w-full items-center justify-between`;

export const ItemInfoMoreText = tw.p`dark:text-white leading-none text-gray-800`;

export const ItemInfoPriceText = tw.p`dark:text-white leading-6`;

export const ItemInfoPriceTotal = tw.p`dark:text-white font-semibold leading-6 text-gray-800`;

export const ItemInfoPriceDiscount = tw.span`text-red-300 line-through`;

export const ItemContainer = tw.div`flex justify-between items-center space-y-4 md:space-y-0 w-full py-5 border-b-[1px]`

export const ButtonContainer = tw.div`flex gap-3 w-full m-0!`

export const QuantityContainer = tw.div`flex items-center gap-2`;

export const QuantityButton = tw.button`p-2 rounded-sm bg-main cursor-pointer transition duration-300`

export const PaymentCard = tw.div`p-4 md:p-10 bg-white rounded-[6px] shadow-[0px_24px_60px_-1px_rgba(37,_44,_54,_0.14)]`;

export const PaymentCardTitle = tw.div`mb-4 text-2xl`;

type PaymentCardTypeProps = {
    isSelected?: boolean;
}

export const PaymentCardType = styled.div<PaymentCardTypeProps>`
${tw`w-full md:w-48 gap-4 relative bg-[#f2f4f7] flex flex-col justify-center items-center md:gap-5 border-2 border-[#e8ebed] p-5 rounded-[6px] cursor-pointer text-center transition duration-500 hover:border-main`},
${({isSelected}) => isSelected && tw`border-main bg-[rgb(237_77_96_/_10%)] after:content-['✔'] after:text-main`}
`

export const PaymentCardTypeText = tw.p`group-hover:text-[#28333b] text-sm`;

export const PaymentCardContainer = tw.div`grid grid-cols-2 gap-4 md:flex md:gap-8 justify-between mt-6 mb-6 md:mb-20`;

export const PaymentCardButtonContainer = tw.div`flex flex-col md:flex-row gap-5 justify-between`;

type PaymentCardButtonProps = {
    isLink?: boolean;
    isPrimary?: boolean;
    isSecondary?: boolean;
}

export const PaymentCardButton = styled.button<PaymentCardButtonProps>`
${tw`uppercase font-[600] flex-1 md:flex-none text-xs px-6 py-2 rounded-2xl cursor-pointer transition duration-500 bg-transparent border-2 border-transparent`},
${({ isLink }) => isLink && tw`pb-[2px]! mx-[25px] border-0 border-b-2 border-main rounded-none opacity-75 hover:border-[#40b3ff] hover:opacity-100`},
${({ isPrimary }) => isPrimary && tw`bg-main text-white hover:bg-[#218fd9]`},
${({ isSecondary }) => isSecondary && tw`bg-transparent border-main text-main hover:border-[#28333b] text-[#28333b]`}
`

export const PaymentCardImage = tw.img`w-16`

export const PaymentCardFix = tw.div`max-w-[500px] mb-6`

export const PaymentCartNotifyImg = tw.div`w-full flex items-center justify-center`

export const ContinueContainer = tw.div`flex items-center`