import { Title } from "@/components/title"
import { FoodContainer, MidContainer } from "./style"
import React from "react";
import FoodItem from "@/components/food-item";
import Item from "@/type/Item";

interface FoodProps {
    currentCategory: number;
    items: Item[];
    showTitle?: boolean;
    isReservation?: boolean;
}

export const Food: React.FC<FoodProps> = ({ currentCategory, items, showTitle, isReservation }) => {
    return (
        <>
            {
                showTitle &&
                <MidContainer>
                    <Title isBigger>Món ăn phổ biến</Title>
                </MidContainer>
            }

            <FoodContainer isReservation={isReservation} className="food-container">
                {items.map(e => (
                    <FoodItem {...e} key={e.itemId}></FoodItem>
                ))}
            </FoodContainer>
        </>
    )
}