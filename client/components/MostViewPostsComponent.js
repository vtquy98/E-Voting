import React from 'react';

import PostCardComponent from './PostCardComponent';

class MostViewPostsComponent extends React.Component {
  render() {
    const { mostViewArticlesData } = this.props;
    return (
      <div className="row">
        {mostViewArticlesData &&
          mostViewArticlesData.map(
            (item, index) =>
              index < 2 && (
                <PostCardComponent
                  col={6}
                  category={item.category}
                  title={item.title}
                  description={item.description}
                  image={item.imageDescription}
                  key={index}
                  articleId={item.id}
                />
              )
          )}
        {mostViewArticlesData &&
          mostViewArticlesData.map(
            (item, index) =>
              index === 2 && (
                <PostCardComponent
                  col={12}
                  category={item.category}
                  title={item.title}
                  description={item.description}
                  image={item.imageDescription}
                  key={index}
                  articleId={item.id}
                />
              )
          )}
      </div>
    );
  }
}

export default MostViewPostsComponent;
