import { Title } from "@/components/title"
import { FoodContainer, MidContainer } from "./style"
import { productsType } from "src/redux/slices/products-slice";
import React from "react";
import FoodItem from "@/components/food-item";
import ReadMoreButton from "@/components/readmore-button";
import { SecondCategory } from "@/components/food-category/second-category";

interface FoodProps {
    currentCategory: number;
    products: productsType[];
    showTitle?: boolean;
    isReservation?: boolean;
}

export const Food: React.FC<FoodProps> = ({ currentCategory, products, showTitle, isReservation }) => {
    const filteredProducts = (() => {
        if (currentCategory === 1) return products;
        return products.filter(element => element.category === currentCategory);
    })();

    return (
        <>
            {
                showTitle &&
                <MidContainer>
                    <Title isBigger>Món ăn phổ biến</Title>
                </MidContainer>
            }

            <FoodContainer isReservation={isReservation} className="food-container">
                {filteredProducts.map(e => (
                    <FoodItem {...e} key={e.id}></FoodItem>
                ))}
            </FoodContainer>
        </>
    )
}