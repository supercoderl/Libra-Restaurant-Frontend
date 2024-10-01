import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Description, Grid, HeaderTitle, Part1, Part1Title, Part2, Part2Description, Part2Link, RowHeader, RowHeaderCol, ServiceContainer, ServiceHeader, SingleService, TitleSpan } from "./style"
import { fa500px, faAngellist, faAsymmetrik, faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons"
import { faAward, faBroadcastTower, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons"

export const Service = () => {
    return (
        <ServiceContainer>
            <RowHeader>
                <RowHeaderCol>
                    <ServiceHeader>
                        <HeaderTitle>Mô hình <TitleSpan>dịch vụ</TitleSpan></HeaderTitle>
                        <Description>Chúng tôi luôn mong muốn đem lại cho khách hàng những món ăn tươi ngon và hảo hạng</Description>
                    </ServiceHeader>
                </RowHeaderCol>
            </RowHeader>
            <Grid>
                <SingleService>
                    <Part1>
                        <FontAwesomeIcon icon={fa500px} fade  color="red" size="3x" style={{ marginBottom: 25, animationDuration: '5s' }} />
                        <Part1Title>Giao hàng tận nơi</Part1Title>
                    </Part1>
                    <Part2>
                        <Part2Description>Dịch vụ chuyển phát Express Delivery của chúng tôi sẽ giao hàng đến tận nhà cho bạn chỉ sau vài phút đặt hàng.</Part2Description>
                        <Part2Link href="#"><FontAwesomeIcon icon={faArrowAltCircleRight} size="1x" color="red" style={{ marginRight: 10 }} />Xem thêm</Part2Link>
                    </Part2>
                </SingleService>

                <SingleService>
                    <Part1>
                        <FontAwesomeIcon icon={faAngellist} fade color="red" size="3x" style={{ marginBottom: 25, animationDuration: '5s' }} />
                        <Part1Title>Tư vấn viên luôn túc trực</Part1Title>
                    </Part1>
                    <Part2>
                        <Part2Description>Chúng tôi ưu tiên phản hồi đến các thắc mắc của khách hàng để cải thiện các dịch vụ, hướng dẫn mua hàng và đặt hàng online.</Part2Description>
                        <Part2Link href="#"><FontAwesomeIcon icon={faArrowAltCircleRight} size="1x" color="red" style={{ marginRight: 10 }} />Xem thêm</Part2Link>
                    </Part2>
                </SingleService>

                <SingleService>
                    <Part1>
                        <FontAwesomeIcon icon={faAward} fade color="red" size="3x" style={{ marginBottom: 25, animationDuration: '5s' }} />
                        <Part1Title>Chứng nhận vệ sinh an toàn thực phẩm</Part1Title>
                    </Part1>
                    <Part2>
                        <Part2Description>Nhà hàng Libra đã được Bộ y tế kiểm định chất lượng vệ sinh an toàn thực phẩm theo thông tư số XX.</Part2Description>
                        <Part2Link href="#"><FontAwesomeIcon icon={faArrowAltCircleRight} size="1x" color="red" style={{ marginRight: 10 }} />Xem thêm</Part2Link>
                    </Part2>
                </SingleService>

                <SingleService>
                    <Part1>
                        <FontAwesomeIcon icon={faAsymmetrik} fade color="red" size="3x" style={{ marginBottom: 25, animationDuration: '5s' }} />
                        <Part1Title>Thành viên danh giá</Part1Title>
                    </Part1>
                    <Part2>
                        <Part2Description>Những khách hàng gắn bó với nhà hàng Libra đều sẽ được hưởng các chế độ, đãi ngộ đặc biệt, chúng tôi luôn sẵn sàng phục vụ.</Part2Description>
                        <Part2Link href="#"><FontAwesomeIcon icon={faArrowAltCircleRight} size="1x" color="red" style={{ marginRight: 10 }} />Xem thêm</Part2Link>
                    </Part2>
                </SingleService>

                <SingleService>
                    <Part1>
                        <FontAwesomeIcon icon={faBroadcastTower} fade color="red" size="3x" style={{ marginBottom: 25, animationDuration: '5s' }} />
                        <Part1Title>Phủ sóng toàn cầu</Part1Title>
                    </Part1>
                    <Part2>
                        <Part2Description>Nhà hàng Libra được mệnh danh là 1 trong 10 nhà hàng nổi tiếng nhất thế giới với các đầu bếp chuyên nghiệp từ khắp nơi đổ về.</Part2Description>
                        <Part2Link href="#"><FontAwesomeIcon icon={faArrowAltCircleRight} size="1x" color="red" style={{ marginRight: 10 }} />Xem thêm</Part2Link>
                    </Part2>
                </SingleService>

                <SingleService>
                    <Part1>
                        <FontAwesomeIcon icon={faCanadianMapleLeaf} fade color="red" size="3x" style={{ marginBottom: 25, animationDuration: '5s' }} />
                        <Part1Title>Thiên đường ẩm thực</Part1Title>
                    </Part1>
                    <Part2>
                        <Part2Description>Thực đơn đa dạng, cách chế biến công phu và tỉ mỉ. Đã không ít khách hàng quốc tế phải tấm tắc khi trải nghiệm các món ăn ở đây.</Part2Description>
                        <Part2Link href="#"><FontAwesomeIcon icon={faArrowAltCircleRight} size="1x" color="red" style={{ marginRight: 10 }} />Xem thêm</Part2Link>
                    </Part2>
                </SingleService>
            </Grid>
        </ServiceContainer>
    )
}