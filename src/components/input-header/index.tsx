import React from 'react';
import { Container, ImageContainer, Input } from './styles';
import SearchIcon from '../../../public/assets/icons/search-icon.svg';
import { theme } from 'twin.macro';
import { TFunction } from 'i18next';

export default function InputHeader({ t }: { t: TFunction<"translation", undefined> }) {
  return (
    <Container>
      <ImageContainer>
        <SearchIcon fill={theme`textColor.primary`} />
      </ImageContainer>
      <Input placeholder={t("search-food")} />
    </Container>
  );
}
