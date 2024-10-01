import React from 'react';
import Header from '@/components/header';
import { useStoreSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';
import DarkThemeToggler from '@/components/dark-theme-toggler';
import {
  BodyContainer,
  CenterContainer,
  Container,
} from './style';
import Banner from '@/components/banner';
import { Food } from './food';
import ReadMoreButton from '@/components/readmore-button';
import { CategorySlide } from './category';
import Footer from '@/components/footer';
import { Service } from './service';
import { useRouter } from 'next/navigation';

export default function HomeContainer() {
  const { categories, items, currentCategory, loading } = useStoreSelector(
    state => ({
      items: state.mainProductSlice.items,
      categories: state.mainCategorySlice.categories,
      currentCategory: state.mainCategorySlice.currentCategory,
      loading: state.mainProductSlice.loading
    }),
    shallowEqual,
  );

  const router = useRouter();

  return (
    <Container>
      <BodyContainer>
        <CenterContainer>
          <Header />
          <Banner />
          <CategorySlide categories={categories} />
          <Food
            currentCategory={currentCategory}
            items={items}
            showTitle
            isReservation={false}
            loading={loading}
          />
          <ReadMoreButton router={router} />
          <Service />
        </CenterContainer>
        <Footer />
      </BodyContainer>
      <DarkThemeToggler />
    </Container>
  );
}
