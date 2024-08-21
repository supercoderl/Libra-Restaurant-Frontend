import tw from "twin.macro";

export const Section = tw.section`w-[600px] m-auto bg-white rounded-[10px] p-[15px]`;

export const Container = tw.div`text-center m-auto text-[#4a4a4a]`;

export const Title = tw.p`font-bold text-[18px]`;

export const Address = tw.p`my-[10px] font-semibold text-sm mx-auto`;

export const HorizontalLine = tw.hr`border-[1px] border-dashed border-[rgb(131,_131,_131)] my-[25px] mx-auto`;

export const ItemTable = tw.table`w-full table-fixed`;

export const InvoiceItems = tw.tr`border-t-[1px] border-[#ddd] p-[10px]`;

export const InvoiceItem = tw.td`py-2`

export const Price = tw.td`text-right`;

export const PriceTable = tw.table`w-full bg-[#fcbd024f] rounded-[4px]`;

export const TotalTable = tw.table`w-full mt-[15px] border-[1px] border-dashed border-[#00cd00] rounded-[3px]`