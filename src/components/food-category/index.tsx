import React from 'react';
import { CategoryContentContainer, CategoryImageContainer, Container, StyledImage, Text, TextQuantity } from './style';
import { useStoreDispatch, useStoreSelector } from 'src/redux/store';
import Category from '@/type/Category';
import { setCurrentCategory } from '@/redux/slices/categories-slice';
import { useRouter } from 'next/navigation';
import { fetchData } from '@/redux/slices/products-slice';
import { TFunction } from 'i18next';

export default function FoodCategory({ category, t }: { category: Category, t: TFunction<"translation", undefined> }) {
  const dispatch = useStoreDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(setCurrentCategory(category.categoryId));
    dispatch(fetchData({ categoryId: category.categoryId }));
    router.push("/food");
  };

  return (
    <Container onClick={handleClick} className="group">
      <CategoryImageContainer>
        <StyledImage
          decoding="async"
          fill
          data-src={category.picture || "https://modinatheme.com/foodking/wp-content/uploads/2024/03/french-fry.png"}
          alt="Image"
          src={category.picture || "https://modinatheme.com/foodking/wp-content/uploads/2024/03/french-fry.png"}
          className="lazyloaded"
        />
      </CategoryImageContainer>
      <CategoryContentContainer className="catagory-product-content text-center">
        <div className="catagory-product-icon">

        </div>
        <Text>
          <a>{category.name}</a>
        </Text>
        <TextQuantity>{category.itemNumber} {t("dishes")}</TextQuantity>
      </CategoryContentContainer>
    </Container>
  );
}
