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
import { TFunction } from 'i18next';
import { LanguageSelector } from '@/components/language-selector';

export default function HomeContainer({ t }: { t: TFunction<"translation", undefined> }) {
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
          <CategorySlide t={t} categories={categories} />
          <Food
            currentCategory={currentCategory}
            items={items}
            showTitle
            isReservation={false}
            loading={loading}
            t={t}
          />
          <ReadMoreButton t={t} router={router} />
          <Service t={t} />
        </CenterContainer>
        <Footer t={t} />
      </BodyContainer>
    </Container>
  );
}
