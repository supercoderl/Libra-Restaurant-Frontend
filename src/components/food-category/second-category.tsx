import { CategoryFood, CategoryFoodItem, CategoryFoodItemImage, CategoryFoodItemLink, CategoryFoodItemText, SecondaryContainer } from "./style"

export const SecondCategory = () => {
    return (
        <SecondaryContainer>
            <CategoryFood>
                <CategoryFoodItem>
                    <CategoryFoodItemLink href="#meat">
                        <CategoryFoodItemImage src="https://cdn-icons-png.flaticon.com/512/6836/6836329.png" alt="" />
                        <CategoryFoodItemText>Khai vị</CategoryFoodItemText>
                    </CategoryFoodItemLink>
                </CategoryFoodItem>
                <CategoryFoodItem>
                    <CategoryFoodItemLink href="#meat">
                        <CategoryFoodItemImage src="https://cdn-icons-png.flaticon.com/512/12087/12087836.png" alt="" />
                        <CategoryFoodItemText>Món gỏi</CategoryFoodItemText>
                    </CategoryFoodItemLink>
                </CategoryFoodItem>
                <CategoryFoodItem>
                    <CategoryFoodItemLink href="#meat">
                        <CategoryFoodItemImage src="https://cdn-icons-png.flaticon.com/512/6978/6978167.png" alt="" />
                        <CategoryFoodItemText>Món gà</CategoryFoodItemText>
                    </CategoryFoodItemLink>
                </CategoryFoodItem>
                <CategoryFoodItem>
                    <CategoryFoodItemLink href="#meat">
                        <CategoryFoodItemImage src="https://cdn-icons-png.flaticon.com/512/2541/2541030.png" alt="" />
                        <CategoryFoodItemText>Món bò</CategoryFoodItemText>
                    </CategoryFoodItemLink>
                </CategoryFoodItem>
                <CategoryFoodItem>
                    <CategoryFoodItemLink href="#meat">
                        <CategoryFoodItemImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGQQSmHXw1uKVYhf1NqxYEcHJDyPHm0f9H2mv1dDhXdxbPiUwWuUMvAubeanrQlwGk4wU&usqp=CAU" alt="" />
                        <CategoryFoodItemText>Món heo</CategoryFoodItemText>
                    </CategoryFoodItemLink>
                </CategoryFoodItem>
                <CategoryFoodItem>
                    <CategoryFoodItemLink href="#meat">
                        <CategoryFoodItemImage src="https://cdn-icons-png.flaticon.com/256/1892/1892817.png" alt="" />
                        <CategoryFoodItemText>Món ếch</CategoryFoodItemText>
                    </CategoryFoodItemLink>
                </CategoryFoodItem>
                <CategoryFoodItem>
                    <CategoryFoodItemLink href="#meat">
                        <CategoryFoodItemImage src="https://cdn-icons-png.flaticon.com/512/3363/3363118.png" alt="" />
                        <CategoryFoodItemText>Món mực</CategoryFoodItemText>
                    </CategoryFoodItemLink>
                </CategoryFoodItem>
                <CategoryFoodItem>
                    <CategoryFoodItemLink href="#meat">
                        <CategoryFoodItemImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiQdp9WL4kVAHvLlYFxwe9XlJCeiCxMfsIPA&s" alt="" />
                        <CategoryFoodItemText>Món lẩu</CategoryFoodItemText>
                    </CategoryFoodItemLink>
                </CategoryFoodItem>
                <CategoryFoodItem>
                    <CategoryFoodItemLink href="#meat">
                        <CategoryFoodItemImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJKouDYPIYZd9UD4YDE9YjdB1WRiNZPWgZw&s" alt="" />
                        <CategoryFoodItemText>Món cá</CategoryFoodItemText>
                    </CategoryFoodItemLink>
                </CategoryFoodItem>
                <CategoryFoodItem>
                    <CategoryFoodItemLink href="#meat">
                        <CategoryFoodItemImage src="https://cdn-icons-png.flaticon.com/512/6842/6842516.png" alt="" />
                        <CategoryFoodItemText>Shushi</CategoryFoodItemText>
                    </CategoryFoodItemLink>
                </CategoryFoodItem>
            </CategoryFood>
        </SecondaryContainer>
    )
}