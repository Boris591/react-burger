import {Link, useLocation} from "react-router-dom";

interface CardProps {
    item: {
        _id: string;
    };
}
function Card({ item }: CardProps) {
    const location = useLocation();

    const ingredientId = item._id;

    return (
        <Link
            key={ingredientId}
            to={`/ingredients/${ingredientId}`}
            state={{ background: location }}
        >
        </Link>
    );
}
export default Card;
