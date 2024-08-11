import React, { useContext, useState } from 'react';
import { CategoryContentContainer, CategoryImageContainer, Container, StyledImage, Text, TextQuantity } from './style';
import { categoriesType } from 'src/redux/slices/products-slice';
import { ThemeContext } from 'src/theme/theme-provider';
import { useStoreDispatch, useStoreSelector } from 'src/redux/store';
import { setCurrentCategory } from 'src/redux/slices/products-slice';

export default function FoodCategory({ name, icon, id }: categoriesType) {
  const currentCategory = useStoreSelector(
    (state: any) => state.mainStoreSlice.currentCategory,
  );
  const dispatch = useStoreDispatch();
  const themeContext = useContext(ThemeContext);

  const handleClick = () => {
    dispatch(setCurrentCategory(id));
  };

  return (
    <Container onClick={handleClick} className="group">
      <CategoryImageContainer>
        <StyledImage
          decoding="async"
          fill
          data-src="https://modinatheme.com/foodking/wp-content/uploads/2024/03/french-fry.png"
          alt="Image"
          src="https://modinatheme.com/foodking/wp-content/uploads/2024/03/french-fry.png"
          className="lazyloaded"
        />
      </CategoryImageContainer>
      <CategoryContentContainer className="catagory-product-content text-center">
        <div className="catagory-product-icon">

        </div>
        <Text>
          <a href="https://modinatheme.com/foodking/product-category/pro-pasta/">Pro Pasta</a>
        </Text>
        <TextQuantity>3 Products</TextQuantity>
      </CategoryContentContainer>
    </Container>
  );
}
