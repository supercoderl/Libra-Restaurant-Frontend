import React, { useContext, useState } from 'react';
import { CategoryContentContainer, CategoryImageContainer, Container, StyledImage, Text, TextQuantity } from './style';
import { ThemeContext } from 'src/theme/theme-provider';
import { useStoreDispatch, useStoreSelector } from 'src/redux/store';
import Category from '@/type/Category';
import { setCurrentCategory } from '@/redux/slices/categories-slice';

export default function FoodCategory({ category }: { category: Category }) {
  console.log(category);
  const currentCategory = useStoreSelector(
    (state: any) => state.mainStoreSlice.currentCategory,
  );
  const dispatch = useStoreDispatch();
  const themeContext = useContext(ThemeContext);

  const handleClick = () => {
    dispatch(setCurrentCategory(category.categoryId));
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
          <a href="https://modinatheme.com/foodking/product-category/pro-pasta/">{category.name}</a>
        </Text>
        <TextQuantity>3 Products</TextQuantity>
      </CategoryContentContainer>
    </Container>
  );
}
