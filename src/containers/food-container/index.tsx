import Header from "@/components/header";
import { Food } from "../home-container/food";
import DarkThemeToggler from "@/components/dark-theme-toggler";
import { useStoreSelector } from "src/redux/store";
import { shallowEqual } from "react-redux";
import { Hero } from "@/components/hero";
import { SecondCategory } from "@/components/food-category/second-category";
import { BodyContainer, CenterContainer, Container, ContentContainer } from "./style";

export default function FoodContainer() {
    const { items } = useStoreSelector(
        state => ({
            items: state.mainProductSlice.items
        }),
        shallowEqual,
    );

    return (
        <Container>
            <BodyContainer>
                <CenterContainer>
                    <Header />
                    <Hero />
                    <SecondCategory />
                    <ContentContainer>
                        <Food
                            showTitle={false}
                            currentCategory={1}
                            items={items}
                            isReservation={false}
                        />
                    </ContentContainer>
                </CenterContainer>
            </BodyContainer>
            <DarkThemeToggler />
        </Container>
    );
}
