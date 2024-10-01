import { BottomDetail, BottomText, BottomTextA, BottomTextSpan, Box, Button, Content, ContentTop, FooterContainer, Input, InputBox, LinkBoxes, LinkName, LinkNameText, MediaIcon, MediaText, SpanLogo, TitleDetail, TitleImage, TitleLogo } from "./style"
import logo from "../../../public/assets/images/logo-no-bg.png";
import FacebookIcon from "../../../public/assets/icons/facebook-icon.svg";
import TwitterIcon from "../../../public/assets/icons/twitter-icon.svg";
import InstagramIcon from "../../../public/assets/icons/instagram-icon.svg";
import LinkedInIcon from "../../../public/assets/icons/linkedin-icon.svg";
import YoutubeIcon from "../../../public/assets/icons/youtube-icon.svg";

export default function Footer() {
    return (
        <FooterContainer>
            <Content>
                <ContentTop>
                    <TitleDetail>
                        <TitleImage src={logo.src} alt="logo" />
                        <TitleLogo>Libra <SpanLogo>Restaurant</SpanLogo></TitleLogo>
                    </TitleDetail>
                    <MediaIcon>
                        <MediaText href="#">
                            <FacebookIcon width={24} height={24} />
                        </MediaText>
                        <MediaText href="#">
                            <TwitterIcon width={24} height={24} />
                        </MediaText>
                        <MediaText href="#">
                            <InstagramIcon width={24} height={24} />
                        </MediaText>
                        <MediaText href="#">
                            <LinkedInIcon width={24} height={24} />
                        </MediaText>
                        <MediaText href="#">
                            <YoutubeIcon width={24} height={24} />
                        </MediaText>
                    </MediaIcon>
                </ContentTop>
                <LinkBoxes>
                    <Box>
                        <LinkName>Công ty</LinkName>
                        <li><LinkNameText>Trang chủ</LinkNameText></li>
                        <li><LinkNameText href="#">Liên hệ</LinkNameText></li>
                        <li><LinkNameText href="#">Giới thiệu</LinkNameText></li>
                        <li><LinkNameText href="#">Tuyển dụng</LinkNameText></li>
                    </Box>
                    <Box>
                        <LinkName>Dịch vụ</LinkName>
                        <li><LinkNameText href="#">Giữ chỗ</LinkNameText></li>
                        <li><LinkNameText href="#">Đặt hàng online</LinkNameText></li>
                        <li><LinkNameText href="#">Thiết kế website</LinkNameText></li>
                        <li><LinkNameText href="#">Hướng dẫn sử dụng</LinkNameText></li>
                    </Box>
                    <Box>
                        <LinkName>Tài khoản</LinkName>
                        <li><LinkNameText href="#">Đăng nhập</LinkNameText></li>
                        <li><LinkNameText href="#">Trang cá nhân</LinkNameText></li>
                        <li><LinkNameText href="#">Tùy chọn</LinkNameText></li>
                        <li><LinkNameText href="#">Thanh toán</LinkNameText></li>
                    </Box>
                    <Box>
                        <LinkName>Khóa học</LinkName>
                        <li><LinkNameText href="#">Nấu ăn</LinkNameText></li>
                        <li><LinkNameText href="#">Phục vụ</LinkNameText></li>
                        <li><LinkNameText href="#">Lễ tân</LinkNameText></li>
                        <li><LinkNameText href="#">Kỹ thuật</LinkNameText></li>
                    </Box>
                    <InputBox>
                        <LinkName>Đăng ký ngay</LinkName>
                        <li><Input placeholder="Nhập email của bạn..." /></li>
                        <li><Button>Subcribe</Button></li>
                    </InputBox>
                </LinkBoxes>
            </Content>
            <BottomDetail>
                <BottomText>
                    <BottomTextSpan>Copyright © 2024 <BottomTextA href="#">Libra Restaurant.</BottomTextA>All rights reserved</BottomTextSpan>
                    <BottomTextSpan>
                        <BottomTextA href="#">Chính sách bảo mật</BottomTextA>
                        <BottomTextA href="#">Điểu khoản</BottomTextA>
                    </BottomTextSpan>
                </BottomText>
            </BottomDetail>
        </FooterContainer>
    )
}