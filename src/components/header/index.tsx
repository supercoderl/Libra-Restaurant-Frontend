import React from 'react';
import InputHeader from '@/components/input-header';
import { SpanLogo, Title, TitleLogo } from '@/components/title';
import BagIcon from '../../../public/assets/icons/bag-icon.svg';
import ScanIcon from '../../../public/assets/icons/qr-scan-icon.svg';
import {
  Container,
  IconContainer,
  LeftSideContainer,
  RightSideContainer,
  TitleContainer,
} from './styles';
import { toggleCart } from 'src/redux/slices/cart-slice';
import { useStoreDispatch } from 'src/redux/store';
import { theme } from 'twin.macro';
import useWindowDimensions from 'src/hooks/use-window-dimensions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const dispatch = useStoreDispatch();
  const clickHandler = () => {
    dispatch(toggleCart());
  };
  const router = useRouter();

  const { width } = useWindowDimensions();
  return (
    <Container>
      <LeftSideContainer>
        <TitleContainer onClick={() => router.replace("/")}>
          <TitleLogo>Libra <SpanLogo>Restaurant</SpanLogo></TitleLogo>
        </TitleContainer>
      </LeftSideContainer>
      <RightSideContainer>
        <InputHeader />
      </RightSideContainer>
      {width < 1600 && (
        <IconContainer onClick={clickHandler}>
          <BagIcon fill={theme`textColor.primary`} height="35%"></BagIcon>
          <Link href='scan'><ScanIcon fill={theme`textColor.primary`} height="50%"></ScanIcon></Link>
        </IconContainer>
      )}
    </Container>
  );
}
