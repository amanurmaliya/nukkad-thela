import { useNavigate } from 'react-router-dom';

const ShopCard = ({ shop }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/shop-detail/${shop._id}`);
    };

    return (
        <div onClick={handleClick} className="cursor-pointer border rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-bold">{shop.name}</h2>
            <p className="text-gray-600">{shop.location}</p>
            <p className="text-gray-500">{shop.tagline}</p>
        </div>
    );
};

export default ShopCard;
