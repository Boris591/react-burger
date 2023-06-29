import {Link, useLocation} from "react-router-dom";

function Card({ item }) {
    const location = useLocation();

    const ingredientId = item['_id'];

    return (
        <Link
            key={ingredientId}
            to={{
                pathname: `/ingredients/${ingredientId}`,
                state: { background: location },
            }}
        >
        </Link>
    );
}
