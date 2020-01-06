import React from 'react';
import Link from 'next/link';

const CardWithTopImageComponent = ({
  category,
  title,
  description,
  image,
  articleId
}) => (
  <div className="col-md-4">
    <div className="card card-plain card-blog">
      <div className="card-header card-header-image">
        <Link href={`/article?id=${articleId}`}>
          <a>
            <img className="img img-raised" src={image} alt="mock-img" />
          </a>
        </Link>
      </div>
      <div className="card-body">
        <h6 className="card-category text-success">{category}</h6>
        <h4 className="card-title">
          <Link href={`/article?id=${articleId}`}>
            <a>{title}</a>
          </Link>
        </h4>
        <p className="card-description">
          {description}
          <Link href={`/article?id=${articleId}`}>
            <a href={`/article?id=${articleId}`}> Read More </a>
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default CardWithTopImageComponent;
