import { Title } from "@/components/title"
import { FoodContainer, MidContainer } from "./style"
import React from "react";
import FoodItem from "@/components/food-item";
import Item from "@/type/Item";
import { FoodItemSkeleton } from "@/components/food-item/skeleton";
import { Empty } from "@/components/empty";
import { TFunction } from "i18next";

interface FoodProps {
    currentCategory: number;
    items: Item[];
    showTitle?: boolean;
    isReservation?: boolean;
    loading: boolean;
    t: TFunction<"translation", undefined>
}

export const Food: React.FC<FoodProps> = ({ items, showTitle, isReservation, loading, t }) => {
    return (
        <>
            {
                showTitle &&
                <MidContainer>
                    <Title isBigger>{t("popular-food")}</Title>
                </MidContainer>
            }

            {
                !loading && items.length <= 0 && (
                    <Empty title={t("food-empty")} />
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