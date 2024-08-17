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
import { Category } from './category';
import { Food } from './food';
import ReadMoreButton from '@/components/readmore-button';

export default function HomeContainer() {
  const { isCartOpen, categories, items, currentCategory } = useStoreSelector(
    state => ({
      isCartOpen: state.cart.isOpen,
      items: state.mainStoreSlice.items,
      categories: state.mainStoreSlice.categories,
      currentCategory: state.mainStoreSlice.currentCategory,
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
          <Category categories={categories} />
          <Food currentCategory={currentCategory} items={items} showTitle isReservation={false} />
          <ReadMoreButton />
        </CenterContainer>
      </BodyContainer>
      {(isCartOpen || width > 1600) && (
        <CartContainer>
          <Cart />
        </CartContainer>
      )}
      <DarkThemeToggler />
    </Container>
  );
}
