import './Card.css'
import { icons } from '../../assets/icons/icons';

const Card = ({title, description, imgText, rating, ImgIcon}) => {
    return (
        <div className="card">
            <div className="text">
                <p>{title}</p>
                <p>{description}</p>
            </div>
            <div className="info">
                <div className="img-content">
                    <img src={ImgIcon} alt="Avatar" />
                    <p>{imgText}</p>
                </div>
                <div className="rating-content">
                    <img src={icons.StarIcon} alt="Star icon" />
                    <p>{rating}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;