import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Container,
  DetailContainer,
  ImageContainer,
  PlusContainer,
  RowContainer,
  StyledStarIcon,
  Text,
  TimeContainer,
  TimeText,
  Title,
} from './style';
import { useStoreDispatch, useStoreSelector } from 'src/redux/store';
import { addItem } from 'src/redux/slices/cart-slice';
import { theme } from 'twin.macro';
import PlusIcon from 'public/assets/icons/plus-icon.svg';
import Item from '@/type/Item';
import { toast } from 'react-toastify';
import { TFunction } from 'i18next';
import { useTranslation } from "next-i18next";

export default function FoodItem(item: Item) {
  const { picture, title, price } = item;
  const [priceRepresentation, setPriceRepresentation] = useState('');
  const dispatch = useStoreDispatch();
  const id = useStoreSelector(state => state.reservation.id);
  const { t } = useTranslation();

  useEffect(() => {
    setPriceRepresentation(price.toString() + ' ₫');
  }, [price]);

  const handleClick = () => {
    if (!id) {
      toast(t("you-have-not-reservation"), { type: "warning" })
    }
    else {
      dispatch(addItem(item));
    }
  };

  return (
    <Container onClick={handleClick} className='group'>
      <PlusContainer>
        <PlusIcon fill="black" />
        <Title>{t("add-to-cart")}</Title>
      </PlusContainer>
      <ImageContainer>
        <Image
          layout="fill"
          src={picture || process.env.NEXT_PUBLIC_DUMMY_PICTURE || ""}
          alt={`${title} image`}
          objectFit="cover"
        />
        <TimeContainer>
          <TimeText>
            <b>26-30</b> {t("minutes")}
          </TimeText>
        </TimeContainer>
      </ImageContainer>
      <DetailContainer>
        <RowContainer>
          <Title>{title}</Title>
        </RowContainer>
        <RowContainer>
          <StyledStarIcon
            fill={theme`textColor.primary`}
            height="15"
            tw="mr-1.5"
          />
          <Text>A</Text>
          <Text isAlternativeColor>Coffee</Text>
          <Text isAlternativeColor isEnd>{priceRepresentation}</Text>
        </RowContainer>
      </DetailContainer>
    </Container>
  );
}
