import tw from "twin.macro";

export const Section = tw.section` bg-white rounded-[10px] px-5`;

export const Container = tw.div`text-center m-auto text-[#4a4a4a] mb-5`;

export const LogoContainer = tw.div`text-center pb-5 flex items-center justify-center`;

export const Image = tw.img`w-[15vw] object-contain`

export const InfoContainer = tw.div`flex justify-between text-left`

export const InvoiceText = tw.p`font-bold text-primary`

export const List = tw.ul`m-0`

export const InvoiceInfo = tw.div`flex justify-between items-center border-y-[1px] border-red-500 my-5 py-3`

export const Title = tw.p`font-bold text-[18px]`;

export const InvoiceTime = tw.div`text-left`

export const Medium = tw.span`font-semibold`

export const TableContainer = tw.div`py-0.5 w-full`

export const Table = tw.table`border mt-4 w-full rounded-sm`;

export const TableItem = tw.th`p-2 font-normal text-left`

export const Total = tw.td`text-primary font-bold text-left p-2 text-red-500`;

export const PaymentInfoContainer = tw.div`flex justify-between my-5 text-left`;

export const FooterContainer = tw.div`border-t-[1px] border-red-500`;

export const FooterRow = tw.div`flex justify-between mt-3`

export const InfoText = tw.h5`font-bold my-4`

export const LightLink = tw.a`text-gray-500`

export const Address = tw.p`my-[10px] font-semibold text-sm mx-auto`;

export const HorizontalLine = tw.hr`border-[1px] border-dashed border-[rgb(131,_131,_131)] my-[25px] mx-auto`;

export const ItemTable = tw.table`w-full table-fixed`;

export const InvoiceItems = tw.tr`border-t-[1px] border-[#ddd] p-[10px]`;

export const InvoiceItem = tw.td`py-2`

export const Price = tw.td`text-right`;

export const PriceTable = tw.table`w-full bg-[#fcbd024f] rounded-[4px]`;

export const TotalTable = tw.table`w-full mt-[15px] border-[1px] border-dashed border-[#00cd00] rounded-[3px]`