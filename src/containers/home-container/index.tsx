import React from 'react';
import Header from '@/components/header';
import Cart from '../cart-container';
import { useStoreSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';
import DarkThemeToggler from '@/components/dark-theme-toggler';
import {
  BodyContainer,
  CartContainer,
  CenterContainer,
  Container,
} from './style';
import useWindowDimensions from 'src/hooks/use-window-dimensions';
import Banner from '@/components/banner';
import { Food } from './food';
import ReadMoreButton from '@/components/readmore-button';
import { CategorySlide } from './category';

export default function HomeContainer() {
  const { categories, items, currentCategory } = useStoreSelector(
    state => ({
      items: state.mainStoreSlice.items,
      categories: state.mainCategorySlice.categories,
      currentCategory: state.mainCategorySlice.currentCategory,
    }),
    shallowEqual,
  );

  const { width } = useWindowDimensions();

  return (
    <Container>
      <BodyContainer>
        <CenterContainer>
          <Header />
          <Banner />
          <CategorySlide categories={categories} />
          <Food currentCategory={currentCategory} items={items} showTitle isReservation={false} />
          <ReadMoreButton />
        </CenterContainer>
      </BodyContainer>
      <DarkThemeToggler />
    </Container>
  );
}
