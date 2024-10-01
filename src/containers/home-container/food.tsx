import { Title } from "@/components/title"
import { FoodContainer, MidContainer } from "./style"
import React from "react";
import FoodItem from "@/components/food-item";
import Item from "@/type/Item";
import { FoodItemSkeleton } from "@/components/food-item/skeleton";
import { Empty } from "@/components/empty";

interface FoodProps {
    currentCategory: number;
    items: Item[];
    showTitle?: boolean;
    isReservation?: boolean;
    loading: boolean;
}

export const Food: React.FC<FoodProps> = ({ items, showTitle, isReservation, loading }) => {
    return (
        <>
            {
                showTitle &&
                <MidContainer>
                    <Title isBigger>Món ăn phổ biến</Title>
                </MidContainer>
            }

            {
                !loading && items.length <= 0 && (
                    <Empty title="Không có món ăn nào!" />
                )
            }

            <FoodContainer isReservation={isReservation} className="food-container">
                {
                    loading ?
                        Array.from({ length: 8 }).map((_, index) => (
                            <FoodItemSkeleton key={index} />
                        ))
                        :
                        items.map(e => (
                            <FoodItem {...e} key={e.itemId}></FoodItem>
                        ))
                }
            </FoodContainer>
        </>
    )
}