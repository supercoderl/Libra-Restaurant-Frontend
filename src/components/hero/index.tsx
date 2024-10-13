import { TFunction } from "i18next"
import { Container, Image, Text } from "./style"
import React from "react"

type HeroProps = {
    t: TFunction<"translation", undefined>
}

export const Hero: React.FC<HeroProps> = ({ t }) => {
    return (
        <Container>
            <Image src="https://fastly.4sqi.net/img/general/1398x536/50831682_WnIuyuze-vDL_GIOmpMeclFdxYadrDD_gbEQgKfSAzY.jpg" alt="" />
            <Text>{t("food-store")}</Text>
        </Container>
    )
}